const buscarDatos = () => {
  data = document.getElementById("fechaBuscarTurno").value;

  let valores3 = data.split("-");

  let year = valores3[2];
  let month = valores3[1] - 1;
  let days = valores3[0];

  let now = new Date(year, month, days);
  let start = new Date(now.getFullYear(), 0, 0);
  let diff = now - start;
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);
  obj = {
    day,
    day2: bitacora(),
    data,
  };
  buscarTurno(obj.day, obj.data);
};

const bitacora = () => {
  let now = new Date();
  let start = new Date(now.getFullYear(), 0, 0);
  let diff = now - start;
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);
  return day;
};

// ********************* INICIO COMUNICACION CON EL BACKEND ENVIA DATOS ENTREGA PRIMER TURNO ********************** //

const buscarTurno = (id, fecha) => {
  mostrarErrorBitacora(false);

  let dataTotal = new FormData(); // Crear el formato para enviar datos
  dataTotal.append("id", id); // Número de bitácora
  dataTotal.append("guardarTurno", "Fin");
  dataTotal.append("fecha", fecha);

  let xhr = new XMLHttpRequest(); // Crea objeto request
  xhr.open("POST", "./Buscar/bucarTurno.php", true); // Abre comunicacion con archivo backend
  xhr.onload = function () {
    // Funcion que recibe respuesta del servidor

    //console.log(this.responseText);
    myObj = JSON.parse(this.responseText);
    let fechaInicio = myObj[0].fechaInicio;
    let fechaFinal = myObj[0].fechaFinal;
    let fechaBusqueda = myObj[0].fechaBusqueda;

    if (myObj[0].Error != "Sin datos para la busqueda") {
      document.getElementById("datosMostrados").style.display = "none";
      mostrarDatos(myObj);
      //console.log(myObj); //DEBUG DON'T REMOVE
    } else {
      document.getElementById("datosMostrados").style.display = "none";
      mostrarErrorBitacora(true, fechaInicio, fechaFinal, fechaBusqueda);
    }
  };

  xhr.send(dataTotal); // Envía datos al servidor
  return false; // Finaliza la funcion retornando false
};

// Mostrar error bitacora cuando no se encuentra

const mostrarErrorBitacora = (
  condicion,
  fechaInicio,
  fechaFinal,
  fechaBusqueda
) => {
  let error = document.getElementById("ErrorData");
  let text = "";

  let fecha = new Date(); //Fecha actual
  let mes = fecha.getMonth() + 1; //obteniendo mes
  let dia = fecha.getDate(); //obteniendo dia
  let anio = fecha.getFullYear(); //obteniendo año
  if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
  if (mes < 10) mes = "0" + mes; //agrega cero si el menor de 10
  let value = dia + "-" + mes + "-" + anio;

  if (condicion) {
    text = `
        <div class="alert alert-danger" role="alert">
            No existe la bitácora de la fecha <strong>"${fechaBusqueda}"</strong> !!!
            <br>
            Datos disponibles desde
            <br>
            <strong>${fechaInicio} hasta ${fechaFinal}</strong>
            <br>
            Formato dia-mes-año
        </div>`;
  } else {
    text = "";
  }

  error.innerHTML = text;
};

// ********************* FIN COMUNICACION CON EL BACKEND ENVIA DATOS ENTREGA PRIMER TURNO ********************** //

const imprimirFun = (objeto) => {
  let text = "";
  let object = objeto[0];
  for (const property in object) {
    text += `${property}: ${object[property]} \n`;
  }
  return text;
};

// Mostrar Datos

