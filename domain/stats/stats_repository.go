package stats

import (
	"context"
	"fmt"
	"github.com/olivere/elastic"
	"gitlab.daill.de/loaconomy/services/database"
	"gitlab.daill.de/loaconomy/services/log"
)

type elasticStatsRepository struct {
	Client *database.LDB
	ItemIndex string
	PriceIndex string
}

func (e *elasticStatsRepository) GetItemsStats() ([]byte, error){
	searchResult, err := e.Client.Conn.CatCount().Index(e.ItemIndex).Columns("count").Do(context.Background())
	result := fmt.Sprintf("\"items_known\": %d", searchResult[0].Count)
	return []byte(result), err
}

func (e *elasticStatsRepository) GetPricesStats() ([]byte, error) {

	builder := e.Client.Conn.Search().Index(e.PriceIndex)
	builder = builder.Aggregation("items", elastic.NewTermsAggregation().Field("item.raw").Size(5).Order("_count", false)).
		Aggregation("prices_count", elastic.NewValueCountAggregation().Field("item.raw"))

	aggs, err := builder.Do(context.Background())


	var top3items, pricesCount []byte
	top3items, err = aggs.Aggregations["items"].MarshalJSON()
	pricesCount, err = aggs.Aggregations["prices_count"].MarshalJSON()

	log.Debugf("%s %s", string(top3items), string(pricesCount))

	return append(append(top3items, []byte(",")...), pricesCount...), err
}

func NewElasticStatsRepository(Conn *database.LDB, itemIndex, priceIndex string) Repository{
	return &elasticStatsRepository{Client: Conn, ItemIndex: itemIndex, PriceIndex: priceIndex}
}

