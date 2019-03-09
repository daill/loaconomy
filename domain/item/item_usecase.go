package item

import (
	"context"
	"time"
)

type itemUseCase struct {
	itemRepository Repository
	contextTimeout time.Duration
}

func (iUC *itemUseCase) GetLastSeenPrices(term, server string, period int, ctx context.Context) ([]byte, error) {
	result, err := iUC.itemRepository.GetLastSeenPrices(term, server, period, ctx)

	return result, err
}

func (iUC *itemUseCase) TestItemExists(term string, ctx context.Context) (bool, error) {

	result, err := iUC.itemRepository.TestItemExists(term, ctx)

	return result, err
}

func (iUC *itemUseCase) GetItemPrices(term, server string, sortParam []string, from, size, bonusAttack, bonusAccuracy, bonusDefense int, asc bool, ctx context.Context) (string, error) {

	result, err := iUC.itemRepository.GetItemPrices(term, server, sortParam, from, size, bonusAttack, bonusAccuracy, bonusDefense, asc, ctx)

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