const mostrarDatos = (objeto) => {
  document.getElementById("bodyTablaDia").innerHTML = "";
  document.getElementById("bodyTablaNoche").innerHTML = "";
  let inicioPrimerTurno = objeto[0];
  let finPrimerTurno = objeto[1];
  let inicioSegundoTurno = objeto[2];
  let finSegundoTurno = objeto[3];
  let alarmasPrimerTurno = objeto[4];
  let alarmasSegundoTurno = objeto[5];
  let flushingPrimerTurno = objeto[6];
  let flushingSegundoTurno = objeto[7];
  let limpiezaRejillasPrimerTurno = objeto[8];
  let limpiezaRejillasSegundoTurno = objeto[9];
  let limpiezaTanquesPrimerTurno = objeto[10];
  let limpiezaTanquesSegundoTurno = objeto[11];
  let rioPrimerTurno = objeto[12];
  let rioSegundoTurno = objeto[13];
  let disparosInternosPrimeroTurno = objeto[14];
  let disparosInternosSegundoTurno = objeto[15];
  let disparosExternosPrimeroTurno = objeto[16];
  let disparosExternosSegundoTurno = objeto[17];
  let compuertasPrimerTurno = objeto[18];
  let compuertasSegundoTurno = objeto[19];
  let azudPrimerTurno = objeto[20];
  let azudSegundoTurno = objeto[21];
  let observacionesPrimerTurno = objeto[22];
  let observacionesSegundoTurno = objeto[23];

  mostrarDatosAlarmas(
    alarmasPrimerTurno,
    "alarmasDiaValores",
    "Alarmas",
    "bodyTablaDia"
  );
  mostrarDatosAlarmas(
    alarmasSegundoTurno,
    "alarmasNocheValores",
    "Alarmas",
    "bodyTablaNoche"
  );

  mostrarDatosFlushing(
    flushingPrimerTurno,
    "flushingDiaValores",
    "Flushing",
    "bodyTablaDia"
  );
  mostrarDatosFlushing(
    flushingSegundoTurno,
    "flushingNocheValores",
    "Flushing",
    "bodyTablaNoche"
  );

  mostrarLimpiezaRejillas(
    limpiezaRejillasPrimerTurno,
    "rejillasDiaValores",
    "Rejillas",
    "bodyTablaDia"
  );
  mostrarLimpiezaRejillas(
    limpiezaRejillasSegundoTurno,
    "rejillasNocheValores",
    "Rejillas",
    "bodyTablaNoche"
  );

  mostrarLimpiezaTanques(
    limpiezaTanquesPrimerTurno,
    "tanquesDiaValores",
    "Tanques",
    "bodyTablaDia"
  );
  mostrarLimpiezaTanques(
    limpiezaTanquesSegundoTurno,
    "tanquesNocheValores",
    "Tanques",
    "bodyTablaNoche"
  );

  mostrarLimpiezaRio(rioPrimerTurno, "rioDiaValores", "Rio", "bodyTablaDia");
  mostrarLimpiezaRio(
    rioSegundoTurno,
    "rioNocheValores",
    "Rio",
    "bodyTablaNoche"
  );

  mostrarDisparosInternos(
    disparosInternosPrimeroTurno,
    "disparosInternosDiaValores",
    "Disparos Internos",
    "bodyTablaDia"
  );
  mostrarDisparosInternos(
    disparosInternosSegundoTurno,
    "disparosInternosNocheValores",
    "Disparos Internos",
    "bodyTablaNoche"
  );

  mostrarDisparosExternos(
    disparosExternosPrimeroTurno,
    "disparosExternosDiaValores",
    "Disparos Externos",
    "bodyTablaDia"
  );
  mostrarDisparosExternos(
    disparosExternosSegundoTurno,
    "disparosExternosNocheValores",
    "Disparos Externos",
    "bodyTablaNoche"
  );

  mostrarCompuertas(
    compuertasPrimerTurno,
    "compuertasDiaValores",
    "Compuertas",
    "bodyTablaDia"
  );
  mostrarCompuertas(
    compuertasSegundoTurno,
    "compuertasNocheValores",
    "Compuertas",
    "bodyTablaNoche"
  );

  mostrarAzud(azudPrimerTurno, "azudDiaValores", "Azud", "bodyTablaDia");
  mostrarAzud(azudSegundoTurno, "azudNocheValores", "Azud", "bodyTablaNoche");

  mostrarObservaciones(
    observacionesPrimerTurno,
    "observacionesDiaValores",
    "Observaciones",
    "bodyTablaDia"
  );
  mostrarObservaciones(
    observacionesSegundoTurno,
    "observacionesNocheValores",
    "Observaciones",
    "bodyTablaNoche"
  );

  if (inicioPrimerTurno.Error != "Sin datos para la busqueda") {
    document.getElementById("datosMostrados").style.display = "block";

    document.getElementById("numBitaMostarTurno").innerHTML =
      inicioPrimerTurno.numBitacora;
    document.getElementById("finTurnoMostarTurno").innerHTML =
      inicioPrimerTurno.fechaFinTurno;
    document.getElementById("iniTurnoMostarTurno").innerHTML =
      inicioPrimerTurno.fechaIniTurno;
    document.getElementById("nombresMostarTurno").innerHTML =
      inicioPrimerTurno.nombres;
    document.getElementById("alabesU1MostrarTurno").innerHTML =
      inicioPrimerTurno.alabesU1;
    document.getElementById("alabesU2MostrarTurno").innerHTML =
      inicioPrimerTurno.alabesU2;
    document.getElementById("potenciaMostrarTurno").innerHTML =
      inicioPrimerTurno.potencia;
    document.getElementById("reactivosMostrarTurno").innerHTML =
      inicioPrimerTurno.reactivos;
    document.getElementById("climaMostrarTurno").innerHTML =
      inicioPrimerTurno.Clima;
    document.getElementById("C1C4MostrarTurno").innerHTML =
      inicioPrimerTurno.compC1C4;
    document.getElementById("C5C6MostrarTurno").innerHTML =
      inicioPrimerTurno.compC5C6;
    document.getElementById("C7C8MostrarTurno").innerHTML =
      inicioPrimerTurno.compC7C9;
    document.getElementById("C10MostrarTurno").innerHTML =
      inicioPrimerTurno.compC10;
    document.getElementById("azudMostrarTurno").innerHTML =
      inicioPrimerTurno.Azud;
    document.getElementById("rebosaderoMostrarTurno").innerHTML =
      inicioPrimerTurno.Rebosadero;
    document.getElementById("filtroU1MostrarTurno").innerHTML =
      inicioPrimerTurno.filtroU1;
    document.getElementById("filtroU2MostrarTurno").innerHTML =
      inicioPrimerTurno.filtroU2;
    document.getElementById("observacionMostrarTurno").innerHTML =
      inicioPrimerTurno.Observaciones;

    if (finPrimerTurno.nombres === ".") {
      document.getElementById("finPrimerTurno").style.display = "none";
    } else {
      document.getElementById("finPrimerTurno").style.display = "block";
    }
    document.getElementById("nombres1MostarTurno").innerHTML =
      finPrimerTurno.nombres;
    document.getElementById("alabes1U1MostrarTurno").innerHTML =
      finPrimerTurno.alabesU1;
    document.getElementById("alabes1U2MostrarTurno").innerHTML =
      finPrimerTurno.alabesU2;
    document.getElementById("potencia1MostrarTurno").innerHTML =
      finPrimerTurno.potencia;
    document.getElementById("reactivos1MostrarTurno").innerHTML =
      finPrimerTurno.reactivos;
    document.getElementById("clima1MostrarTurno").innerHTML =
      finPrimerTurno.Clima;
    document.getElementById("C1C41MostrarTurno").innerHTML =
      finPrimerTurno.compC1C4;
    document.getElementById("C5C61MostrarTurno").innerHTML =
      finPrimerTurno.compC5C6;
    document.getElementById("C7C81MostrarTurno").innerHTML =
      finPrimerTurno.compC7C9;
    document.getElementById("C101MostrarTurno").innerHTML =
      finPrimerTurno.compC10;
    document.getElementById("azud1MostrarTurno").innerHTML =
      finPrimerTurno.Azud;
    document.getElementById("rebosadero1MostrarTurno").innerHTML =
      finPrimerTurno.Rebosadero;
    document.getElementById("filtro1U1MostrarTurno").innerHTML =
      finPrimerTurno.filtroU1;
    document.getElementById("filtro1U2MostrarTurno").innerHTML =
      finPrimerTurno.filtroU2;
    document.getElementById("observacion1MostrarTurno").innerHTML =
      finPrimerTurno.Observaciones;

    if (inicioSegundoTurno.nombres === ".") {
      document.getElementById("inicioSegundoTurno").style.display = "none";
    } else {
      document.getElementById("inicioSegundoTurno").style.display = "block";
    }

    document.getElementById("nombres2MostarTurno").innerHTML =
      inicioSegundoTurno.nombres;
    document.getElementById("alabes2U1MostrarTurno").innerHTML =
      inicioSegundoTurno.alabesU1;
    document.getElementById("alabes2U2MostrarTurno").innerHTML =
      inicioSegundoTurno.alabesU2;
    document.getElementById("potencia2MostrarTurno").innerHTML =
      inicioSegundoTurno.potencia;
    document.getElementById("reactivos2MostrarTurno").innerHTML =
      inicioSegundoTurno.reactivos;
    document.getElementById("clima2MostrarTurno").innerHTML =
      inicioSegundoTurno.Clima;
    document.getElementById("C1C42MostrarTurno").innerHTML =
      inicioSegundoTurno.compC1C4;
    document.getElementById("C5C62MostrarTurno").innerHTML =
      inicioSegundoTurno.compC5C6;
    document.getElementById("C7C82MostrarTurno").innerHTML =
      inicioSegundoTurno.compC7C9;
    document.getElementById("C102MostrarTurno").innerHTML =
      inicioSegundoTurno.compC10;
    document.getElementById("azud2MostrarTurno").innerHTML =
      inicioSegundoTurno.Azud;
    document.getElementById("rebosadero2MostrarTurno").innerHTML =
      inicioSegundoTurno.Rebosadero;
    document.getElementById("filtro2U1MostrarTurno").innerHTML =
      inicioSegundoTurno.filtroU1;
    document.getElementById("filtro2U2MostrarTurno").innerHTML =
      inicioSegundoTurno.filtroU2;
    document.getElementById("observacion2MostrarTurno").innerHTML =
      inicioSegundoTurno.Observaciones;

    if (finSegundoTurno.nombres === ".") {
      document.getElementById("finSegundoTurno").style.display = "none";
    } else {
      document.getElementById("finSegundoTurno").style.display = "block";
    }

    document.getElementById("nombres3MostarTurno").innerHTML =
      finSegundoTurno.nombres;
    document.getElementById("alabes3U1MostrarTurno").innerHTML =
      finSegundoTurno.alabesU1;
    document.getElementById("alabes3U2MostrarTurno").innerHTML =
      finSegundoTurno.alabesU2;
    document.getElementById("potencia3MostrarTurno").innerHTML =
      finSegundoTurno.potencia;
    document.getElementById("reactivos3MostrarTurno").innerHTML =
      finSegundoTurno.reactivos;
    document.getElementById("clima3MostrarTurno").innerHTML = "";
    document.getElementById("C1C43MostrarTurno").innerHTML =
      finSegundoTurno.compC1C4;
    document.getElementById("C5C63MostrarTurno").innerHTML =
      finSegundoTurno.compC5C6;
    document.getElementById("C7C83MostrarTurno").innerHTML =
      finSegundoTurno.compC7C9;
    document.getElementById("C103MostrarTurno").innerHTML =
      finSegundoTurno.compC10;
    document.getElementById("azud3MostrarTurno").innerHTML =
      finSegundoTurno.Azud;
    document.getElementById("rebosadero3MostrarTurno").innerHTML =
      finSegundoTurno.Rebosadero;
    document.getElementById("filtro3U1MostrarTurno").innerHTML =
      finSegundoTurno.filtroU1;
    document.getElementById("filtro3U2MostrarTurno").innerHTML =
      finSegundoTurno.filtroU2;
    document.getElementById("observacion3MostrarTurno").innerHTML =
      finSegundoTurno.Observaciones;
  } else {
    document.getElementById("datosMostrados").style.display = "none";
  }
};

