package domain

import (
	"gitlab.daill.de/loaconomy/domain/item"
	"gitlab.daill.de/loaconomy/domain/stats"
)

// struct to consolidate the usecases
type UseCases struct {
	ItemUseCase item.UseCase
	StatsUseCase stats.UseCase
}
