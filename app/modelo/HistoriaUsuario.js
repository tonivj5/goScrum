/*
  ___ ___  .__           __                 .__          ____ ___                              .__   
 /   |   \ |__|  _______/  |_  ____ _______ |__|_____   |    |   \ ______ __ __ _____  _______ |__|  ____ 
/    ~    \|  | /  ___/\   __\/  _ \\_  __ \|  |\__  \  |    |   //  ___/|  |  \\__  \ \_  __ \|  | /  _ \
\    Y    /|  | \___ \  |  | (  <_> )|  | \/|  | / __ \_|    |  / \___ \ |  |  / / __ \_|  | \/|  |(  <_> )
 \___|_  / |__|/____  > |__|  \____/ |__|   |__|(____  /|______/ /____  >|____/ (____  /|__|   |__| \____/
       \/           \/                               \/               \/             \/                  
*/
var HistoriaUsuario = (function(){
    'use strict';

    var HistoriaUsuario =  function(id,descripcion,valor,coste){
        this.id = id;
        this.descripcion = descripcion;
        this.valor = valor;
        this.coste = coste;
        //this.tareas = [];
    };

    HistoriaUsuario.prototype = {

        getID: function(){ 
            return this.id;
        },

        getDescripcion: function(){
            return this.descripcion;
        },

        getValor: function(){
            return this.valor;
        },
        getCoste: function(){
            return this.coste;
        },

        setID: function(id){
            this.id=id;
        },

        setDescripcion: function(descripcion){
            this.descripcion= descripcion;
        },

        setValor: function(valor){
            this.valor=valor;
        },
        setCoste: function(coste){
            this.coste=coste;
        }

        /*
        removeTarea: function(id){

            for(var i=0;this.tareas.length;i++){
                if(this.tareas[i].getID==id){
                    this.tareas.splice(i,1);
                    return true;
                }
            }

            return false;
        }
        */

    }

return HistoriaUsuario;

})();
