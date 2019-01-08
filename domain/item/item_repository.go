package item

import (
	"gitlab.daill.de/loaconomy/services/database"
)

type elasticItemRepository struct {
	Conn *database.LDB
}

func NewElasticItemRepository(Conn *database.LDB) Repository{

	return &elasticItemRepository{Conn}
}

func (elasticItemRepository) GetItem() {
	panic("implement me")
}

func (elasticItemRepository) SaveItem(item *Item) {
	panic("implement me")
}



