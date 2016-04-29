var HistoriaUsuario =  {
    
                id:null,
                etiqueta:null,
                descripcion:null,
                valor:null,
                
                meta: {
                    tipo:"historia",
                    metodologia:"scrum"
                },
                
                init: function(id,etiqueta,descripcion,valor){
                    this.id = id;
                    this.etiqueta = etiqueta;
                    this.descripcion=descripcion;
                    this.valor=valor;
                
                }
                
            };