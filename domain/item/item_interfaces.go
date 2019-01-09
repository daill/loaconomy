package item

import "context"

type Repository interface {
	GetAllItems() ([]byte, error)
}

type UseCase interface {
	Fetch(ctx context.Context) (string, error)
}
