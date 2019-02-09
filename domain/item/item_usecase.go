package item

import (
	"context"
	"time"
)

type itemUseCase struct {
	itemRepository Repository
	contextTimeout time.Duration
}

func (iUC *itemUseCase) GetItemPrices(term, server string, ctx context.Context) (string, error) {
	ctx, cancel := context.WithTimeout(ctx, iUC.contextTimeout)
	defer cancel()

	result, err := iUC.itemRepository.GetItemPrices(term, server)

	return string(result), err
}

func NewItemUseCase(i Repository, timeout time.Duration) UseCase {
	return &itemUseCase{
		itemRepository: i,
		contextTimeout: timeout,
	}
}

func (iUC *itemUseCase) FetchAll(ctx context.Context) (string, error) {
	ctx, cancel := context.WithTimeout(ctx, iUC.contextTimeout)
	defer cancel()

	result, err := iUC.itemRepository.GetAllItems()

	return string(result), err
}

func (iUC *itemUseCase) FetchByTerm(term string, ctx context.Context) (string, error) {
	ctx, cancel := context.WithTimeout(ctx, iUC.contextTimeout)
	defer cancel()

	result, err := iUC.itemRepository.GetItemsByTerm(term)

	return string(result), err
}

func (iUC *itemUseCase) AddItemPriceData(item *Item, ctx context.Context) error {
	ctx, cancel := context.WithTimeout(ctx, iUC.contextTimeout)
	defer cancel()

	err := iUC.itemRepository.AddItemPriceData(item)

	return err
}
