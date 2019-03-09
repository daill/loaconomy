package item

import "context"

type Repository interface {
	GetAllItems(ctx context.Context) ([]byte, error)
	GetItemsByTerm(term string, ctx context.Context) ([]byte, error)
	AddItemPriceData(item *Item, ctx context.Context) error
	GetItemPrices(term, server string, sortParam []string, from, size, bonusAttack, bonusAccuracy, bonusDefense int, asc bool, ctx context.Context) ([]byte, error)
	GetLastSeenPrices(term, server string, period int, ctx context.Context) ([]byte, error)
	TestItemExists(term string, ctx context.Context) (bool, error)
	GetItemByTerm(term string, ctx context.Context) ([]byte, error)
}

type UseCase interface {
	FetchAll(ctx context.Context) (string, error)
	FetchByTerm(term string, ctx context.Context) (string, error)
	AddItemPriceData(item *Item, ctx context.Context) error
	GetItemPrices(term, server string, sortParam []string, from, size, bonusAttack, bonusAccuracy, bonusDefense int, asc bool, ctx context.Context) (string, error)
	GetLastSeenPrices(term, server string, period int, ctx context.Context) ([]byte, error)
	TestItemExists(term string, ctx context.Context) (bool, error)
}
