function drawHistoria(historiaUsuario){
    
                    var domObject = document.createElement("div");
                    domObject.setAttribute("class","historia");
                    domObject.setAttribute("id",historiaUsuario.id);
                    domObject.innerHTML = "<ul>"+
                                                "<li>nombre = "+historiaUsuario.nombre+"</li>"+
                                                "<li>descripcion = "+historiaUsuario.descripcion+"</li>"+
                                                "<li>valor = "+historiaUsuario.valor+"</li>"+
                                            "</ul>"+
                                            "<button class='detalles'>Detalles</button>"+
                                            "<button class='borrar'>Borrar</button>";
                    return domObject;
                }