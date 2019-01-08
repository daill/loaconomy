package item

import "context"

type Repository interface {
	GetItem()
	SaveItem(item *Item)
}

type UseCase interface {
	Fetch(ctx context.Context) ([]*Item, error)
}
