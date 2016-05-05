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
                
                var historia = new HistoriaUsuario(null, txtNombre, txtDesc, txtValor,txtCoste);
                
                return historia;
            },
            removeHistoria: function(nodeHistoria) {
                var divHistorias = document.getElementById("divHistoriasUsuario");
                divHistorias.removeChild(nodeHistoria);
            },
            updateHistoria: function(nodeHistoria){
                console.log("estoy en vBacklog updateHistoria");
                var historia = vBacklog.acciones.getHistoriaFromForm();
                nodeHistoria.getElementsByClassName("nombreHU")[0].innerHTML = historia.getNombre();
                nodeHistoria.getElementsByClassName("descripcionHU")[0].innerHTML = historia.getDescripcion();
                nodeHistoria.getElementsByClassName("valorHU")[0].innerHTML = historia.getValor();
                nodeHistoria.getElementsByClassName("costeHU")[0].innerHTML = historia.getCoste();
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
                                            "<li class='costeHU'>coste = "+historia.getCoste()+"</li>"+
                                        "</ul>"+
                                        "<button id='btnUpdateHU"+historia.getID()+"' onclick='bBacklog.eventos.showFormUpdateHistoria(this.parentNode)'>Modificar</button>"+
                                        "<button id='btnRemoveHU"+historia.getID()+"' onclick='bBacklog.eventos.removeHistoria(this.parentNode)'>Borrar</button>";
                return domObject;
            },
            showFormNewHistoria: function() {
                var btnApply = document.getElementById("btnApply");
                btnApply.removeEventListener("click", bBacklog.eventos.updateHistoria);
                btnApply.addEventListener("click", bBacklog.eventos.addHistoria);
                var formulario = document.getElementById("formNewHistoria");
                var divFondo = document.getElementById("fondo");
                formulario.setAttribute("class","drawFormWhenNewHistoria");
                divFondo.setAttribute("class","drawBackgroundWhenNewHistoria");
            },
            showFormUpdateHistoria:function(nodeHistoria){
                console.log("he llegado show form");
                var btnApply = document.getElementById("btnApply");
                btnApply.removeEventListener("click", bBacklog.eventos.addHistoria);
                btnApply.addEventListener("click", bBacklog.eventos.updateHistoria(nodeHistoria));
                var formulario = document.getElementById("formNewHistoria");
                var divFondo = document.getElementById("fondo");
                formulario.setAttribute("class","drawFormWhenNewHistoria");
                divFondo.setAttribute("class","drawBackgroundWhenNewHistoria");
                  
                document.getElementById("txtNombre").innerHTML = nodeHistoria.getElementsByClassName("nombreHU")[0].value;
                document.getElementById("txtCoste").innerHTML = nodeHistoria.getElementsByClassName("descripcionHU")[0].value;
                document.getElementById("txtValor").innerHTML = nodeHistoria.getElementsByClassName("valorHU")[0].value;
                document.getElementById("txtDesc").innerHTML = nodeHistoria.getElementsByClassName("costeHU")[0].value;
                
                
            },
            getHistoriaFromNode: function(nodeHistoria) {
                var id = nodeHistoria.getAttribute("id").substring(2),
                    nombre = nodeHistoria.getElementsByClassName("nombreHU")[0],
                    descripcion = nodeHistoria.getElementsByClassName("descripcionHU")[0],
                    valor = nodeHistoria.getElementsByClassName("valorHU")[0],
                    coste = nodeHistoria.getElementsByClassName("costeHU")[0];
                
                console.log("ID de la historia eliminada: " + id);
                
                return new HistoriaUsuario(id, nombre, descripcion, valor,coste);
            }
        }
    };
})();