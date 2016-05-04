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
            historia.setID(pos);
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
        callbacks: {},
        eventos: {
            addHistoria: function() {
                var historia = vBacklog.acciones.getHistoriaFromForm();

                Backlog.addHistoria(historia);
                historia.setID(Backlog.historias.length);
                
                vBacklog.acciones.addHistoria(historia);
            },
            removeHistoria: function(historia) {  
                console.log(Backlog.removeHistoria(historia.getAttribute("id").substr(2)));
                vBacklog.acciones.removeHistoria(historia);
            }
        }
    }
})();