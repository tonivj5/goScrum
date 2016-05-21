package ctrl

import (
	"fmt"
	"net/http"
)

type Server struct {
	AddrListen string
	Mux        http.Handler
}

func (s *Server) Run() {
	fmt.Println("Se está escuchando en", s.AddrListen)
	http.ListenAndServe(s.AddrListen, s.Mux)

}
