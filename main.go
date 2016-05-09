package main

import (
	"net/http"

	"github.com/xxxtonixxx/goScrum/sv/controlador"
	"github.com/xxxtonixxx/goScrum/sv/controlador/api"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/historias", api.GetAllHistorias)
	mux.HandleFunc("/historias/", api.SelectMethodQuery)

	server := ctrl.Server{
		AddrListen: ":5000",
		Mux:        mux,
	}
	server.Run()
}
