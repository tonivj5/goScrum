
function drawHistoria(historiaUsuario){
    var id = "HU"+historiaUsuario.getID();
    var domObject = document.createElement("div");
    domObject.setAttribute("class", "historia");
    domObject.setAttribute("id", id);
    domObject.innerHTML = "<ul>"+
                                "<li>nombre = "+historiaUsuario.getNombre()+"</li>"+
                                "<li>descripcion = "+historiaUsuario.getDescripcion()+"</li>"+
                                "<li>valor = "+historiaUsuario.getValor()+"</li>"+
                            "</ul>"+
                            "<button class='detalles'>Detalles</button>"+
                            "<button id='btnRemoveHistoria"+historiaUsuario.getID()+"' onclick='Backlog.eventos.removeHistoria(this.parentNode)'>Borrar</button>";
    return domObject;
}
