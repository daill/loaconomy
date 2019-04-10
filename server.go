package main

import (
	"github.com/spf13/viper"
	"gitlab.daill.de/loaconomy/domain"
	"gitlab.daill.de/loaconomy/domain/item"
	"gitlab.daill.de/loaconomy/domain/stats"
	"gitlab.daill.de/loaconomy/services/database"
	"gitlab.daill.de/loaconomy/services/http"
	"gitlab.daill.de/loaconomy/services/log"
	"gitlab.daill.de/loaconomy/services/utils"
	"time"
)

func main() {
	viper.SetConfigFile("conf.json")
	err := viper.ReadInConfig()

	if err != nil {
		panic(err)
	}

	env := viper.GetString("environment")
	if env == utils.TestEnv {
		log.InitLogging(utils.TestEnv)
	} else if env == utils.ProductionEnv {
		log.InitLogging(utils.ProductionEnv)
	} else {
		log.InitLogging(utils.DevelopmentEnv)
	}

	timeoutContext := time.Duration(viper.GetInt("context.timeout")) * time.Second

	db := database.Init("loaconomy", "loaconomy", viper.GetString("database.url"))
	log.Info("database initialized")

	itemRepo := item.NewElasticItemRepository(db, viper.GetString("database.item_index"), viper.GetString("database.price_index"))
	itemUseCase := item.NewItemUseCase(itemRepo, timeoutContext)

	statsRepo := stats.NewElasticStatsRepository(db, viper.GetString("database.item_index"), viper.GetString("database.price_index"))
	statsUseCase := stats.NewStatsUseCase(statsRepo, timeoutContext)

	allUseCases := &domain.UseCases{ItemUseCase: itemUseCase, StatsUseCase: statsUseCase}

	log.Info("starting loaconomy server ...")
	http.RunServer(viper.GetString("server.address"), allUseCases)
}
