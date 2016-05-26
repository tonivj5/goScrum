package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"strings"

	"github.com/xxxtonixxx/goScrum/modelo"
	"gopkg.in/mgo.v2/bson"
)

var db = modelo.New("localhost:27017", "goScrum")
var c = db.SelectCollection("historias")

func GetAllHistorias(w http.ResponseWriter, r *http.Request) {
	e := json.NewEncoder(w)
	if r.Method == "GET" {
		fmt.Println("Devolviendo todas las historias...")
		var historias []modelo.Historia
		err := c.Find(bson.M{}).All(&historias)

		if err != nil {
			e.Encode(&modelo.Error{Error: err.Error()})
		} else if len(historias) == 0 {
			e.Encode(&modelo.Error{Error: "No hay historias"})
		} else {
			e.Encode(historias)
		}

	} else {
		e.Encode(modelo.Error{Error: "You have used an incorrect method - For other methods use '/historias/'"})
	}
}

func SelectMethodQuery(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Conectado", r.Header.Get("Host"))
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH")
	w.Header().Set("Content-Type", "text/json; charset=utf-8")
	encoder := json.NewEncoder(w)
	URL, _ := url.QueryUnescape(r.RequestURI)
	path := parseURL(URL)

	fmt.Print("Método ")
	var data *modelo.Historia
	var errorBD *modelo.Error

	switch r.Method {
	case "GET":
		fmt.Println("GET")
		if len(path) == 1 {
			GetAllHistorias(w, r)
			return
		}

		nombre := path[1]
		data, errorBD = MethodGet(nombre)
	case "POST":
		values, control := parseValuesFromRequest(r)
		switch control["op"] {
		case "PATCH":
			fmt.Println("PATCH")
			fmt.Println(path)
			data, errorBD = MethodPatch(values, control["id"])
		case "DELETE":
			fmt.Println("DELETE")
			data, errorBD = MethodDelete(control["id"])
		default:
			fmt.Println("POST")
			fmt.Println(values)
			data, errorBD = MethodPost(values)
		}
		/*
			case "PATCH":
				fmt.Println("PATCH")
				id := path[1]
				fmt.Println(path)
				values, _ := parseValuesFromRequest(r)
				data, errorBD = MethodPatch(values, id)

			case "DELETE":
				fmt.Println("DELETE")
				id := path[1]
				data, errorBD = MethodDelete(id)
		*/
	default:
		fmt.Println("DESCONOCIDO")
		return
	}

	if errorBD != nil {
		encoder.Encode(*errorBD)
	} else if data != nil {
		encoder.Encode(*data)
	} else {
		encoder.Encode(modelo.Error{Error: "¡Error importante del SERVIDOR!"})
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

func MethodGet(nombre string) (*modelo.Historia, *modelo.Error) {
	var h modelo.Historia
	err := c.Find(bson.M{"nombre": nombre}).One(&h)

	if err != nil {
		fmt.Printf("Registro %s no encontrado\n", nombre)
		errorBD := modelo.Error{Error: err.Error()}
		return nil, &errorBD
	}

	fmt.Println(h)
	return &h, nil
}

func MethodGetByID(id string) (*modelo.Historia, *modelo.Error) {
	var h modelo.Historia
	err := c.Find(bson.M{"_id": bson.ObjectIdHex(id)}).One(&h)

	if err != nil {
		fmt.Printf("Registro %s no encontrado\n", id)
		errorBD := modelo.Error{Error: err.Error()}
		return nil, &errorBD
	}

	fmt.Println(h)
	return &h, nil
}

func MethodPost(data map[string]interface{}) (*modelo.Historia, *modelo.Error) {
	nombre := data["nombre"].(string)
	_, err := MethodGet(nombre)
	if err != nil {
		err := c.Insert(data)
		if err != nil {
			fmt.Println(err)
			errorBD := modelo.Error{Error: err.Error()}
			return nil, &errorBD
		}
	} else {
		return nil, &modelo.Error{Error: "Nombre ya existente en la base de datos"}
	}

	var h modelo.Historia
	c.Find(data).One(&h)
	fmt.Println(h)
	return &h, nil
}

func MethodPatch(data map[string]interface{}, id string) (*modelo.Historia, *modelo.Error) {
	h, _ := MethodGetByID(id)
	nombre := data["nombre"].(string)
	if h.Nombre != nombre {
		_, err := MethodGet(nombre)
		if err == nil {
			return nil, &modelo.Error{Error: "Nombre ya existente en la base de datos"}
		}
	}

	err := c.Update(bson.M{"_id": bson.ObjectIdHex(id)}, bson.M{"$set": data})
	fmt.Println("El id es:", id)
	if err != nil {
		fmt.Println(err)
		errorBD := modelo.Error{Error: err.Error()}
		return nil, &errorBD
	}

	h, errorBD := MethodGet(nombre)

	return h, errorBD
}

func MethodDelete(id string) (*modelo.Historia, *modelo.Error) {
	h, errorBD := MethodGetByID(id)
	err := c.RemoveId(bson.ObjectIdHex(id))
	if err != nil {
		fmt.Println(err)
		errorBD := modelo.Error{Error: err.Error()}

		return nil, &errorBD
	}

	return h, errorBD
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

func parseValuesFromRequest(r *http.Request) (map[string]interface{}, map[string]string) {
	r.ParseForm()
	control := make(map[string]string, 0)
	data := make(map[string]interface{}, 0)
	for k, v := range r.Form {
		switch k {
		case "coste", "valor":
			num, _ := strconv.Atoi(v[0])
			data[k] = num
		case "op", "id":
			control[k] = v[0]
		default:
			data[k] = v[0]
		}
		/*
			fmt.Println("Clave", k)
			fmt.Println("Valor", v[0])
		*/
	}

	return data, control
}