// Mostrar Datos Alarmas

const mostrarDatosAlarmas = (obj, id, titulo, tablaId) => {
  let v1 = `<li style='text-align:left;'>`;
  let v2 = `</li>`;
  let text = "";
  let alarma = document.getElementById(id);
  let textoAux = "";
  /*
    if(Object.keys(obj).length){
        alarma.style.display = "block"; 
    }
    else
    {
        alarma.style.display = "none"; 
    }*/

  Object.keys(obj).forEach((key) => {
    if (obj[key].observaciones != "vacio") {
      textoAux = `, Observaciones: ${obj[key].observaciones}`;
    }

    text += `${v1}Hora: ${obj[key].horaAlarma}, Alarma: ${obj[key].tipoAlarma} ${textoAux} ${v2}`;
    textoAux = "";
  });

  if (Object.keys(obj).length) {
    document.getElementById(tablaId).innerHTML += `
        <td><h4>${titulo}</h4><ul>${text}</ul></td>
        `;
  }

  //alarma.innerHTML     = `<table><tr><td><h4>${titulo}</h4><ul>${text}</ul></td></tr></table>`;
};

// Mostrar Datos Flushing

const mostrarDatosFlushing = (obj, id, titulo, tablaId) => {
  let v1 = `<li style='text-align:left;'>`;
  let v2 = `</li>`;
  let text = "";
  let text1 = "";
  let flushing = document.getElementById(id);
  /*
    if(Object.keys(obj).length){
        flushing.style.display = "block"; 
    }
    else
    {
        flushing.style.display = "none"; 
    }
    */
  if (tablaId === "bodyTablaNoche") {
    Object.keys(obj).forEach((key) => {
      if (
        obj[key].horaFlushing >= "18:00" &&
        obj[key].horaFlushing <= "23:59"
      ) {
        text += `${v1}Noche: ${obj[key].horaFlushing}, Unidades: ${obj[key].unidadesFlushing}, Agua: ${obj[key].tipoAgua}${v2}`;
      } else {
        text1 += `${v1}Madrugada: ${obj[key].horaFlushing}, Unidades: ${obj[key].unidadesFlushing}, Agua: ${obj[key].tipoAgua}${v2}`;
      }
    });

    text += text1;
  } else if (tablaId === "bodyTablaDia") {
    Object.keys(obj).forEach((key) => {
      //text += `${v1}Hora mañana: ${obj[key].horaFlushing}, Unidades: ${obj[key].unidadesFlushing}, Agua: ${obj[key].tipoAgua}${v2}`;
      if (
        obj[key].horaFlushing >= "06:00" &&
        obj[key].horaFlushing <= "11:59"
      ) {
        text += `${v1}Mañana: ${obj[key].horaFlushing}, Unidades: ${obj[key].unidadesFlushing}, Agua: ${obj[key].tipoAgua}${v2}`;
      } else {
        text += `${v1}Tarde: ${obj[key].horaFlushing}, Unidades: ${obj[key].unidadesFlushing}, Agua: ${obj[key].tipoAgua}${v2}`;
      }
    });
  }

  // flushing.innerHTML     = `<table><tr><td><h4>${titulo}</h4><ul>${text}</ul></td></tr></table>`;

  if (Object.keys(obj).length) {
    document.getElementById(tablaId).innerHTML += `
        <td><h4>${titulo}</h4><ul>${text}</ul></td>
        `;
  }
};

