package test

import (
	"testing"

	"github.com/xxxtonixxx/goScrum/sv/modelo"
)

var error modelo.Error

func TestError(t *testing.T) {
	error := modelo.Error{
		Error: "esto es una prueba de error",
	}
	if error.Error != "esto es una prueba de error" {
		t.Error(error.Error + " no es igual esto es una prueba de error")
	}
}
