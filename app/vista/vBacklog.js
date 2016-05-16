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
    // Aquí sólo iría los métodos para pintar lo que le lleguen.
    return {
        init: function() {
            var btnNewHistoria = document.getElementById("btnNewHistoria");
            var btnCancel = document.getElementById("btnCancel");
            
            btnNewHistoria.addEventListener("click", vBacklog.acciones.showFormNewHistoria);
            btnCancel.addEventListener("click",vBacklog.acciones.hideForm);
            
            console.log("Vista rulando");
        },
        acciones: {
            addHistorias: function(historias) {
                var divHistorias = document.getElementById("divHistoriasUsuario");
                for(var i = 0; i < historias.length; i++) {
                    var nodeHistoria = vBacklog.acciones.drawHistoria(historias[i]);
                    divHistorias.appendChild(nodeHistoria);
                }
            },
            addHistoria: function(historia) {
                var divHistorias = document.getElementById("divHistoriasUsuario"); 
                var nodeHistoria = vBacklog.acciones.drawHistoria(historia);
                divHistorias.appendChild(nodeHistoria);
            },
            removeHistoria: function(historia) {
                var nodeHistoria = document.getElementById(historia.getID());
                var divHistorias = document.getElementById("divHistoriasUsuario");
                divHistorias.removeChild(nodeHistoria);
            },
            updateHistoria: function(newNodeHistoria) {
                var oldNodeHistoria = document.getElementById(newNodeHistoria.getAttribute("id"));
                var padre = oldNodeHistoria.parentNode;
                padre.replaceChild(newNodeHistoria, oldNodeHistoria)
            },
            drawHistoria: function drawHistoria(historia) {
                var id = historia.getID();
                var domObject = document.createElement("div");
                domObject.setAttribute("class", "historia");
                domObject.setAttribute("id", id);
                domObject.innerHTML = "<ul>"+
                                            "<li>nombre = <span class='nombreHU'>"+historia.getNombre()+"</span></li>"+
                                            "<li>valor = <span class='valorHU'>"+historia.getValor()+"</span></li>"+
                                            "<li>coste = <span class='costeHU'>"+historia.getCoste()+"</span></li>"+
                                            "<li>descripcion = <span class='descripcionHU'>"+historia.getDescripcion()+"</span></li>"+
                                        "</ul>"+
                                        "<button id='btnUpdateHU"+historia.getID()+"' onclick='vBacklog.acciones.showFormUpdateHistoria(this.parentNode)'>Modificar</button>"+
                                        "<button id='btnRemoveHU"+historia.getID()+"' onclick='bBacklog.eventos.tryRemoveHistoria(this.parentNode)'>Borrar</button>";
                return domObject;
            },
            getHistoriaFromNode: function(nodeHistoria) {
                var id = nodeHistoria.getAttribute("id"),
                    nombre = nodeHistoria.getElementsByClassName("nombreHU")[0].innerHTML,
                    descripcion = nodeHistoria.getElementsByClassName("descripcionHU")[0].innerHTML,
                    valor = nodeHistoria.getElementsByClassName("valorHU")[0].innerHTML,
                    coste = nodeHistoria.getElementsByClassName("costeHU")[0].innerHTML;
               
                console.log("ID de la historia eliminada: " + id);
                
                return new HistoriaUsuario(id, nombre, descripcion, valor, coste);
            },
            getHistoriaFromForm: function() {
                var id = document.getElementById("id").innerHTML,
                    txtNombre = document.getElementById("txtNombre").value,
                    txtCoste = document.getElementById("txtCoste").value,
                    txtValor = document.getElementById("txtValor").value,
                    txtDesc = document.getElementById("txtDesc").value;
                
                var historia = new HistoriaUsuario( id ,txtNombre, txtDesc, txtValor,txtCoste);
                return historia;
            },
            showFormNewHistoria: function() {
                document.getElementById("btnReset").click();
                document.getElementById("txtNombre").focus();
                var form = document.getElementById("formulario");
                var btnApply = document.getElementById("btnApply");
                var formulario = document.getElementById("formNewHistoria");
                var divFondo = document.getElementById("fondo");
                form.onsubmit = bBacklog.eventos.tryAddHistoria;
                btnApply.setAttribute("onclick", "");
                formulario.setAttribute("class","drawFormWhenNewHistoria");
                divFondo.setAttribute("class","drawBackgroundWhenNewHistoria");
            },
            showFormUpdateHistoria: function(nodeHistoria){
                console.log(document.getElementById("btnReset"));
                var id = nodeHistoria.getAttribute("id");
                var form = document.getElementById("formulario");
                var formulario = document.getElementById("formNewHistoria");
                var divFondo = document.getElementById("fondo");
                form.onsubmit = bBacklog.eventos.tryUpdateHistoria;
                
                var nodeID = document.getElementById("id");
                nodeID.innerHTML = id;
                console.log(id+" en vBacklog");
                
                formulario.setAttribute("class","drawFormWhenNewHistoria");
                divFondo.setAttribute("class","drawBackgroundWhenNewHistoria");          
               
                document.getElementById("txtNombre").value = nodeHistoria.getElementsByClassName("nombreHU")[0].innerHTML;
                document.getElementById("txtCoste").value = nodeHistoria.getElementsByClassName("costeHU")[0].innerHTML;
                document.getElementById("txtValor").value = nodeHistoria.getElementsByClassName("valorHU")[0].innerHTML;
                document.getElementById("txtDesc").value = nodeHistoria.getElementsByClassName("descripcionHU")[0].innerHTML;
                
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