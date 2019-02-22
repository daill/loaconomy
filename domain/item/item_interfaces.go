package item

import "context"

type Repository interface {
	GetAllItems(ctx context.Context) ([]byte, error)
	GetItemsByTerm(term string, ctx context.Context) ([]byte, error)
	AddItemPriceData(item *Item, ctx context.Context) error
	GetItemPrices(term, server string, bonusAttack, bonusAccuracy, bonusDefense int, ctx context.Context) ([]byte, error)
	TestItemExists(term string, ctx context.Context) (bool, error)
	GetItemByTerm(term string, ctx context.Context) ([]byte, error)
}

type UseCase interface {
	FetchAll(ctx context.Context) (string, error)
	FetchByTerm(term string, ctx context.Context) (string, error)
	AddItemPriceData(item *Item, ctx context.Context) error
	GetItemPrices(term, server string, bonusAttack, bonusAccuracy, bonusDefense int, ctx context.Context) (string, error)
	TestItemExists(term string, ctx context.Context) (bool, error)
}
