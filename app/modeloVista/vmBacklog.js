/*
      .__                _____             .___     .__ __________                __   .__                 
___  _|__| ______  _  __/     \   ____   __| _/____ |  |\______   \_____    ____ |  | _|  |   ____   ____  
\  \/ /  |/ __ \ \/ \/ /  \ /  \ /  _ \ / __ |/ __ \|  | |    |  _/\__  \ _/ ___\|  |/ /  |  /  _ \ / ___\ 
 \   /|  \  ___/\     /    Y    (  <_> ) /_/ \  ___/|  |_|    |   \ / __ \\  \___|    <|  |_(  <_> ) /_/  >
  \_/ |__|\___  >\/\_/\____|__  /\____/\____ |\___  >____/______  /(____  /\___  >__|_ \____/\____/\___  / 
              \/              \/            \/    \/            \/      \/     \/     \/          /_____/  

*/
var Backlog = (function() {
    'use strict';
    
    return {
        init: function() {
            this.historias = [];
            var boton = document.getElementById("btnNewHistoria");

            boton.addEventListener("click", this.eventos.newHistoria);

            boton = document.getElementById("btnAddHistoria");
            
            boton.addEventListener("click", this.eventos.addHistoria);

            
        },
        getHistoriaByID: function(id) {
            for(var i = 0; i < this.historias.length; i++)
                if(this.historias[i].getID() == id)
                    return this.historias[i];
            
            return null;
        },
        getHistorias: function() {
            return this.historias;
        },
        addHistoria: function(historia) {
            var pos = this.historias.length;
            this.historias[pos] = historia;
            this.callbacks.addHistoria(historia);
        },
        removeHistoria: function(id) {
            for(var i = 0; i < this.historias.length; i++)
                if(this.historias[i].getID() == id) {
                    this.historias.splice(i, 1);
                    return true;
                }
            
            return false;
        },
        setCallback: function(callbackName, funcion) {
            this.callbacks[callbackName] = funcion;
        },
        getCallback: function(callbackName) {
            return this.callbacks[callbackName];
        },
        callbacks: {
            addHistoria: function(historia) {
                var divHistoria = drawHistoria(historia);
                var divBacklog = document.getElementById("divHistoriasUsuario");
                divBacklog.appendChild(divHistoria);
            }
        },
        eventos: {
            newHistoria: function() {
                var formulario = document.getElementById("formNewHistoria");
                var divFondo = document.getElementById("fondo");
                formulario.setAttribute("class","drawFormWhenNewHistoria");
                divFondo.setAttribute("class","drawBackgroundWhenNewHistoria");
            },
            addHistoria: function() {
                var divHistorias = document.getElementById("divHistoriasUsuario");
                var txtNombre = document.getElementById("txtNombre").value,
                    txtCoste = document.getElementById("txtCoste").value,
                    txtValor = document.getElementById("txtValor").value,
                    txtDesc = document.getElementById("txtDesc").value;
                
                var historia = new HistoriaUsuario(txtNombre, txtDesc, txtValor);
                historia.setID(Backlog.historias.length);
                Backlog.historias.push(historia);
                
                var divHistoria = drawHistoria(historia);
                divHistorias.appendChild(divHistoria);
                
                var formulario = document.getElementById("formNewHistoria");
                var divFondo = document.getElementById("fondo");
                formulario.setAttribute("class","hidden");
                divFondo.setAttribute("class","hidden");
            },
            removeHistoria: function(historia) {  
                var divHistorias = document.getElementById("divHistoriasUsuario");
                Backlog.removeHistoria(historia.getAttribute("id").substr(2));
                divHistorias.removeChild(historia);
            }
        }
    }
})();

Backlog.init();

console.log(Backlog);
