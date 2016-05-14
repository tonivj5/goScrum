/*
      .__                _____             .___     .__ __________                __   .__                 
___  _|__| ______  _  __/     \   ____   __| _/____ |  |\______   \_____    ____ |  | _|  |   ____   ____  
\  \/ /  |/ __ \ \/ \/ /  \ /  \ /  _ \ / __ |/ __ \|  | |    |  _/\__  \ _/ ___\|  |/ /  |  /  _ \ / ___\ 
 \   /|  \  ___/\     /    Y    (  <_> ) /_/ \  ___/|  |_|    |   \ / __ \\  \___|    <|  |_(  <_> ) /_/  >
  \_/ |__|\___  >\/\_/\____|__  /\____/\____ |\___  >____/______  /(____  /\___  >__|_ \____/\____/\___  / 
              \/              \/            \/    \/            \/      \/     \/     \/          /_____/  

*/
var vmBacklog = (function() {
    // Aquí iría la lógica de Negocio
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
            console.log(this.historias);
        },
        removeHistoria: function(historia) {
            for(var i = 0; i < this.historias.length; i++)
                if(this.historias[i].getID() == historia.getID()) {
                    this.historias.splice(i, 1);
                    return true;
                }
            
            return false;
        },
        updateHistoria: function(historia,oldID){
            for(var i = 0; i < this.historias.length; i++)
                if(this.historias[i].getID() == oldID) {
                    this.historias[i]=historia;
                    return true;
                }
             
            return false;
        },
        checkID: function(id, oldID){
            
            if(id == oldID) {
                return true;
            }
            
            for(var i = 0; i < this.historias.length; i++)
                if(this.historias[i].getID() == id) {
                    return false;
                }
             
            return true;
        },
        checkAnswer(respuesta){
            if(respuesta["error"]){
                return false;
            }
            return true;
        },
        parseHistoriaFromJSON(respuesta){
            var historia = new HistoriaUsuario(respuesta["id"],respuesta["descripcion"],respuesta["valor"],respuesta["coste"]);
            return historia;
        }
        /*
        setCallback: function(callbackName, funcion) {
            this.callbacks[callbackName] = funcion;
        },
        getCallback: function(callbackName) {
            return this.callbacks[callbackName];
        },
        callbacks: {}
        */
    }
})();
