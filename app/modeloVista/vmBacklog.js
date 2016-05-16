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
            vmBacklog.historias = [];
        },
        getHistoriaByID: function(id) {
            for(var i = 0; i < vmBacklog.historias.length; i++)
                if(vmBacklog.historias[i].getID() == id)
                    return vmBacklog.historias[i];
            
            return null;
        },
        getHistorias: function() {
            return vmBacklog.historias;
        },
        addHistoria: function(historia) {
            var pos = vmBacklog.historias.length;
            vmBacklog.historias[pos] = historia;
            console.log(vmBacklog.historias);
        },
        addHistorias: function(historias) {
          for(var i = 0; i < historias.length; i++)
              vmBacklog.addHistoria(historias[i]);
        },
        removeHistoria: function(historia) {
            for(var i = 0; i < vmBacklog.historias.length; i++)
                if(vmBacklog.historias[i].getID() == historia.getID()) {
                    vmBacklog.historias.splice(i, 1);
                    return true;
                }
            
            return false;
        },
        updateHistoria: function(historia,oldID){
            for(var i = 0; i < vmBacklog.historias.length; i++)
                if(vmBacklog.historias[i].getID() == oldID) {
                    vmBacklog.historias[i]=historia;
                    return true;
                }
             
            return false;
        },
        checkID: function(id, oldID){
            
            if(id == oldID) {
                return true;
            }
            
            for(var i = 0; i < vmBacklog.historias.length; i++)
                if(vmBacklog.historias[i].getID() == id) {
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
            respuesta = JSON.parse(respuesta);
            if(!respuesta["error"]) {
                if(Array.isArray(respuesta)) {
                    for(var i = 0; i < respuesta.length; i++) {
                        var data = respuesta[i];   
                        respuesta[i] = new HistoriaUsuario(data.nombre, data.descripcion, data.valor, data.coste);
                    }
                    console.log(respuesta);
                } else {
                    respuesta = new HistoriaUsuario(respuesta.nombre, respuesta.descripcion, respuesta.valor, respuesta.coste);
                }
            }
            return respuesta;
        }
        /*
        setCallback: function(callbackName, funcion) {
            vmBacklog.callbacks[callbackName] = funcion;
        },
        getCallback: function(callbackName) {
            return vmBacklog.callbacks[callbackName];
        },
        callbacks: {}
        */
    }
})();
