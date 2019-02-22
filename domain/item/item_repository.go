package item

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"github.com/olivere/elastic"
	"gitlab.daill.de/loaconomy/services/database"
)

type elasticItemRepository struct {
	Client *database.LDB
	ItemIndex string
	PriceIndex string
}

func (e *elasticItemRepository) GetItemPrices(term, server string, bonusAttack, bonusAccuracy, bonusDefense int, ctx context.Context) ([]byte, error) {
	item, err := e.GetItemByTerm(term, ctx)

	itemQuery := elastic.NewTermQuery("item.raw", term)
	serverQuery := elastic.NewTermQuery("server.raw", server)
	attackQuery := elastic.NewTermQuery("bonus.attack", bonusAttack)
	accuracyQuery := elastic.NewTermQuery("bonus.accuracy", bonusAccuracy)
	defenseQuery := elastic.NewTermQuery("bonus.defense", bonusDefense)

	boolQuery := elastic.NewBoolQuery().Must(itemQuery,serverQuery)

	if bonusAttack != 0 {
		boolQuery.Must(attackQuery)
	}
	if bonusAccuracy != 0 {
		boolQuery.Must(accuracyQuery)
	}
	if bonusDefense != 0 {
		boolQuery.Must(defenseQuery)
	}

	var searchResult *elastic.SearchResult
	searchResult, err = e.Client.Conn.Search().
		Index(e.PriceIndex).
		Type("price").
		Query(boolQuery).
		Sort("seen", true).
		Do(ctx)


	if err != nil {
		return nil, err
	}

	hitArray := make([]json.RawMessage, searchResult.TotalHits())
	for index, hit := range searchResult.Hits.Hits {
		hitArray[index] = *hit.Source
	}

	var buf bytes.Buffer

	var result []byte
	result, err = json.Marshal(hitArray)
	if err != nil {
		return nil, err
	}

	buf.WriteString("{\"item\": ")
	buf.Write(item)
	buf.WriteString(", \"prices\": ")
	buf.Write(result)
	buf.WriteString("}")

	return buf.Bytes(), nil
}

func (e *elasticItemRepository) AddItemPriceData(item *Item, ctx context.Context) error {
	exists, err := e.TestItemExists(item.Item, ctx)

	if err != nil {
		return err
	}

	if !exists {
		return errors.New("Item not in database")
	}

	_, err = e.Client.Conn.Index().
		Index(e.PriceIndex).
		Type("price").
		BodyJson(item).
		Do(ctx)
	if err != nil {
		return err
	}

	return nil
}

func NewElasticItemRepository(Conn *database.LDB, itemIndex, priceIndex string) Repository{
	return &elasticItemRepository{Client: Conn, ItemIndex: itemIndex, PriceIndex: priceIndex}
}


func (e *elasticItemRepository) GetAllItems(ctx context.Context) ([]byte, error) {
	searchResult, err := e.Client.Conn.Search().
							Index(e.ItemIndex).
							Type("item").
							Size(1000).
							Query(elastic.NewMatchAllQuery()).
							Do(ctx)
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

func (e *elasticItemRepository) GetItemsByTerm(term string, ctx context.Context) ([]byte, error) {
	size := 10
	searchResult, err := e.Client.Conn.Search().
		Index(e.ItemIndex).
		Type("item").
		Query(elastic.NewMatchQuery("name", term)).Size(size).
		Do(ctx)
	if err != nil {
		return nil, err
	}

	hitArray := make([]json.RawMessage, 0)
	for _, hit := range searchResult.Hits.Hits {
		hitArray = append(hitArray, *hit.Source)
	}

	var result []byte
	result, err = json.Marshal(hitArray)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (e *elasticItemRepository) GetItemByTerm(term string, ctx context.Context) ([]byte, error) {
	searchResult, err := e.Client.Conn.Search().
		Index(e.ItemIndex).
		Type("item").
		Query(elastic.NewBoolQuery().Must(elastic.NewTermQuery("name.raw", term))).
		Do(ctx)
	if err != nil {
		return nil, err
	}

	var result []byte
	if searchResult.TotalHits() == 1 {
		result, err = searchResult.Hits.Hits[0].Source.MarshalJSON()
		return result, err
	}

	return nil, nil
}

func (e *elasticItemRepository) TestItemExists(term string, ctx context.Context) (bool, error) {
	searchResult, err := e.Client.Conn.Search().
		Index(e.ItemIndex).
		Type("item").
		Query(elastic.NewBoolQuery().Must(elastic.NewTermQuery("name.raw", term))).
		Do(ctx)
	if err != nil {
		return false, err
	}

	if searchResult.TotalHits() != 0 {
		return true, nil
	}

	return false, nil
}