// Mostrar Limpieza Rejillas

const mostrarLimpiezaRejillas = (obj, id, titulo, tablaId) => {
  let v1 = `<li style='text-align:left;'>`;
  let v2 = `</li>`;
  let text = "";
  let flushing = document.getElementById(id);
  /*
    if(Object.keys(obj).length){
        flushing.style.display = "block"; 
    }
    else
    {
        flushing.style.display = "none"; 
    }*/

  Object.keys(obj).forEach((key) => {
    text += `${v1}Hora: ${obj[key].horaLimpiezaRejillas}, Opcion: ${obj[key].opcionRejillas}, ${v2}`;
  });
  if (Object.keys(obj).length) {
    document.getElementById(tablaId).innerHTML += `
        <td><h4>${titulo}</h4><ul>${text}</ul></td>
        `;
  }
  //flushing.innerHTML     = `<table><tr><td><h4>${titulo}</h4><ul>${text}</ul></td></tr></table>`;
};

// Mostrar Limpieza Tanques

const mostrarLimpiezaTanques = (obj, id, titulo, tablaId) => {
  let v1 = `<li style='text-align:left;'>`;
  let v2 = `</li>`;
  let text = "";
  let flushing = document.getElementById(id);
  /*
    if(Object.keys(obj).length){
        flushing.style.display = "block"; 
    }
    else
    {
        flushing.style.display = "none"; 
    }*/

  Object.keys(obj).forEach((key) => {
    text += `${v1}Hora: ${obj[key].horaLimpiezaTanques}, Opcion: ${obj[key].opcionTanque}, ${v2}`;
  });

  if (Object.keys(obj).length) {
    document.getElementById(tablaId).innerHTML += `
        <td colspan='5'><h4>${titulo}</h4><ul>${text}</ul></td>
        `;
  }

  //flushing.innerHTML     = `<table><tr><td><h4>${titulo}</h4><ul>${text}</ul></td></tr></table>`;
};

