package http

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/gorilla/securecookie"
	"github.com/gorilla/sessions"
	"gitlab.daill.de/loaconomy/domain"
	"gitlab.daill.de/loaconomy/domain/item"
	"gitlab.daill.de/loaconomy/services/log"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"
	"time"
)

// cookiestore in memory
var store = sessions.NewCookieStore([]byte(securecookie.GenerateRandomKey(32)))


func RunServer(address string, allUseCases *domain.UseCases) {
	baseRouter := mux.NewRouter()
	baseRouter.StrictSlash(true)

	baseRouter.HandleFunc("/", HomeView())
	baseRouter.HandleFunc("/addprice", HomeView())
	baseRouter.HandleFunc("/imprint", HomeView())
	apiRouter := baseRouter.PathPrefix("/api").Subrouter()
	apiRouter.HandleFunc("/items", FetchItems(allUseCases)).Methods("GET")
	apiRouter.HandleFunc("/stats", GetStats(allUseCases)).Methods("GET")
	apiRouter.HandleFunc("/price", AddPrice(allUseCases)).Methods("POST")
	apiRouter.HandleFunc("/prices", GetPricesByTerm(allUseCases)).Methods("GET")
	apiRouter.HandleFunc("/lastseenprices", GetLastSeenPricesByTerm(allUseCases)).Methods("GET")
	baseRouter.PathPrefix("/public/").Handler(http.StripPrefix("/public/", http.FileServer(http.Dir("./public"))))
	//baseRouter.Use(LogRequestMiddleware, AuthMiddleware)
	baseRouter.Use(LogRequestMiddleware)



	srv := &http.Server{
		Handler: baseRouter,
		Addr:    address,
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Infof("server is running: %s", address)

	log.Fatalf("%s", srv.ListenAndServe())
}

func GetStats(allUseCases *domain.UseCases) func(http.ResponseWriter, *http.Request) {
	return func(resp http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		if ctx == nil {
			ctx = context.Background()
		}

		result, err := allUseCases.StatsUseCase.GetStats(ctx)
		if err != nil {
			log.Error(err.Error())
			fmt.Fprintf(resp, "%s", err)
		}

		log.Debugf("fetched stats result: %s", result)

		fmt.Fprintf(resp, "%s", result)

	}
}

func GetLastSeenPricesByTerm(allUseCases *domain.UseCases) func(http.ResponseWriter, *http.Request) {
	return func(resp http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		if ctx == nil {
			ctx = context.Background()
		}

		v := r.URL.Query()

		item := v.Get("i")
		server := v.Get("s")

		var err error
		period, err := strconv.Atoi(v.Get("p"))

		result, err := allUseCases.ItemUseCase.GetLastSeenPrices(item, server, period, ctx)

		if err != nil {
			log.Error(err.Error())
			fmt.Fprintf(resp, "%s", err)
		}

		log.Debugf("fetched result: %s", result)

		fmt.Fprintf(resp, "%s", result)

	}
}

func GetPricesByTerm(allUseCases *domain.UseCases) func(http.ResponseWriter, *http.Request) {
	return func(resp http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		if ctx == nil {
			ctx = context.Background()
		}

		v := r.URL.Query()

		item := v.Get("i")
		server := v.Get("s")
		sort := v.Get("sp")
		order := v.Get("so")

		var err error
		bonusAttack, err := strconv.Atoi(v.Get("at"))
		bonusAccuracy, err := strconv.Atoi(v.Get("ac"))
		bonusDefense, err := strconv.Atoi(v.Get("de"))
		from, err := strconv.Atoi(v.Get("f"))
		size, err := strconv.Atoi(v.Get("c"))

		var asc = false
		if order == "asc" {
			asc = true
		}



		var sortParam = make([]string, 0)
		if strings.Contains(sort, "seen") {
			sortParam = append(sortParam, "seen")
		}
		if strings.Contains(sort, "price_per_unit") {
			sortParam = append(sortParam, "price_per_unit")
		}

		result, err := allUseCases.ItemUseCase.GetItemPrices(item, server, sortParam, from, size, bonusAttack, bonusAccuracy, bonusDefense, asc, ctx)

		if err != nil {
			log.Error(err.Error())
			fmt.Fprintf(resp, "%s", err)
		}

		log.Debugf("fetch item result: %s", result)

		fmt.Fprintf(resp, "%s", result)

	}
}

func AddPrice(allUseCases *domain.UseCases) func(http.ResponseWriter, *http.Request) {
	return func(resp http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		if ctx == nil {
			ctx = context.Background()
		}

		var p = &item.Item{Seen: time.Now()}
		b, _ := ioutil.ReadAll(r.Body)

		json.Unmarshal(b, p)

		status := fmt.Sprintf("{\"status\": \"ok\"}")

		err := allUseCases.ItemUseCase.AddItemPriceData(p, ctx)
		if err  != nil {
			log.Error(err.Error())
			status = fmt.Sprintf("{\"status\": \"error\", \"error_message\": \"%s\"}", err.Error())
		}

		log.Debugf("%v", p)

		fmt.Fprint(resp, status)

	}
}

func FetchItems(allUseCases *domain.UseCases) func(http.ResponseWriter, *http.Request) {
	return func(resp http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		if ctx == nil {
			ctx = context.Background()
		}

		v := r.URL.Query()

		searchTerm := v.Get("s")


		var result string
		var err error

		if len(searchTerm) == 0 {
			result, err = allUseCases.ItemUseCase.FetchAll(ctx)
		} else {
			result, err = allUseCases.ItemUseCase.FetchByTerm(searchTerm, ctx)
		}

		if err != nil {
			log.Error(err.Error())
			fmt.Fprintf(resp, "%s", err)
		}

		log.Debugf("fetch item result: %s", result)

		fmt.Fprintf(resp, "%s", result)
	}
}

func HomeView() func(resp http.ResponseWriter, req *http.Request) {
	return func(resp http.ResponseWriter, r *http.Request) {
		http.ServeFile(resp, r, "./public/html/index.html")
	}
}


/*func ListUsersByFilter(db *LDB) func(http.ResponseWriter, *http.Request) {
	return func(resp http.ResponseWriter, r *http.Request) {
		resp.Header().Set("Content-Type", "application/json; charset=utf-8")
		vars := mux.Vars(r)

		var param struct {
			BuildingId int `json:"building_id"`
			adminId int `json:"admin_id"`
		}

		err := json.NewDecoder(r.Body).Decode(&param)
		if err != nil {
			Log.Infof("decoding error occured: %s", err)
			http.Error(resp, err.Error(), 400)
			return
		}
		Log.Debug("filter params: %v %v", param.BuildingId, param.adminId)

		var users []model.User
		err, users = db.GetUsersByBuildingAndFilter(vars["filter"], param.BuildingId)

		var response struct {
			Users *[]model.User `json:"users"`
		}

		response.Users = &users

		var marshalledResponse []byte

		marshalledResponse, err = json.Marshal(&response)

		if err != nil {
			Log.Infof("decoding error occured: %s", err)
			http.Error(resp, err.Error(), 400)
			return
		}

		fmt.Fprintf(resp, "%s", marshalledResponse)

		// only management can access tenant list
		// building will be determined via management info
		// need to parse params

	}

}*/


