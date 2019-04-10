package database

import (
	"context"
	"github.com/olivere/elastic"
	"gitlab.daill.de/loaconomy/services/log"
)

type LDB struct {
	Conn *elastic.Client
}

func Init(usr, pss, databaseUrl string) *LDB {
	client, err := elastic.NewClient(elastic.SetURL(databaseUrl))
	if err != nil {
		panic(err)
	}

	log.Infof("database connection opened")

	info, code, err := client.Ping(databaseUrl).Do(context.Background())
	if err != nil {
		panic(err)
	}
	log.Infof("Elasticsearch returned with code %d and version %s\n", code, info.Version.Number)

	return &LDB{Conn: client}
}

//func (ldb *LDB) GetReportsByMonth(month int, withSiblings bool) (error, []model.Report) {
//	var reports []model.Report
//
//	from := time.Date(time.Now().Year(), time.Month(month), 1, 0, 0, 0, 0, time.UTC)
//	to := time.Date(time.Now().Year(), time.Month(month+1), 0, 0, 0, 0, 0, time.UTC)
//
//	var err error
//	if withSiblings {
//		err = ldb.Conn.Model(&reports).
//			Column("report.*").
//			Relation("User").
//			Relation("Admin").
//			Relation("Department").
//			Relation("Department.Admin").
//			Where("create_date >= ? and create_date <= ?", from, to).
//			Select()
//	} else {
//		err = ldb.Conn.Model(&reports).Where("create_date >= ? and create_date <= ?", from, to).Select()
//	}
//	if err != nil {
//		if (err != pg.ErrNoRows) {
//			Log.Error("Could not complete database request", err)
//		}
//		return err, nil
//	}
//	return nil, reports
//}