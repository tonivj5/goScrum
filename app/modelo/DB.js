/*
________  __________ 
\______ \ \______   \
 |    |  \ |    |  _/
 |    `   \|    |   \
/_______  /|______  /
        \/        \/ 
*/
var DB = (function(){
    'use strict';
    return {
        init: function(URL) {
            DB.URL = URL;
            DB.AJAX = DB.createAJAXObj();
        },
        parseInfoToQuery: function(historia, op) {
            // Esto iría en el vm
            var formData = "?";
            formData += "nombre=" + historia.getNombre();
            formData += "&coste=" + historia.getCoste();
            formData += "&valor=" + historia.getValor();
            formData += "&descripcion=" + historia.getDescripcion();
            formData += "&id=" + historia.getID();
            
            if(op)
                formData += "&op=" + op;                
            
            return formData;
        },
        createAJAXObj: function() {
            var xhttp;
            if(window.XMLHttpRequest) {
                xhttp = new XMLHttpRequest();
            } else {
                // IE 5 - 6
                xhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            return xhttp;
        },
        setCallback: function(callback) {
            DB.callback = callback;
            DB.AJAX.onreadystatechange = function(callback) {
                if(DB.AJAX.readyState == 4 && DB.AJAX.status == 200) {
                    DB.callback(DB.AJAX.responseText);
                } else if (DB.AJAX.readyState == 4 && DB.AJAX.status == 0){
                    DB.callback(JSON.stringify({"error":"No se ha podido conectar a la Base de Datos"}));
                }
            }
        },
        consulta: function(query) {
            if(DB.AJAX == null) {
                console.error("Sin objeto AJAX. Error crítico.");
                
                return;
            }
            
            switch (query.op) {
                case "GETALL":
                    DB.AJAX.open("GET", DB.URL, true);
                    DB.AJAX.send();
                    break;
                case "GET":
                    DB.AJAX.open("GET", DB.URL+query.data.id, true);
                    DB.AJAX.send();
                    break;
                case "POST":
                    var data = DB.parseInfoToQuery(query.data);
                    DB.AJAX.open("POST", DB.URL+data, true);
                    DB.AJAX.send();
                    break;
                case "DELETE":
                    var data = DB.parseInfoToQuery(query.data, "DELETE");
                    DB.AJAX.open("POST", DB.URL+data, true);
                    DB.AJAX.send();
                    break;
                case "PATCH":
                    var data = DB.parseInfoToQuery(query.data, "PATCH");
                    DB.AJAX.open("POST", DB.URL+data, true);
                    DB.AJAX.send();
                    break;
                default:
                    console.error("Método desconocido");
                    break;
            }
        }
    };
})();