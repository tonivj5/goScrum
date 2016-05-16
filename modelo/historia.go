package modelo

import (
	"fmt"

	"gopkg.in/mgo.v2/bson"
)

type Historia struct {
	ID          bson.ObjectId `json:"id" bson:"_id"`
	Nombre      string        `json:"nombre" bson:"nombre"`
	Valor       int           `json:"valor" bson:"valor"`
	Coste       int           `json:"coste" bson:"coste"`
	Descripcion string        `json:"descripcion" bson:"descripcion"`
}

func (h *Historia) String() string {
	return fmt.Sprintf("La historia %s con valor %d y coste %d\n", h.Nombre, h.Valor, h.Coste)
}
