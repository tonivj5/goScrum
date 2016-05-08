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

                divHistorias.appendChild(nodeHistoria);
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
            updateHistoria: function(newNodeHistoria) {
                var id = newNodeHistoria.getAttribute("id");
                var oldNodeHistoria = document.getElementById(id);
                var padre = oldNodeHistoria.parentNode;
                padre.replaceChild(newNodeHistoria, oldNodeHistoria)
            },
            drawHistoria: function drawHistoria(historia) {
                var id = "HU"+historia.getID();
                var domObject = document.createElement("div");
                domObject.setAttribute("class", "historia");
                domObject.setAttribute("id", id);
                domObject.innerHTML = "<ul>"+
                                            "<li>nombre = <span class='nombreHU'>"+historia.getNombre()+"</span></li>"+
                                            "<li>descripcion = <span class='descripcionHU'>"+historia.getDescripcion()+"</span></li>"+
                                            "<li>valor = <span class='valorHU'>"+historia.getValor()+"</span></li>"+
                                            "<li>coste = <span class='costeHU'>"+historia.getCoste()+"</span></li>"+
                                        "</ul>"+
                                        "<button id='btnUpdateHU"+historia.getID()+"' onclick='vBacklog.acciones.showFormUpdateHistoria(this.parentNode)'>Modificar</button>"+
                                        "<button id='btnRemoveHU"+historia.getID()+"' onclick='bBacklog.eventos.removeHistoria(this.parentNode)'>Borrar</button>";
                return domObject;
            },
            showFormNewHistoria: function() {
                var btnApply = document.getElementById("btnApply");
                var formulario = document.getElementById("formNewHistoria");
                var divFondo = document.getElementById("fondo");
                
                btnApply.setAttribute("onclick", "");
                btnApply.addEventListener("click", bBacklog.eventos.addHistoria);
                formulario.setAttribute("class","drawFormWhenNewHistoria");
                divFondo.setAttribute("class","drawBackgroundWhenNewHistoria");
            },
            showFormUpdateHistoria: function(nodeHistoria){
                var btnApply = document.getElementById("btnApply");
                var formulario = document.getElementById("formNewHistoria");
                var divFondo = document.getElementById("fondo");
                document.getElementById("txtID").innerHTML = nodeHistoria.getAttribute("id").substr(2);
                
                btnApply.removeEventListener("click", bBacklog.eventos.addHistoria);
                btnApply.setAttribute("onclick", "bBacklog.eventos.updateHistoria(this.parentNode)");
                formulario.setAttribute("class","drawFormWhenNewHistoria");
                divFondo.setAttribute("class","drawBackgroundWhenNewHistoria");          
               
                document.getElementById("txtNombre").value = nodeHistoria.getElementsByClassName("nombreHU")[0].innerHTML;
                document.getElementById("txtCoste").value = nodeHistoria.getElementsByClassName("costeHU")[0].innerHTML;
                document.getElementById("txtValor").value = nodeHistoria.getElementsByClassName("valorHU")[0].innerHTML;
                document.getElementById("txtDesc").value = nodeHistoria.getElementsByClassName("descripcionHU")[0].innerHTML;
                
            },
            getHistoriaFromNode: function(nodeHistoria) {
                var id = nodeHistoria.getAttribute("id").substring(2),
                    nombre = nodeHistoria.getElementsByClassName("nombreHU")[0].value,
                    descripcion = nodeHistoria.getElementsByClassName("descripcionHU")[0].value,
                    valor = nodeHistoria.getElementsByClassName("valorHU")[0].value,
                    coste = nodeHistoria.getElementsByClassName("costeHU")[0].value;
                
                console.log("ID de la historia eliminada: " + id);
                
                return new HistoriaUsuario(id, nombre, descripcion, valor,coste);
            },
            hideForm: function() {
                var formulario = document.getElementById("formNewHistoria");
                var divFondo = document.getElementById("fondo");
                formulario.setAttribute("class","hidden");
                divFondo.setAttribute("class","hidden");
            }
        }
    };
})();