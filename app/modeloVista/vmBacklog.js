__________                  __    .__                   
\______   \_____     ____  |  | __|  |    ____    ____  
 |    |  _/\__  \  _/ ___\ |  |/ /|  |   /  _ \  / ___\ 
 |    |   \ / __ \_\  \___ |    < |  |__(  <_> )/ /_/  >
 |______  /(____  / \___  >|__|_ \|____/ \____/ \___  / 
        \/      \/      \/      \/             /_____/
var Backlog = (function() {
    'use strict';
    
    Backlog = {
        historias: [],
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
                var divBacklog = document.getElementById("backlog");
                divBacklog.appendChild(divHistoria);
            }
        }
    }
})();
