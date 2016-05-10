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
        eventos: {
            addHistoria: function() {
                var historia = vBacklog.acciones.getHistoriaFromForm();
                vmBacklog.addHistoria(historia);
                vBacklog.acciones.addHistoria(historia);
                vBacklog.acciones.hideForm();
            },
            removeHistoria: function(nodeHistoria) {
                var historia = vBacklog.acciones.getHistoriaFromNode(nodeHistoria);
                vmBacklog.removeHistoria(historia);
                vBacklog.acciones.removeHistoria(nodeHistoria);
            },
            updateHistoria: function(nodeHistoria,oldnodeHistoria) {
                
                var oldId = oldnodeHistoria.getAttribute("id");
                
                var id = nodeHistoria.querySelector("#txtNombre").value,
                    coste = nodeHistoria.querySelector("#txtCoste").value,
                    valor = nodeHistoria.querySelector("#txtValor").value,
                    descripcion = nodeHistoria.querySelector("#txtDesc").value;

                var historia = new HistoriaUsuario(id, descripcion, valor, coste);
                var newNodeHistoria = vBacklog.acciones.drawHistoria(historia);

                vmBacklog.updateHistoria(historia,oldId);
                vBacklog.acciones.updateHistoria(newNodeHistoria,oldId);
                vBacklog.acciones.hideForm();
            }
        }
    }
})();

bBacklog.init();
