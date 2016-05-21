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
	if historia.ID != "123abc" {
		t.Error(historia.ID + " no es igual a 123abc")
	}

	if historia.Nombre != "pepe" {
		t.Error(historia.Nombre + " no es igual a pepe")
	}

	if historia.Valor != 100 {
		t.Error(historia.Valor, " no es igual a 100")
	}

	if historia.Coste != 200 {
		t.Error(historia.Coste, " no es igual a 200")
	}

	if historia.Descripcion != "esto es una prueba" {
		t.Error(historia.Descripcion + " no es igual a 'esto es una prueba'")
	}

}