// Mostrar Limpieza Río

const mostrarLimpiezaRio = (obj, id, titulo, tablaId) => {
  let v1 = `<li style='text-align:left;'>`;
  let v2 = `</li>`;
  let text = "";
  let flushing = document.getElementById(id);
  /*
    if(Object.keys(obj).length){
        flushing.style.display = "block"; 
    }
    else
    {
        flushing.style.display = "none"; 
    }*/

  Object.keys(obj).forEach((key) => {
    text += `${v1}Hora: ${obj[key].horaCondicionesRio}, Opcion: ${obj[key].opcionRio}, ${v2}`;
  });

  if (Object.keys(obj).length) {
    document.getElementById(tablaId).innerHTML += `
        <td colspan='5'><h4>${titulo}</h4><ul>${text}</ul></td>
        `;
  }

  //flushing.innerHTML     = `<table><tr><td><h4>${titulo}</h4><ul>${text}</ul></td></tr></table>`;
};

// Mostrar Azud

const mostrarAzud = (obj, id, titulo, tablaId) => {
  let v1 = `<li style='text-align:left;'>`;
  let v2 = `</li>`;
  let text = "";
  let azud = document.getElementById(id);
  /*
    if(Object.keys(obj).length){
        azud.style.display = "block"; 
    }
    else
    {
        azud.style.display = "none"; 
    }*/

  Object.keys(obj).forEach((key) => {
    text += `${v1}Hora: ${obj[key].horaAzud}, Azud: ${obj[key].azudValor} cm, Rebosadero: ${obj[key].rebosaderoValor} cm ${v2}`;
  });

  if (Object.keys(obj).length) {
    document.getElementById(tablaId).innerHTML += `
        <td colspan='5'><h4>${titulo}</h4><ul>${text}</ul></td>
        `;
  }
  //azud.innerHTML     = `<table><tr><td><h4>${titulo}</h4><ul>${text}</ul></td></tr></table>`;
};

