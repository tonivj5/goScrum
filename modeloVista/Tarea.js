   var Tarea = (function() {
       'use strict';
        var Tarea = function(nombre, descripcion, coste) {
            this.nombre = nombre;
            this.descripcion = descripcion;
            this.coste = coste;
        };

       Tarea.prototype = {
            getNombre: function(nombre) {
              this.nombre = nombre;  
            },
            setNombre: function(nombre) {
                this.nombre = nombre;
            },
            getDescripcion: function() {

            },
            setDescripcion: function(descripcion) {
                this.descripcion = descripcion;
            },
            getCoste: function() {
                return this.coste;
            },
            setCoste: function(coste) {
                this.coste = coste;
            },
            getID: function() {
                return this.id;
            },
            setID: function(id) {
                this.id = id;
            }
        };

        return Tarea;
})();