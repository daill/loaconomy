 package http

import (
	"net/http"
	"gitlab.daill.de/loaconomy/services/log"
)

func LogRequestMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Debugf("%s", r.URL.String())
		next.ServeHTTP(w, r)
	})
}

//var WHITELIST = [...]string{"/api/auth/admin"}
//
//func AuthMiddleware(next http.Handler) http.Handler {
//	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//		log.Debug("auth called. todo: implement")
//		for _, path := range WHITELIST {
//			if path == r.URL.Path{
//				log.Debug("auth skipped due to whitelist")
//				next.ServeHTTP(w, r)
//				return
//			}
//		}
//		// verify token
//		log.Debugf("auth called with token: %s", r.Header.Get("Authorization"))
//
//		next.ServeHTTP(w, r)
//	})
//}