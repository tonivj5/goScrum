package modelo

import (
	"testing"
)

var error Error

func TestError(t *testing.T) {
	error := Error{
		Error: "esto es una prueba de error",
	}
	if error.Error != "esto es una prueba de error" {
		t.Error(error.Error + " no es igual esto es una prueba de error")
	}
}
