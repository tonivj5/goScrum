describe("La vista modelo del Backlog", function() {
    beforeAll(function() {
        vmBacklog.init();
    });
    
    it("debería inicializar con un array vacío de historias", function() {
       expect(vmBacklog.getHistorias().length).toBe(0);
    });
    
    describe("cuando el método init funciona bien", function() {
        beforeEach(function() {
            vmBacklog.init();
        });

        it("debería devolverme null al buscar una historia por su id si no existe", function() {
           expect(vmBacklog.getHistoriaByID("123abc")).toBe(null);
        });

        it("debería parsearme un json de error y devolvérmelo como objeto", function() {
            var json = '{"error": "prueba"}';
            expect(vmBacklog.parseHistoriaFromJSON(json).error).toBe("prueba");
        });

        it("debería parsearme un json de historia y devolvérmelo como objeto HistoriaUsuario", function() {
            var campos = ["id", "nombre", "descripcion", "valor", "coste"];
            var valores = ["123abc", "prueba", "historia de prueba", 100, 20];
            var json = '{';
            for(var i = 0; i < campos.length; i++) {
                json += '"' + campos[i] + '": ';

                if(isNaN(valores[i]))
                    json += '"' + valores[i] + '"';
                else
                    json += + valores[i]

                if(i != campos.length-1)
                     json += ', ';
            }

            json += '}';

            var obj = vmBacklog.parseHistoriaFromJSON(json);

            for(var i = 0; i < campos.length; i++) {
                expect(obj[campos[i]]).toBe(valores[i]);
            }

            expect(obj.getID()).toBe(valores[0]);
        });
    });
});
