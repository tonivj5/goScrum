/*
__________.__            .___          __________                __   .__                 
\______   \__| ____    __| _/__________\______   \_____    ____ |  | _|  |   ____   ____  
 |    |  _/  |/    \  / __ |/ __ \_  __ \    |  _/\__  \ _/ ___\|  |/ /  |  /  _ \ / ___\ 
 |    |   \  |   |  \/ /_/ \  ___/|  | \/    |   \ / __ \\  \___|    <|  |_(  <_> ) /_/  >
 |______  /__|___|  /\____ |\___  >__|  |______  /(____  /\___  >__|_ \____/\____/\___  / 
        \/        \/      \/    \/             \/      \/     \/     \/          /_____/  
*/
var bBacklog = (function() {
    // Aquí iría la extracción de elementos del DOM y pasarlos al vm
    return {
        init: function() {
            vBacklog.init();
            vmBacklog.init();
            DB.init("http://localhost:5000/historias/");
            bBacklog.eventos.getAllHistorias();
        },
        setAfterCallback: function(afterCallback){
            bBacklog.afterCallback=afterCallback;
        },
        callback: function(respuesta){
            respuesta = vmBacklog.parseHistoriaFromJSON(respuesta);
            if(vmBacklog.checkAnswer(respuesta)) {
                bBacklog.afterCallback(respuesta);
            } else {
                // TODO: mejorar vista de errores
                alert("Error " + respuesta["error"]);
            }
        },
        eventos: {
            getAllHistorias: function() {
                bBacklog.setAfterCallback(function(historias) {
                    vmBacklog.addHistorias(historias);
                    vBacklog.acciones.addHistorias(historias);
                });
                DB.setCallback(bBacklog.callback);
                DB.consulta({op: "GETALL", data: null});  
            },
            tryAddHistoria: function(e) {
                e.preventDefault();
                var form = e.target;
                
                var historia = vBacklog.acciones.getHistoriaFromForm();
                
                bBacklog.setAfterCallback(bBacklog.eventos.addHistoria);
                DB.setCallback(bBacklog.callback);
                DB.consulta({op: "POST", data: historia});
            },
            addHistoria: function(historia){
                vmBacklog.addHistoria(historia);
                vBacklog.acciones.addHistoria(historia);
                vBacklog.acciones.hideForm();
            },
            tryRemoveHistoria : function(nodeHistoria){
                // TODO: Intentar cambiar el parametro pasado para que solo sea la id y no todo el nodo
                var id = nodeHistoria.getAttribute("id");
                
                var historia = vmBacklog.getHistoriaByID(id);
                DB.setCallback(bBacklog.callback);
                bBacklog.setAfterCallback(bBacklog.eventos.removeHistoria);
                DB.consulta({op: "DELETE", data: historia});
            },
            removeHistoria: function(historia) {
                vmBacklog.removeHistoria(historia);
                vBacklog.acciones.removeHistoria(historia);
            },
            tryUpdateHistoria: function(e) {
                e.preventDefault();
                var form = e.target;
               
                var historia = vBacklog.acciones.getHistoriaFromForm();
                
                bBacklog.setAfterCallback(bBacklog.eventos.updateHistoria);
                DB.setCallback(bBacklog.callback);
                DB.consulta({op: "PATCH", data: historia});
            },
            updateHistoria: function(historia){
                var newNodeHistoria = vBacklog.acciones.drawHistoria(historia);
                vmBacklog.updateHistoria(historia);
                vBacklog.acciones.updateHistoria(newNodeHistoria);
                vBacklog.acciones.hideForm();
            }
        }
    }
})();

bBacklog.init();
