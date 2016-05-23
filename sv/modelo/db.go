package modelo

import (
	"fmt"

	"gopkg.in/mgo.v2"
)

type DB struct {
	Connection *mgo.Database
	name       string
	ip         string
	session    *mgo.Session
	conectado  bool
}

func New(ip, db string) *DB {
	database := &DB{
		name: db,
		ip:   ip,
	}

	database.connectDB()

	return database
}

func (db *DB) SelectCollection(collection string) *mgo.Collection {
	return db.Connection.C(collection)
}

func (db *DB) connectDB() {
	var err error
	db.session, err = mgo.Dial(db.ip)
	if err != nil {
		fmt.Println("Ha ocurrido un error al conectar la DB", err)
	} else {
		db.conectado = true
		db.Connection = db.session.DB(db.name)
	}

}

// CloseConnection does someting
func (db *DB) CloseConnection() {
	db.session.Close()
	db.conectado = false
}
