package item

import "context"

type Repository interface {
	GetAllItems() ([]byte, error)
	GetItemsByTerm(term string) ([]byte, error)
}

type UseCase interface {
	FetchAll(ctx context.Context) (string, error)
	FetchByTerm(term string, ctx context.Context) (string, error)
}
