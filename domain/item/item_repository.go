package item

import (
	"context"
	"encoding/json"
	"github.com/olivere/elastic"
	"gitlab.daill.de/loaconomy/services/database"
)

type elasticItemRepository struct {
	Client *database.LDB
	ItemIndex string
	PriceIndex string
}

func (e *elasticItemRepository) AddItemPriceData(item *Item) error {
	_, err := e.Client.Conn.Index().
		Index(e.PriceIndex).
		Type("price").
		BodyJson(item).
		Do(context.Background())
	if err != nil {
		return err
	}

	return nil
}

func NewElasticItemRepository(Conn *database.LDB, itemIndex, priceIndex string) Repository{
	return &elasticItemRepository{Client: Conn, ItemIndex: itemIndex, PriceIndex: priceIndex}
}


func (e *elasticItemRepository) GetAllItems() ([]byte, error) {
	searchResult, err := e.Client.Conn.Search().
							Index(e.ItemIndex).
							Type("item").
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

func (e *elasticItemRepository) GetItemsByTerm(term string) ([]byte, error) {
	searchResult, err := e.Client.Conn.Search().
		Index(e.ItemIndex).
		Type("item").
		Size(1000).
		Query(elastic.NewMatchQuery("name", term)).
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


