package item

import (
	"context"
	"encoding/json"
	"github.com/olivere/elastic"
	"gitlab.daill.de/loaconomy/services/database"
)

type elasticItemRepository struct {
	Client *database.LDB
	BaseIndex string
}

func NewElasticItemRepository(Conn *database.LDB, baseIndex string) Repository{
	return &elasticItemRepository{Client: Conn, BaseIndex: baseIndex}
}


func (e *elasticItemRepository) GetAllItems() ([]byte, error) {
	searchResult, err := e.Client.Conn.Search().
							Index(e.BaseIndex).
							Type("items").
							Size(1000).
							Query(elastic.NewMatchAllQuery()).
							Do(context.Background())
	if err != nil {
		return nil, err
	}

	hitArray := make([]json.RawMessage, searchResult.TotalHits())
	for index, hit := range searchResult.Hits.Hits {
		hitArray[index] = *hit.Source
	}

	var result []byte
	result, err = json.Marshal(hitArray)
	if err != nil {
		return nil, err
	}

	return result, nil
}