// Mostrar Observaciones

const mostrarObservaciones = (obj, id, titulo, tablaId) => {
  let v1 = `<li style='text-align:left;'>`;
  let v2 = `</li>`;
  let text = "";
  let observaciones = document.getElementById(id);
  /*
    if(Object.keys(obj).length){
        observaciones.style.display = "block"; 
    }
    else
    {
        observaciones.style.display = "none"; 
    }*/

  Object.keys(obj).forEach((key) => {
    text += `${v1}Hora: ${obj[key].horaObservaciones}, Observaciones: ${obj[key].observacionesCentral} ${v2}`;
  });

  if (Object.keys(obj).length) {
    document.getElementById(tablaId).innerHTML += `
        <td colspan='5'><h4>${titulo}</h4><ul>${text}</ul></td>
        `;
  }

  //observaciones.innerHTML     = `<table><tr><td><h4>${titulo}</h4><ul>${text}</ul></td></tr></table>`;
};

// Mostrar Compuertas

const mostrarCompuertas = (obj, id, titulo, tablaId) => {
  let v1 = `<li style='text-align:left;'>`;
  let v2 = `</li>`;
  let text = "";
  let observaciones = document.getElementById(id);
  /*
    if(Object.keys(obj).length){
        observaciones.style.display = "block"; 
    }
    else
    {
        observaciones.style.display = "none"; 
    }*/

  Object.keys(obj).forEach((key) => {
    text += `${v1}Hora: ${obj[key].horaCompuertas}, Comp 1-4 = ${obj[key].compuertaC1C4} cm, Comp 5-6 = ${obj[key].compuertaC5C6} cm, Comp 7-9 = ${obj[key].compuertaC7C8C9} cm, Comp 10 = ${obj[key].compuertaC10} cm${v2}`;
  });

  if (Object.keys(obj).length) {
    document.getElementById(tablaId).innerHTML += `
        <td><h4>${titulo}</h4><ul>${text}</ul></td>
        `;
  }

  //observaciones.innerHTML     = `<table><tr><td><h4>${titulo}</h4><ul>${text}</ul></td></tr></table>`;
};

