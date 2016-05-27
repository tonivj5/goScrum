package modelo

import (
	"testing"
)

var err Error

func TestError(t *testing.T) {
	err := Error{
		Error: "esto es una prueba de error",
	}
	if err.Error != "esto es una prueba de error" {
		t.Error(err.Error + " no es igual esto es una prueba de error")
	}
}
