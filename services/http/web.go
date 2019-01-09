package http

import (
	"context"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/gorilla/securecookie"
	"github.com/gorilla/sessions"
	"gitlab.daill.de/loaconomy/domain"
	"gitlab.daill.de/loaconomy/services/log"
	"net/http"
	"time"
)

// cookiestore in memory
var store = sessions.NewCookieStore([]byte(securecookie.GenerateRandomKey(32)))


func RunServer(address string, allUseCases *domain.UseCases) {
	baseRouter := mux.NewRouter()
	baseRouter.StrictSlash(true)

	baseRouter.HandleFunc("/", HomeView())
	apiRouter := baseRouter.PathPrefix("/api").Subrouter()
	apiRouter.HandleFunc("/items", FetchItems(allUseCases)).Methods("GET")
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

func FetchItems(allUseCases *domain.UseCases) func(http.ResponseWriter, *http.Request) {
	return func(resp http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		if ctx == nil {
			ctx = context.Background()
		}

		result, err := allUseCases.ItemUseCase.Fetch(ctx)

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


