var Backlog = (function() {
    'use strict';
    var Backlog = function() {
        this.historias = [];
    }
    
    Backlog.prototype = {
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
        },
        removeHistoria: function(id) {
            for(var i = 0; i < this.historias.length; i++)
                if(this.historias[i].getID() == id) {
                    this.historias.splice(i, 1);
                    return true;
                }
            
            return false;
        }
    }
})();