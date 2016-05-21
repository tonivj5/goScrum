package modelo

import "testing"

func TestDb(t *testing.T) {
	var db = New("localhost:27017", "goScrum")
	if db.ip != "localhost:27017" {
		t.Error("El id no se a seteado correctamente")
	}
	if db.name != "goScrum" {
		t.Error("El nombre no se ha seteado correctamente")
	}

	db.connectDB()
	if db.Connection == nil {
		t.Error("Deberia estar conectado")
	}
	if db.session == nil {
		t.Error("Deberia estar creada la session")
	}

	connection := db.SelectCollection("historias")
	if connection == nil {
		t.Error("Deberia estar conectado a la coleccion historias")
	}
	//intentar probar la desconexion
}
