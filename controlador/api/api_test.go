package api

import (
	"net/http"
	"os"
	"testing"

	"github.com/xxxtonixxx/goScrum/modelo"

	"gopkg.in/mgo.v2/bson"
)

func TestMain(t *testing.M) {
	historia := setupFunction()
	retCode := t.Run()
	tearDownFunction(historia.ID.Hex())
	os.Exit(retCode)
}
func setupFunction() *modelo.Historia {
	var data = make(map[string]interface{}, 0)
	data["_id"] = bson.ObjectIdHex("573ee289a0440229bc7ba666")
	data["nombre"] = "a1b2c3"
	data["valor"] = 10
	data["coste"] = 200
	data["descripcion"] = "esto deberia funcionar"
	historia, _ := MethodPost(data)
	return historia
}
func tearDownFunction(id string) {
	MethodDelete(id)
}
func TestParseURL(t *testing.T) {
	url := "localhost:5000/historia/pepe"
	resultado := parseURL(url)

	if len(resultado) != 3 {
		t.Error("la cadena deberia tener 3 valores y tiene ", len(resultado))
	}
}
func TestMethodGetExiste(t *testing.T) {
	nombre := "a1b2c3"
	resultado, _ := MethodGet(nombre)

	if resultado.Nombre != nombre {
		t.Error("Deberia encontrar una historia con nombre " + nombre + " en la db")
	}
}
func TestMethodGetError(t *testing.T) {
	nombre := "onetwothree"
	_, err := MethodGet(nombre)

	if err == nil {
		t.Error("Deberia crear un error al no encontrar la historia en la db")
	}
}

func TestMethodGetByIdExiste(t *testing.T) {
	id := "573ee289a0440229bc7ba666"
	resultado, _ := MethodGetByID(id)

	if resultado.ID.Hex() != id {
		t.Error("Deberia encontrar un historia con id " + id + "en la db")
	}
}

func TestMethodGetByIdError(t *testing.T) {
	id := "573ee289a0440229bc7ba888"
	resultado, err := MethodGetByID(id)

	if resultado != nil {
		t.Error("Deberia devolver una historia nula")
	}
	if err == nil {
		t.Error("Deberia generar un error al no haber ninguna historia con id " + id)
	}
}

/*
func TestMethodPostCorrecto(t *testing.T) {
	var data = make(map[string]interface{}, 0)
	data["nombre"] = "jesus"
	data["valor"] = 10
	data["coste"] = 200
	data["descripcion"] = "esto deberia funcionar"
	historia, erro := MethodPost(data)
	if historia == nil {
		t.Error("La historia deberia crearse al no tener ninguna historia con dicho nombre")
	}
	if erro != nil {
		t.Error("No se deben generar errores")
	}
}
*/
func TestMethodPathCorrecto(t *testing.T) {
	id := "573ee289a0440229bc7ba666"
	var data = make(map[string]interface{}, 0)
	data["nombre"] = "b1c2a3"
	data["valor"] = 10
	data["coste"] = 200
	data["descripcion"] = "esto deberia funcionar"

	result, _ := MethodPatch(data, id)

	if result == nil {
		t.Error("Deberia devolver una historia con nombre jesus")
	}
}

func TestMethodPathError(t *testing.T) {
	id := "573ee289a0440229bc7ba888"
	var data = make(map[string]interface{}, 0)
	data["nombre"] = "juan"
	data["valor"] = 10
	data["coste"] = 200
	data["descripcion"] = "esto deberia generar un error"

	result, _ := MethodPatch(data, id)

	if result != nil {
		t.Error("Deberia generar un error al no haber ninguna historia con id " + id)
	}
}

/*
func TestMethodDeleteCorrecto(t *testing.T) {
	id := "573ee289a0440229bc7ba666"
	resultado, _ := MethodDelete(id)

	if resultado == nil {
		t.Error("Deberia borrar la historia con id " + id)
	}
}
*/
func TestMethodDeleteError(t *testing.T) {
	id := "573ee289a0440229bc7ba888"
	h, _ := MethodDelete(id)

	if h != nil {
		t.Error("Deberia generar un error al no haber ninguna historia con id " + id)
	}
}

func TestParseValuesFromRequest(t *testing.T) {
	urlstr := "http://localhost:5000/historias?nombre=pepe&coste=50&id=573ee289a0440229bc7ba777"
	req, _ := http.NewRequest("POST", urlstr, nil)
	data, control := parseValuesFromRequest(req)

	if data["nombre"] != "pepe" {
		t.Error("El nombre ", data["nombre"], "deberia ser pepe")
	}
	if data["coste"] != 50 {
		t.Error("El coste ", data["coste"], "deberia ser 50")
	}
	if control["id"] != "573ee289a0440229bc7ba777" {
		t.Error("El id ", control["id"], "deberia ser 573ee289a0440229bc7ba777")
	}
}
