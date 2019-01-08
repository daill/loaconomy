package item

import (
	"context"
	"gitlab.daill.de/loaconomy/services/log"
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

func (i *itemUseCase) Fetch(ctx context.Context) ([]*Item, error) {
	ctx, cancel := context.WithTimeout(ctx, i.contextTimeout)
	defer cancel()

	log.Info("called fetch")

	return nil, nil
}