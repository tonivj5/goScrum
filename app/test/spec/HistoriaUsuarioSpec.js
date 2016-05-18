describe("Una historia de usuario", function() {
    var historia;
    
    beforeEach(function() {
        historia = new HistoriaUsuario("1234abcd", "prueba", "historia de prueba", 100, 20);
    });
    
    it("debería tener ID", function() {
        expect(historia.getID()).toBe("1234abcd");
    });
    
    it("debería tener nombre", function() {
        expect(historia.getNombre()).toBe("prueba");
    });
    
    it("debería tener descripcion", function() {
       expect(historia.getDescripcion()).toBe("historia de prueba"); 
    });
    
    it("debería tener valor de negocio", function() {
        expect(historia.getValor()).toBe(100);
    });
    
    it("debería tener coste", function() {
       expect(historia.getCoste()).toBe(20) ;
    });
});
