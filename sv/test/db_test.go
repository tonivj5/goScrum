package test

import (
	"testing"

	"github.com/xxxtonixxx/goScrum/sv/modelo"
)

func TestDB(t *testing.T) {
	if modelo.New("localhost:27017", "goScrum") == nil {
		t.Error("no se ha creado ")
	}
	//seguir metiendole pruebas buscar como probar metodos sin devolucion
}
