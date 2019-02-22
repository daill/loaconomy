package stats

import "context"

type Repository interface {
	GetItemsStats(ctx context.Context) ([]byte, error)
	GetPricesStats(ctx context.Context) ([]byte, error)
}

type UseCase interface {
	GetStats(ctx context.Context) (string, error)
}
