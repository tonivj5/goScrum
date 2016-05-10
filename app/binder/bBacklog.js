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
                
                switch (vmBacklog.checkID(historia.getID(), null)){
                    case 0:
                        vmBacklog.addHistoria(historia);
                        vBacklog.acciones.addHistoria(historia);
                        vBacklog.acciones.hideForm();
                        break;
                    case 1:
                         alert("No puedes introducir dos historias con el mismo nombre");
                        break;
                    case 2:
                         alert("No se permite el nombre vacio ni que contenga espacios");
                        break;
                }
            },
            removeHistoria: function(nodeHistoria) {
                var historia = vBacklog.acciones.getHistoriaFromNode(nodeHistoria);
                vmBacklog.removeHistoria(historia);
                vBacklog.acciones.removeHistoria(nodeHistoria);
                
            },
            updateHistoria: function(nodeHistoria,oldNodeHistoria) {
                var oldID = oldNodeHistoria.getAttribute("id");
                var id = nodeHistoria.querySelector("#txtID").value,
                    coste = nodeHistoria.querySelector("#txtCoste").value,
                    valor = nodeHistoria.querySelector("#txtValor").value,
                    descripcion = nodeHistoria.querySelector("#txtDesc").value;

                var historia = new HistoriaUsuario(id, descripcion, valor, coste);
                var newNodeHistoria = vBacklog.acciones.drawHistoria(historia);
                
                switch (vmBacklog.checkID(id, oldID)){
                    case 0:
                        vmBacklog.updateHistoria(historia, oldID);
                        vBacklog.acciones.updateHistoria(newNodeHistoria, oldID);
                        vBacklog.acciones.hideForm();
                        break;
                    case 1:
                         alert("Ya hay una historia con ese nombre");
                        break;
                    case 2:
                         alert("No se permite el nombre vacio ni que contenga espacios");
                        break;
                }
            }
        }
    }
})();

bBacklog.init();
