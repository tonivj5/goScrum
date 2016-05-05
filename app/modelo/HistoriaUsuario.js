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

    var HistoriaUsuario = function(id, nombre, descripcion, valor){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.valor = valor;
        this.tareas = [];
    };

    HistoriaUsuario.prototype = {

        getID: function(){ 
            return this.id;
        },

        getNombre: function(){
            return this.nombre;
        },

        getDescripcion: function(){
            return this.descripcion;
        },

        getValor: function(){
            return this.valor;
        },

        getTareas: function(){
            return this.tareas;
        },

        setID: function(id){
            this.id=id;
        },

        setNombre: function(nombre){
             this.nombre=nombre;
        },

        setDescripcion: function(descripcion){
            this.descripcion= descripcion;
        },

        setValor: function(valor){
            this.valor=valor;
        },

        addTarea: function(tarea){
            this.tareas.push(tarea);
        },

        removeTarea: function(id){

            for(var i=0;this.tareas.length;i++){
                if(this.tareas[i].getID==id){
                    this.tareas.splice(i,1);
                    return true;
                }
            }

            return false;
        },

        modificarHistoria: function(nombre,descripcion,valor){
            this.setNombre(nombre);
            this.setDescripcion(descripcion);
            this.setValor(valor);    
        }

    }

return HistoriaUsuario;

})();
