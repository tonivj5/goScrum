var BD = {
    init: function(IP) {
        this.IP = IP;
        this.AJAX = BD.createAjaxObj();
    },
    sendHistoria: function(historia) {
        // Esto iría en el vm
        var formData = new FormData();
        formData.append("id", historia.getID());
        formData.append("nombre", historia.getNombre());
        formData.append("coste", historia.getCoste());
        formData.append("valor", historia.getValor());
        formData.append("descripcion", historia.getDescripcion());
    },
    createAjaxObj: function(accion) {
        var xhttp;
        if(window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest();
        } else {
            // IE 5 - 6
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        xhttp.onreadystatechange = function(accion) {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                accion(xhttp.responseText);
            }
        };
        
        return xhttp;
    },
    callbacks: {
        
    }
}