// Mostrar Disparos internos

const mostrarDisparosInternos = (obj, id, titulo, tablaId) => {
  let v1 = `<li style='text-align:left;'>`;
  let v2 = `</li>`;
  let text = "";
  let textoAux = "";
  let disparoInternos = document.getElementById(id);
  /*
    if(Object.keys(obj).length){
        disparoInternos.style.display = "block"; 
    }
    else
    {
        disparoInternos.style.display = "none"; 
    }*/

  Object.keys(obj).forEach((key) => {
    if (obj[key].opcionDisparosInternosPalmira === "Otros") {
      textoAux = `, Observaciones: ${obj[key].observaciones}`;
    }

    text += `${v1}Hora: ${obj[key].horaDisparosInternos}, Opcion = ${obj[key].opcionDisparosInternosPalmira}${textoAux} ${v2}`;
    textoAux = "";
  });

  if (Object.keys(obj).length) {
    document.getElementById(tablaId).innerHTML += `
        <td><h4>${titulo}</h4><ul>${text}</ul></td>
        `;
  }
  //disparoInternos.innerHTML     = `<table><tr><td><h4>${titulo}</h4><ul>${text}</ul></td></tr></table>`;
};

// Mostrar Disparos externos

const mostrarDisparosExternos = (obj, id, titulo, tablaId) => {
  let v1 = `<li style='text-align:left;'>`;
  let v2 = `</li>`;
  let text = "";
  let textoAux = "";

  let disparoInternos = document.getElementById(id);

  Object.keys(obj).forEach((key) => {
    if (obj[key].opcionDisparosExternosPalmira === "Otros") {
      textoAux = `, Observaciones: ${obj[key].observaciones}`;
    }

    text += `${v1}Hora: ${obj[key].horaDisparosExternos}, Opcion = ${obj[key].opcionDisparosExternosPalmira}${textoAux} ${v2}`;
    textoAux = "";
  });

  if (Object.keys(obj).length) {
    document.getElementById(tablaId).innerHTML += `
        <td><h4>${titulo}</h4><ul>${text}</ul></td>
        `;
  }
};
