const editarDatos = () =>{
    let fecha       = document.getElementById('fechaEditar').value;
    let itemTurno   = document.getElementById('selectionTurno').value;
    let itemTabla   = document.getElementById('selectionTables').value;


    let objEditar = {
        fecha,
        itemTurno,
        itemTabla
    }    
    
    // Validación datos para la busqueda
    validarIngresoConsulta(objEditar);    
    editarTurno();
}

const validarIngresoConsulta = (obj) =>{    
    let error = "alert-warning";
    let errorFecha;
    let errorSelect;
    let fecha       = document.getElementById('fechaEditar');
    let itemTurno   = document.getElementById('selectionTurno');
    let itemTabla   = document.getElementById('selectionTables');

    if(obj.fecha == ''){        
        errorFecha = "fecha vacía";
        fecha.classList.add(error);
    }else{
        errorFecha = "ok";
        fecha.classList.remove(error);
    }
/*
    let objAUX = {
        itemTurno: itemTurno.value,
        itemTabla: itemTabla.value
    }

    console.log(objAUX);*/

    if(obj.itemTabla == 0 && obj.itemTurno == 0 || obj.itemTabla > 0 && obj.itemTurno > 0){
        errorSelect = "Select falla";        
        itemTurno.classList.add(error);
        itemTabla.classList.add(error);        
    }else{
        errorSelect = "ok";
        itemTurno.classList.remove(error);
        itemTabla.classList.remove(error);          
    }
    /*
    let errorObj = {
        errorFecha,
        errorSelect
    }*/        
}

const reiniciaCampos = () =>{
    let error       = "alert-warning";
    let fecha       = document.getElementById('fechaEditar');
    let itemTurno   = document.getElementById('selectionTurno');
    let itemTabla   = document.getElementById('selectionTables');
    fecha.value                 = "";
    itemTurno.selectedIndex     = "0";    
    itemTabla.selectedIndex     = "0";    
    itemTurno.classList.remove(error);
    itemTabla.classList.remove(error); 
    fecha.classList.remove(error);
}

const editarTurno = () =>{    
    
    let fecha = document.getElementById('fechaEditar').value;
    let selectionTurno = document.getElementById('selectionTurno').selectedIndex;
    let selectionTablas = document.getElementById('selectionTables').selectedIndex;

    let valores3 = fecha.split("-");
  
    let year = valores3[2];
    let month = valores3[1]-1;
    let days = valores3[0];

    let now = new Date(year, month, days);
    let start = new Date(now.getFullYear(), 0, 0);
    let diff = now - start;
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    obj =  {
                day, 
                day2:   bitacora(),   
                fecha
            };
    //buscarTurno(obj.day, obj.data);



     let dataTotal = new FormData();                     // Crear el formato para enviar datos 
     dataTotal.append("id",day);                          // Número de bitácora  
     dataTotal.append("guardarTurno","Fin");         
     dataTotal.append("fecha", fecha);                          
     dataTotal.append("selectionTurno", selectionTurno);         
     dataTotal.append("selectionTablas", selectionTablas);         
     
     let xhr = new XMLHttpRequest();                     // Crea objeto request
     xhr.open("POST", './Editar/editar.php', true);      // Abre comunicacion con archivo backend  
     xhr.onload = function(){                            // Funcion que recibe respuesta del servidor

       //console.log(this.responseText);       
       myObj = JSON.parse(this.responseText);                    
           //mostrarDatos(myObj);
           console.log(myObj);                                                   //DEBUG DON'T REMOVE

     };
     xhr.send(dataTotal);                                // Envía datos al servidor
     return false;                                       // Finaliza la funcion retornando false
   }