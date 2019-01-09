package item

import (
	"context"
	"time"
)

type itemUseCase struct {
	itemRepository Repository
	contextTimeout time.Duration
}

func NewItemUseCase(i Repository, timeout time.Duration) UseCase {
	return &itemUseCase{
		itemRepository: i,
		contextTimeout: timeout,
	}
}

func (iUC *itemUseCase) Fetch(ctx context.Context) (string, error) {
	ctx, cancel := context.WithTimeout(ctx, iUC.contextTimeout)
	defer cancel()

	result, err := iUC.itemRepository.GetAllItems()

	return string(result), err
}
