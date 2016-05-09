package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"strings"

	"github.com/xxxtonixxx/goScrum/sv/modelo"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

var session, _ = mgo.Dial("")
var db = modelo.New("localhost:27017", "goScrum")
var c = db.SelectCollection("historias")

func GetAllHistorias(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Devolviendo todas las historias...")
	var historias []modelo.Historia
	c.Find(bson.M{}).All(&historias)
	e := json.NewEncoder(w)
	e.Encode(historias)
}

func SelectMethodQuery(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Conectado")
	encoder := json.NewEncoder(w)
	URL, _ := url.QueryUnescape(r.RequestURI)
	path := parseURL(URL)

	fmt.Print("Método ")
	switch r.Method {
	case "GET":
		fmt.Println("GET")
		if len(path) == 1 {
			GetAllHistorias(w, r)
			return
		}
		id := path[1]
		MethodGet(encoder, id)
	case "POST":
		fmt.Println("POST")
		data := parseValuesFromRequest(r)
		MethodPost(encoder, data)

	case "PATCH":
		fmt.Println("PATCH")
		id := path[1]
		fmt.Println(path)
		data := parseValuesFromRequest(r)
		MethodPatch(encoder, data, id)

	case "DELETE":
		fmt.Println("DELETE")
		id := path[1]
		MethodDelete(encoder, id)
	default:
		fmt.Println("DESCONOCIDO")
	}
}

func parseURL(uri string) []string {
	uriSplitted := strings.Split(uri, "/")
	path := make([]string, 0, 10)
	for _, v := range uriSplitted {
		if v != "" {
			path = append(path, v)
		}
	}

	return path
}

func MethodDelete(e *json.Encoder, id string) {
	err := c.RemoveId(id)
	if err != nil {
		fmt.Println(err)
		errorDelete := modelo.Error{Error: err.Error()}
		e.Encode(errorDelete)
	}
}

func MethodPatch(e *json.Encoder, data *bson.M, id string) {
	err := c.UpdateId(id, bson.M{"$set": data})
	if err != nil {
		errorPatch := modelo.Error{Error: err.Error()}
		e.Encode(errorPatch)
	}
}

func MethodGet(e *json.Encoder, id string) {
	var data bson.M
	err := c.Find(bson.M{"_id": id}).One(&data)

	if err != nil {
		fmt.Printf("Registro %s no encontrado\n", id)
		errorBD := modelo.Error{Error: err.Error()}
		e.Encode(errorBD)
	} else {
		fmt.Println(data)
		e.Encode(data)
	}

}

/*func MethodGetByCampos(e *json.Encoder, campos *bson.M, id string) {
	var data bson.M
	err := c.Find(bson.M{"_id": id}).Select(campos).One(&data)

	if err != nil {
		fmt.Printf("Registro %s no encontrado\n", id)
		errorBD := modelo.Error{Error: err.Error()}
		e.Encode(errorBD)
	} else {
		fmt.Println(data)
		e.Encode(data)
	}

}*/

func MethodPost(e *json.Encoder, data *bson.M) {
	err := c.Insert(data)
	if err != nil {
		fmt.Println(err)
		errorPost := modelo.Error{Error: err.Error()}
		e.Encode(errorPost)
	} else {
		var h modelo.Historia
		c.FindId(data).One(&h)
		e.Encode(h)
	}
	fmt.Println(data)
}

func parseValuesFromRequest(r *http.Request) *bson.M {
	r.ParseForm()
	data := bson.M{}
	for k, v := range r.Form {
		switch k {
		case "coste", "valor":
			num, _ := strconv.Atoi(v[0])
			data[k] = num
		case "nombre":
			k = "_id"
			fallthrough
		default:
			data[k] = v[0]
		}

		fmt.Println("Clave", k)
		fmt.Println("Valor", v[0])
	}

	return &data
}
