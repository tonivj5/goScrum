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
    // Aquí sólo irían los métodos para pintar lo que le lleguen.
    return {
        init: function() {
            // Hijos del nodo html
            vBacklog.DOM.formNewHistoria = document.getElementById("formNewHistoria");
            vBacklog.DOM.fondo = document.getElementById("fondo");
            vBacklog.DOM.btnNewHistoria = document.getElementById("btnNewHistoria");
            vBacklog.DOM.divHistorias = document.getElementById("divHistoriasUsuario");
            
            // Formulario #formulario
            vBacklog.DOM.formulario = {};
            vBacklog.DOM.formulario.node = document.getElementById("formulario");
            // Inputs
            vBacklog.DOM.formulario.inputs = {};
            // Botones
            vBacklog.DOM.formulario.inputs.btnApply = document.getElementById("btnApply");
            vBacklog.DOM.formulario.inputs.btnCancel = document.getElementById("btnCancel");
            vBacklog.DOM.formulario.inputs.btnReset = document.getElementById("btnReset");
            // Cajetines de texto
            vBacklog.DOM.formulario.titulo = document.getElementsByTagName("h3")[0];
            vBacklog.DOM.formulario.inputs.txtNombre = document.getElementById("txtNombre");
            vBacklog.DOM.formulario.inputs.txtCoste = document.getElementById("txtCoste");
            vBacklog.DOM.formulario.inputs.txtValor = document.getElementById("txtValor");
            vBacklog.DOM.formulario.inputs.txtDesc = document.getElementById("txtDesc");
            // Información
            vBacklog.DOM.formulario.inputs.idHistoria = document.getElementById("idHistoria");
            
            // Eventos globales
            vBacklog.DOM.btnNewHistoria.addEventListener("click", vBacklog.acciones.showFormNewHistoria);
            vBacklog.DOM.formulario.inputs.btnCancel.addEventListener("click",vBacklog.acciones.hideForm);
            
            console.log("Vista rulando");
        },
        DOM: {},
        acciones: {
            addHistorias: function(historias) {
                for(var i = 0; i < historias.length; i++) {
                    var nodeHistoria = vBacklog.acciones.drawHistoria(historias[i]);
                    vBacklog.DOM.divHistorias.appendChild(nodeHistoria);
                }
            },
            addHistoria: function(historia) {
                var nodeHistoria = vBacklog.acciones.drawHistoria(historia);
                vBacklog.DOM.divHistorias.appendChild(nodeHistoria);
            },
            removeHistoria: function(historia) {
                var nodeHistoria = document.getElementById(historia.getID());
                vBacklog.DOM.divHistorias.removeChild(nodeHistoria);
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
                domObject.innerHTML = "<h4 class='nombreHU'>"+historia.getNombre()+"</h4>"+
                                        "<hr/>"+
                                        "<ul>"+
                                            "<li>valor : <span class='valorHU'>"+historia.getValor()+"</span></li>"+
                                            "<li>coste : <span class='costeHU'>"+historia.getCoste()+"</span></li>"+
                                            "<li>descripcion : <span class='descripcionHU'>"+historia.getDescripcion()+"</span></li>"+
                                        "</ul>"+
                                        "<button id='btnUpdateHU"+id+"' class='update' onclick='vBacklog.acciones.showFormUpdateHistoria(this.parentNode)'></button>"+
                                        "<button id='btnRemoveHU"+id+"' class='remove' onclick='bBacklog.eventos.tryRemoveHistoria(this.parentNode)'></button>"+
                                        "<br/>";
                return domObject;
            },
            getHistoriaFromNode: function(nodeHistoria) {
                var id = nodeHistoria.getAttribute("id"),
                    nombre = nodeHistoria.querySelector(".nombreHU").innerHTML,
                    descripcion = nodeHistoria.querySelector(".descripcionHU").innerHTML,
                    valor = nodeHistoria.querySelector(".valorHU").innerHTML,
                    coste = nodeHistoria.querySelector(".costeHU").innerHTML;
               
                console.log("ID de la historia eliminada: " + id);
                
                return new HistoriaUsuario(id, nombre, descripcion, valor, coste);
            },
            getHistoriaFromForm: function() {
                var id = vBacklog.DOM.formulario.inputs.idHistoria.innerHTML,
                    txtNombre = vBacklog.DOM.formulario.inputs.txtNombre.value,
                    txtCoste = vBacklog.DOM.formulario.inputs.txtCoste.value,
                    txtValor = vBacklog.DOM.formulario.inputs.txtValor.value,
                    txtDesc = vBacklog.DOM.formulario.inputs.txtDesc.value;
                
                var historia = new HistoriaUsuario(id ,txtNombre, txtDesc, txtValor,txtCoste);

                return historia;
            },
            showFormNewHistoria: function() {
                vBacklog.DOM.formulario.inputs.btnReset.click();
                vBacklog.acciones.focus(vBacklog.DOM.formulario.inputs.txtNombre);
                vBacklog.DOM.formulario.titulo.innerHTML = "Añadir Historia";

                vBacklog.DOM.formulario.node.onsubmit = bBacklog.eventos.tryAddHistoria;
                vBacklog.DOM.formulario.inputs.btnApply.setAttribute("onclick", "");
                vBacklog.DOM.formNewHistoria.setAttribute("class","drawFormWhenNewHistoria");
                vBacklog.DOM.fondo.setAttribute("class","drawBackgroundWhenNewHistoria");
            },
            showFormUpdateHistoria: function(nodeHistoria){
                vBacklog.acciones.focus(vBacklog.DOM.formulario.inputs.txtNombre);
                var id = nodeHistoria.getAttribute("id");
                vBacklog.DOM.formulario.node.onsubmit = bBacklog.eventos.tryUpdateHistoria;
                vBacklog.DOM.formulario.titulo.innerHTML = "Modificar Historia";
                
                vBacklog.DOM.formulario.inputs.idHistoria.innerHTML = id;
                console.log(id+" en vBacklog");
                
                vBacklog.DOM.formNewHistoria.setAttribute("class","drawFormWhenNewHistoria");
                vBacklog.DOM.fondo.setAttribute("class","drawBackgroundWhenNewHistoria");          
               
                vBacklog.DOM.formulario.inputs.txtNombre.value = nodeHistoria.querySelector(".nombreHU").innerHTML;
                vBacklog.DOM.formulario.inputs.txtCoste.value = nodeHistoria.querySelector(".costeHU").innerHTML;
                vBacklog.DOM.formulario.inputs.txtValor.value = nodeHistoria.querySelector(".valorHU").innerHTML;
                vBacklog.DOM.formulario.inputs.txtDesc.value = nodeHistoria.querySelector(".descripcionHU").innerHTML;
                
            },
            hideForm: function() {
                vBacklog.DOM.formNewHistoria.setAttribute("class","hidden");
                vBacklog.DOM.fondo.setAttribute("class","hidden");
            },
            focus: function(elemento) {
              setTimeout(function() {
                    elemento.focus();
                }, 0);  
            }
        }
    };
})();
