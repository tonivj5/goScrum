package modelo

import "fmt"

type Historia struct {
	Nombre      string `json:"nombre" bson:"_id"`
	Valor       int    `json:"valor" bson:"valor"`
	Coste       int    `json:"coste" bson:"coste"`
	Descripcion string `json:"descripcion" bson:"descripcion"`
}

func (h *Historia) String() string {
	return fmt.Sprintf("La historia %s con valor %d y coste %d\n", h.Nombre, h.Valor, h.Coste)
}
