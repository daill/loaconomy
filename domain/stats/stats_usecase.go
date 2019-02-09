package stats

import (
	"bytes"
	"context"
	"time"
)

type statsUseCase struct {
	statsRepository Repository
	contextTimeout time.Duration
}

func (sUc *statsUseCase) GetStats(ctx context.Context) (string, error) {
	ctx, cancel := context.WithTimeout(ctx, sUc.contextTimeout)
	defer cancel()
	var result bytes.Buffer

	result.WriteString("{\"item_stats\": {")
	resultRaw, err := sUc.statsRepository.GetItemsStats()
	result.Write(resultRaw)
	result.WriteString("}},{\"price_stats\": ")
	resultRaw, err = sUc.statsRepository.GetPricesStats()
	result.Write(resultRaw)
	result.WriteString("}")

	return result.String(), err
}

func NewStatsUseCase(i Repository, timeout time.Duration) UseCase {
	return &statsUseCase{
		statsRepository: i,
		contextTimeout: timeout,
	}
}
