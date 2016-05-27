package modelo

import "testing"

var historia Historia

func TestHistoria(t *testing.T) {
	historia := Historia{
		ID:          "123abc",
		Nombre:      "pepe",
		Valor:       100,
		Coste:       200,
		Descripcion: "esto es una prueba",
	}

	if historia.String() != "La historia pepe con valor 100 y coste 200\n" {
		t.Error("pete")
	}

}
