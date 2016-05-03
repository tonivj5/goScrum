function botonNuevaHistoria(){
    
    var boton = document.getElementById("btn-nueva-historia");

    boton.addEventListener("click",function(){
        var formulario=document.getElementById("nueva-historia");
        formulario.setAttribute("class","visto");
        fondo.setAttribute("class","fondo");

    });
}
function botonBorrarHistoria(id){
    var boton = document.getElementById("btn-borrar-historia");
    
    
    boton.addEventListener("click",function(){
        var contenedor = document.getElementById("historiasUsuario");
        var historia = document.getElementById(id);
        contenedor.removeChild(historia);
    });
}
