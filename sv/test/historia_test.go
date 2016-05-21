package test

import (
	"testing"

	"github.com/xxxtonixxx/goScrum/sv/modelo"
)

var historia modelo.Historia

func TestHistoria(t *testing.T) {
	historia := modelo.Historia{
		ID:          "123abc",
		Nombre:      "pepe",
		Valor:       100,
		Coste:       200,
		Descripcion: "esto es una prueba",
	}
	if historia.ID != "123abc" {
		t.Error(historia.ID + " no es igual a 123abc")
	}

	if historia.Nombre != "pepe" {
		t.Error(historia.Nombre + " no es igual a pepe")
	}

	if historia.Valor != 100 {
		t.Error("%d no es igual a 100\n", historia.Valor)
	}

	if historia.Coste != 200 {
		t.Error("%d no es igual a 200\n", historia.Coste)
	}

	if historia.Descripcion != "esto es una prueba" {
		t.Error(historia.Descripcion + " no es igual a 'esto es una prueba'")
	}

}
