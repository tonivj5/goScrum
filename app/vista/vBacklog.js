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
            btnNewHistoria.addEventListener("click", this.eventos.newHistoria);
            var btnAddHistoria = document.getElementById("btnAddHistoria");
            btnAddHistoria.addEventListener("click", this.eventos.addHistoria);
        },
        acciones: {
            addHistoria: function(historia) {
                historia.setID(Backlog.historias.length);
                Backlog.historias.push(historia);
                
                var divHistoria = drawHistoria(historia);
                divHistorias.appendChild(divHistoria);
                
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
                
                var historia = new HistoriaUsuario(txtNombre, txtDesc, txtValor);
                
                return historia;
            },
            removeHistoria: function(divHistoria) {
                var divHistorias = document.getElementById("divHistoriasUsuario");
                divHistorias.removeChild(historia);
            },
            drawHistoria: function drawHistoria(historia){
                var id = "HU"+historia.getID();
                var domObject = document.createElement("div");
                domObject.setAttribute("class", "historia");
                domObject.setAttribute("id", id);
                domObject.innerHTML = "<ul>"+
                                            "<li>nombre = "+historia.getNombre()+"</li>"+
                                            "<li>descripcion = "+historia.getDescripcion()+"</li>"+
                                            "<li>valor = "+historia.getValor()+"</li>"+
                                        "</ul>"+
                                        "<button class='detalles'>Detalles</button>"+
                                        "<button id='btnRemoveHU"+historia.getID()+"' onclick='Backlog.eventos.removeHistoria(this.parentNode)'>Borrar</button>";
                return domObject;
            }
        }
    }
});