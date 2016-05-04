var bBacklog = (function() {
    return {
        init: function() {
            vBacklog.init();
            Backlog.init();
        },
        eventos: {
            addHistoria: function() {
                var historia = vBacklog.acciones.getHistoriaFromForm();
                Backlog.addHistoria(historia);
                vBacklog.acciones.addHistoria(historia);
            },
            removeHistoria: function(nodeHistoria) {
                // No settea el ID
                var historia = vBacklog.acciones.getHistoriaFromNode(nodeHistoria);
                // Al no tener ID no se puede eliminar
                Backlog.removeHistoria(historia);
                vBacklog.acciones.removeHistoria(nodeHistoria);
            }
        }
    }
})();

bBacklog.init();
