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
            addHistoria: function(e) {
                e.preventDefault();
                var form = e.target;
                console.log(form);
                
                var historia = vBacklog.acciones.getHistoriaFromForm();
                
                if(vmBacklog.checkID(historia.getID(), null)){
                    vmBacklog.addHistoria(historia);
                    vBacklog.acciones.addHistoria(historia);
                    vBacklog.acciones.hideForm();
                } else {
                    alert("El nombre de la historia ya existe");
                }
            },
            removeHistoria: function(nodeHistoria) {
                var historia = vBacklog.acciones.getHistoriaFromNode(nodeHistoria);
                vmBacklog.removeHistoria(historia);
                vBacklog.acciones.removeHistoria(nodeHistoria);
                
            },
            updateHistoria: function(e) {
                e.preventDefault();
                var form = e.target;
                var nodeOldID = form.querySelector("#oldID");
                var oldID = nodeOldID.innerHTML;
                nodeOldID.parentNode.removeChild(nodeOldID);
                console.log("OLD ID: "+oldID);
                
                var historia = vBacklog.acciones.getHistoriaFromForm();
                var newNodeHistoria = vBacklog.acciones.drawHistoria(historia);
                
                        
                if(vmBacklog.checkID(historia.getID(), oldID)){
                    vmBacklog.updateHistoria(historia, oldID);
                    vBacklog.acciones.updateHistoria(newNodeHistoria, oldID);
                    vBacklog.acciones.hideForm();
                } else {
                    alert("El nombre de la historia ya existe");
                }
            }
        }
    }
})();

bBacklog.init();
