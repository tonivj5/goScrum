// FIXME: Hay que desacoplar los elementos del DOM definidos en vBacklog para poder realizar test unitarios
describe("La vista del Backlog", function() {

    // Objeto Spy (simular el comportamiento del objeto)
    function crearSpyHistoria(id, nombre, coste, valor, descripcion) {
        var historiaPrueba = jasmine.createSpyObj("historia", ["getID", "getNombre", "getValor", "getCoste", "getDescripcion"]);
        historiaPrueba.getID.and.returnValue(id);
        historiaPrueba.getNombre.and.returnValue(nombre);
        historiaPrueba.getCoste.and.returnValue(coste);
        historiaPrueba.getValor.and.returnValue(valor);
        historiaPrueba.getDescripcion.and.returnValue(descripcion);
        
        return historiaPrueba;
    }
    
    beforeAll(function() {
        vBacklog.init = function() {
            vBacklog.DOM = {};
            vBacklog.DOM.formNewHistoria = document.createElement("div");
            vBacklog.DOM.fondo = document.createElement("div");
            vBacklog.DOM.btnNewHistoria = document.createElement("button");
            vBacklog.DOM.divHistorias = document.createElement("div");

            // Formulario #formulario
            vBacklog.DOM.formulario = {};
            vBacklog.DOM.formulario.node = document.createElement("form");
            // Inputs
            vBacklog.DOM.formulario.inputs = {};
            // Botones
            vBacklog.DOM.formulario.inputs.btnApply = document.createElement("button");
            vBacklog.DOM.formulario.inputs.btnCancel = document.createElement("button");
            vBacklog.DOM.formulario.inputs.btnReset = document.createElement("button");
            // Cajetines de texto
            vBacklog.DOM.formulario.inputs.txtNombre = document.createElement("input");
            vBacklog.DOM.formulario.inputs.txtCoste = document.createElement("input");
            vBacklog.DOM.formulario.inputs.txtValor = document.createElement("input");
            vBacklog.DOM.formulario.inputs.txtDesc = document.createElement("input");
            // Información
            vBacklog.DOM.formulario.inputs.idHistoria = document.createElement("span");
        };
    });
    
    beforeEach(function() {
        vBacklog.init();
    });

    it("debería devolver un div con los datos de las historia", function() {
        var historiaPrueba = crearSpyHistoria(1, "prueba", 100, 20, "esto es una historia de prueba");
        
        var divGenerado = vBacklog.acciones.drawHistoria(historiaPrueba);
        expect(divGenerado.getAttribute("id")).toBe("1");
        expect(divGenerado.innerHTML).toBe(
        "<ul>"+
            '<li>nombre = <span class="nombreHU">prueba</span></li>'+
            '<li>valor = <span class="valorHU">20</span></li>'+
            '<li>coste = <span class="costeHU">100</span></li>'+
            '<li>descripcion = <span class="descripcionHU">esto es una historia de prueba</span></li>'+
        "</ul>"+
        '<button id="btnUpdateHU1" onclick="vBacklog.acciones.showFormUpdateHistoria(this.parentNode)">Modificar</button>'+
        '<button id="btnRemoveHU1" onclick="bBacklog.eventos.tryRemoveHistoria(this.parentNode)">Borrar</button>'
        );
    });
    
    it("debería añadir una historia al div de historias", function() {
        var historiaP1 = crearSpyHistoria(1, "prueba", 100, 20, "esto es una historia de prueba");

        vBacklog.acciones.addHistoria(historiaP1);
        var divHistoria = vBacklog.DOM.divHistorias.querySelector('[id="1"]');

        expect(divHistoria).not.toBeNull();
    });
    
    it("debería añadir varias historias al div de historias", function() {
        var historiaP1 = crearSpyHistoria(1, "prueba", 100, 20, "esto es una historia de prueba");
        var historiaP2 = crearSpyHistoria(2, "prueba 2", 200, 40, "esto es una historia de prueba 2");
        
        vBacklog.acciones.addHistorias([historiaP1, historiaP2]);
        var numHistorias = vBacklog.DOM.divHistorias.querySelectorAll("div").length;
        
        expect(numHistorias).toBe(2);
    });
    
    it("debería eliminar una historia del div historias", function() {
        var historiaP1 = crearSpyHistoria(1, "prueba", 100, 20, "esto es una historia de prueba");

        vBacklog.acciones.addHistoria(historiaP1);
        vBacklog.acciones.removeHistoria(historiaP1);
        var nodeHistoria = vBacklog.DOM.divHistorias.querySelector('[id="1"]');
        
        expect(nodeHistoria).toBeNull();
    });
    
    it("debería modificar la historia, eliminando el nodo antiguo y reemplezándolo con el nuevo (es decir, nuevo id)", function() {
        var historiaP1 = crearSpyHistoria(1, "prueba", 100, 20, "esto es una historia de prueba");
        var historiaP2 = crearSpyHistoria(1, "prueba 2", 200, 40, "esto es una historia de prueba 2");
        
        vBacklog.acciones.addHistoria(historiaP1);
        var nodeHistoriaOutToDate = vBacklog.DOM.divHistorias.querySelector('[id="1"]');
        var newNodeHistoriaUpdate = vBacklog.acciones.drawHistoria(historiaP2);
        vBacklog.acciones.updateHistoria(newNodeHistoriaUpdate);
        var nodeHistoriaUpdated = vBacklog.DOM.divHistorias.querySelector('[id="1"]');
        var nombre = nodeHistoriaUpdated.querySelector(".nombreHU").innerHTML;
        var coste = nodeHistoriaUpdated.querySelector(".costeHU").innerHTML;
        var valor = nodeHistoriaUpdated.querySelector(".valorHU").innerHTML;
        var descripcion = nodeHistoriaUpdated.querySelector(".descripcionHU").innerHTML;
        
        expect(nodeHistoriaOutToDate).not.toBe(nodeHistoriaUpdated);
        expect(nombre).toBe("prueba 2");
        expect(coste).toBe("200");
        expect(valor).toBe("40");
        expect(descripcion).toBe("esto es una historia de prueba 2");
    });
    
    it("debería devolver un objeto historia", function() {
        var historiaP1 = crearSpyHistoria(1, "prueba", 100, 20, "esto es una historia de prueba");
        var nodeHistoria = vBacklog.acciones.drawHistoria(historiaP1);
        var historiaReal = vBacklog.acciones.getHistoriaFromNode(nodeHistoria);
        
        expect(historiaReal.getID()).toBe("1");
        expect(historiaReal.getNombre()).toBe("prueba");
        expect(historiaReal.getDescripcion()).toBe("esto es una historia de prueba"); 
        expect(historiaReal.getValor()).toBe(20);
        expect(historiaReal.getCoste()).toBe(100) ;
    });
});
