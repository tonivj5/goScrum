/*
      .__              __________                __   .__                 
___  _|__| ______  _  _\______   \_____    ____ |  | _|  |   ____   ____  
\  \/ /  |/ __ \ \/ \/ /|    |  _/\__  \ _/ ___\|  |/ /  |  /  _ \ / ___\ 
 \   /|  \  ___/\     / |    |   \ / __ \\  \___|    <|  |_(  <_> ) /_/  >
  \_/ |__|\___  >\/\_/  |______  /(____  /\___  >__|_ \____/\____/\___  / 
              \/               \/      \/     \/     \/          /_____/
*/
var vBacklog = (function() {
    'use strict';
    
    return {
        init: function() {
            var btnNewHistoria = document.getElementById("btnNewHistoria");
            btnNewHistoria.addEventListener("click", vBacklog.acciones.showFormNewHistoria);
            var btnAddHistoria = document.getElementById("btnAddHistoria");
            btnAddHistoria.addEventListener("click", bBacklog.eventos.addHistoria);
            console.log("Vista rulando");
        },
        acciones: {
            addHistoria: function(historia) {
                var divHistorias = document.getElementById("divHistoriasUsuario");
                
                var nodeHistoria = vBacklog.acciones.drawHistoria(historia);
                console.log(nodeHistoria);
                divHistorias.appendChild(nodeHistoria);
                
                var formulario = document.getElementById("formNewHistoria");
                var divFondo = document.getElementById("fondo");
                formulario.setAttribute("class","hidden");
                divFondo.setAttribute("class","hidden");
            },
            getHistoriaFromForm: function() {
                var divHistorias = document.getElementById("divHistoriasUsuario");
                var txtNombre = document.getElementById("txtNombre").value,
                    txtCoste = document.getElementById("txtCoste").value,
                    txtValor = document.getElementById("txtValor").value,
                    txtDesc = document.getElementById("txtDesc").value;
                
                var historia = new HistoriaUsuario(null, txtNombre, txtDesc, txtValor);
                
                return historia;
            },
            removeHistoria: function(nodeHistoria) {
                var divHistorias = document.getElementById("divHistoriasUsuario");
                divHistorias.removeChild(nodeHistoria);
            },
            drawHistoria: function drawHistoria(historia){
                var id = "HU"+historia.getID();
                var domObject = document.createElement("div");
                domObject.setAttribute("class", "historia");
                domObject.setAttribute("id", id);
                domObject.innerHTML = "<ul>"+
                                            "<li class='nombreHU'>nombre = "+historia.getNombre()+"</li>"+
                                            "<li class='descripcionHU'>descripcion = "+historia.getDescripcion()+"</li>"+
                                            "<li class='valorHU'>valor = "+historia.getValor()+"</li>"+
                                        "</ul>"+
                                        "<button class='detalles'>Detalles</button>"+
                                        "<button id='btnRemoveHU"+historia.getID()+"' onclick='bBacklog.eventos.removeHistoria(this.parentNode)'>Borrar</button>";
                return domObject;
            },
            showFormNewHistoria: function() {
                var formulario = document.getElementById("formNewHistoria");
                var divFondo = document.getElementById("fondo");
                formulario.setAttribute("class","drawFormWhenNewHistoria");
                divFondo.setAttribute("class","drawBackgroundWhenNewHistoria");
            },
            getHistoriaFromNode: function(nodeHistoria) {
                var id = nodeHistoria.getAttribute("id").substring(2),
                    nombre = nodeHistoria.getElementsByClassName("nombreHU")[0],
                    descripcion = nodeHistoria.getElementsByClassName("descripcionHU")[0],
                    valor = nodeHistoria.getElementsByClassName("valorHU")[0];
                
                console.log("ID de la historia eliminada: " + id);
                
                return new HistoriaUsuario(id, nombre, descripcion, valor);
            }
        }
    };
})();