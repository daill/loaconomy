package stats

import "context"

type Repository interface {
	GetItemsStats() ([]byte, error)
	GetPricesStats() ([]byte, error)
}

type UseCase interface {
	GetStats(ctx context.Context) (string, error)
}
