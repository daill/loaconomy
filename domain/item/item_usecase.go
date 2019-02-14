package item

import (
	"context"
	"time"
)

type itemUseCase struct {
	itemRepository Repository
	contextTimeout time.Duration
}

func (iUC *itemUseCase) TestItemExists(term string, ctx context.Context) (bool, error) {

	result, err := iUC.itemRepository.TestItemExists(term, ctx)

	return result, err
}

func (iUC *itemUseCase) GetItemPrices(term, server string, ctx context.Context) (string, error) {

	result, err := iUC.itemRepository.GetItemPrices(term, server, ctx)

	return string(result), err
}

func NewItemUseCase(i Repository, timeout time.Duration) UseCase {
	return &itemUseCase{
		itemRepository: i,
		contextTimeout: timeout,
	}
}

func (iUC *itemUseCase) FetchAll(ctx context.Context) (string, error) {

	result, err := iUC.itemRepository.GetAllItems(ctx)

	return string(result), err
}

func (iUC *itemUseCase) FetchByTerm(term string, ctx context.Context) (string, error) {

	result, err := iUC.itemRepository.GetItemsByTerm(term, ctx)

	return string(result), err
}

func (iUC *itemUseCase) AddItemPriceData(item *Item, ctx context.Context) error {
	err := iUC.itemRepository.AddItemPriceData(item, ctx)

	return err
}
