/*
__________.__            .___          __________                __   .__                 
\______   \__| ____    __| _/__________\______   \_____    ____ |  | _|  |   ____   ____  
 |    |  _/  |/    \  / __ |/ __ \_  __ \    |  _/\__  \ _/ ___\|  |/ /  |  /  _ \ / ___\ 
 |    |   \  |   |  \/ /_/ \  ___/|  | \/    |   \ / __ \\  \___|    <|  |_(  <_> ) /_/  >
 |______  /__|___|  /\____ |\___  >__|  |______  /(____  /\___  >__|_ \____/\____/\___  / 
        \/        \/      \/    \/             \/      \/     \/     \/          /_____/  
*/
var bBacklog = (function() {
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
            },
            removeHistoria: function(nodeHistoria) {
                // No settea el ID
                var historia = vBacklog.acciones.getHistoriaFromNode(nodeHistoria);
                // Al no tener ID no se puede eliminar
                vmBacklog.removeHistoria(historia);
                vBacklog.acciones.removeHistoria(nodeHistoria);
            },
            updateHistoria: function() {                
                var id = document.getElementById("txtID").value,
                    nombre = document.getElementById("txtNombre").value,
                    coste = document.getElementById("txtCoste").value,
                    valor = document.getElementById("txtValor").value,
                    descripcion = document.getElementById("txtDesc").value;
                
                var historia = new HistoriaUsuario(id,nombre,descripcion,valor,coste);
                var nodeHistoria = vBacklog.acciones.drawHistoria(historia);
    
                vmBacklog.updateHistoria(historia);
                vBacklog.acciones.updateHistoria(nodeHistoria);
            }
        }
    }
})();

bBacklog.init();
