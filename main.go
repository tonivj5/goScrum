package main

import (
	"net/http"

	ctrl "github.com/xxxtonixxx/goScrum/controlador"
	"github.com/xxxtonixxx/goScrum/controlador/api"
)

func main() {
	muxAPI := http.NewServeMux()
	muxAPI.HandleFunc("/historias", api.GetAllHistorias)
	muxAPI.HandleFunc("/historias/", api.SelectMethodQuery)

	svAPI := ctrl.Server{
		AddrListen: ":5000",
		Mux:        muxAPI,
	}

	go svAPI.Run()

	pathWeb := "public/"
	muxWeb := http.NewServeMux()
	muxWeb.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, pathWeb+r.URL.Path[1:])
	})

	serverWeb := ctrl.Server{
		AddrListen: ":8080",
		Mux:        muxWeb,
	}

	serverWeb.Run()
}
