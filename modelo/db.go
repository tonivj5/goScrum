package modelo

import "gopkg.in/mgo.v2"

type DB struct {
	Connection *mgo.Database
	name       string
	ip         string
	session    *mgo.Session
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
	db.session, _ = mgo.Dial(db.ip)
	db.Connection = db.session.DB(db.name)
}

func (db *DB) CloseConnection() {
	db.session.Close()
}
