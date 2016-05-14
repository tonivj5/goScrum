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
        },
        setAfterCallback: function(afterCallback){
            this.afterCallback=afterCallback;
        },
        callback: function(respuesta){
            if(vmBacklog.checkAnswer(respuesta)){
                var historia = vmBacklog.parseHistoriaFromJSON(respuesta);
                //sera un metodo del atributo eventos
                this.afterCallback(historia);
            }else{
                //mejorar vista de errores
                alert("Error"+resuesta["error"]);
            }
        },
        eventos: {
            tryAddHistoria: function(e) {
                e.preventDefault();
                var form = e.target;
                
                var historia = vBacklog.acciones.getHistoriaFromForm();
                
                if(vmBacklog.checkID(historia.getID(), null)){
                    bBacklog.setAfterCallback(bBacklog.eventos.addHistoria);
                
                    //llamada AJAX que siempre llama ha callback
                    
                    //solo de prueba---------------------------------------------
                    var object = {"id":historia.getID(),
                                       "descripcion":historia.getDescripcion(),
                                       "valor":historia.getValor(),
                                       "coste":historia.getCoste()};
                    console.log(object);
                    bBacklog.callback(object);
                    //-----------------------------------------------------------
                    
                } else {
                    alert("El nombre de la historia ya existe");
                }
            },
            addHistoria: function(historia){
                vmBacklog.addHistoria(historia);
                vBacklog.acciones.addHistoria(historia);
                vBacklog.acciones.hideForm();
            },
            tryRemoveHistoria : function(nodeHistoria){
                //intentar cambiar el parametro pasado para que solo sea la id y no todo el dom
                var id = nodeHistoria.getAttribute("id");
                //para la prueba
                var historia = vmBacklog.getHistoriaByID(id);
                //--------------------------
                
                bBacklog.setAfterCallback(bBacklog.eventos.removeHistoria);
                //llamada AJAX que siempre llama ha callback
                
                //solo de prueba---------------------------------------------
                bBacklog.callback({"id":historia.getID(),
                                       "descripcion":historia.getDescripcion(),
                                       "valor":historia.getValor(),
                                       "coste":historia.getCoste()});
                //-----------------------------------------------------------
            },
            removeHistoria: function(historia) {
                vmBacklog.removeHistoria(historia);
                vBacklog.acciones.removeHistoria(historia);
            },
            tryUpdateHistoria: function(e) {
                e.preventDefault();
                var form = e.target;
                var oldID = vBacklog.acciones.getOldID();
                console.log("OLD ID: "+oldID);    
                var historia = vBacklog.acciones.getHistoriaFromForm();
                
                if(vmBacklog.checkID(historia.getID(), oldID)){
                    bBacklog.setAfterCallback(bBacklog.eventos.updateHistoria);
                    //llamada AJAX que siempre llama ha callback
            
                    //solo de prueba---------------------------------------------
                    bBacklog.callback({"id":historia.getID(),
                                       "descripcion":historia.getDescripcion(),
                                       "valor":historia.getValor(),
                                       "coste":historia.getCoste()});
                    //-----------------------------------------------------------
                } else {
                    alert("El nombre de la historia ya existe");
                }
            },
            updateHistoria: function(historia){
                // intentar modificar el paso de oldID
                var oldID = vBacklog.acciones.getOldID();
                var newNodeHistoria = vBacklog.acciones.drawHistoria(historia);
                vmBacklog.updateHistoria(historia, oldID);
                vBacklog.acciones.updateHistoria(newNodeHistoria, oldID);
                vBacklog.acciones.hideForm();
            }
        }
    }
})();

bBacklog.init();
