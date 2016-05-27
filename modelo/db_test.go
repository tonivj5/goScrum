package modelo

import "testing"

func TestDb(t *testing.T) {
	var db = New("localhost:27017", "goScrum")

	db.connectDB()

	if db.session == nil {
		t.Error("Deberia estar creada la session")
	}

	db.CloseConnection()
	if db.conectado {
		t.Error("La session no se ha cerrado")
	}

}
