async function openMenu(evt, showName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(showName).style.display = "block";
  evt.currentTarget.className += " active";

  if (showName != "Datos") {
    document.getElementById("datosMostrados").style.display = "none";
    document.getElementById("fechaBuscarTurno").value = "";
    document.getElementById("ErrorData").innerHTML = "";
  }

  if (
    showName === "Principal" ||
    showName === "Editar" ||
    showName === "Datos"
  ) {
    document.getElementById("myRadio").checked = false;
    document.getElementById("fechaInicioTurno").value = "";
    document.getElementById("fechaFinTurno").value = "";
    document.getElementById("HoraInicioTurno").value = "";
    document.getElementById("HoraFinTurno").value = "";
    document.getElementById("horaIngresoPersonal").value = "";
    document.getElementById("numBitacora").value = "";
    document.getElementById("horaDatosCompuertas").value = "";

    borrarValores();
    borrarClaseError();
    document.getElementById("botonesAction").style.display = "none";
  } else {
    document.getElementById("botonesAction").style.display = "";
  }
}

window.onload = function () {
  document.getElementById("botonesAction").style.display = "none"; // ocultar botones al inicio del programa
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();

  // verificar si aparece el turno creado o no
};

// Colocar las fechas horas de manera automática

const handleChange = (src) => {
  let fecha = new Date();
  let fechaFin = new Date();
  fechaFin.setDate(fechaFin.getDate() + 1);
  dia = fecha.getDate();
  mes = fecha.getMonth() + 1;
  anio = fecha.getFullYear();
  dia1 = fechaFin.getDate();
  mes1 = fechaFin.getMonth() + 1;
  anio1 = fechaFin.getFullYear();
  let fecha1 = convertirFecha(dia, mes, anio);
  let fecha2 = convertirFecha(dia1, mes1, anio1);
  let iniFecha = `${fecha1.dia}-${fecha1.mes}-${fecha1.anio}`;
  let finFecha = `${fecha2.dia}-${fecha2.mes}-${fecha2.anio}`;
  document.getElementById("fechaInicioTurno").value = iniFecha;
  document.getElementById("fechaFinTurno").value = finFecha;
  document.getElementById("HoraInicioTurno").value = "06:00";
  document.getElementById("HoraFinTurno").value = "06:00";
  document.getElementById("numBitacora").value = numeroBitacora();
  let condicion1 = document.getElementById("horarioDeIngreso").value;
  let condicion2 = document.getElementById("entregaRecibeTurnos").value;

  if (
    (condicion1 === "Primer Turno" && condicion2 === "Recibe") ||
    (condicion1 === "Segundo Turno" && condicion2 === "Entrega")
  ) {
    document.getElementById("horaIngresoPersonal").value = "06:00";
    document.getElementById("horaDatosCompuertas").value = "06:00";
    document.getElementById("horaAzud").value = "06:00";
  } else if (
    (condicion1 === "Primer Turno" && condicion2 === "Entrega") ||
    (condicion1 === "Segundo Turno" && condicion2 === "Recibe")
  ) {
    document.getElementById("horaIngresoPersonal").value = "18:00";
    document.getElementById("horaDatosCompuertas").value = "18:00";
    document.getElementById("horaAzud").value = "18:00";
  }
};

// Funcion para convertir la fecha a formato de entra en el input

const convertirFecha = (_dia, _mes, _anio) => {
  let dia = "";
  let mes = "";
  let anio = "";

  if (_dia <= 9) {
    dia = `0${_dia}`;
  } else {
    dia = `${_dia}`;
  }

  if (_mes <= 9) {
    mes = `0${_mes}`;
  } else {
    mes = `${_mes}`;
  }

  anio = `${_anio}`;

  obj = {
    anio,
    dia,
    mes,
  };

  return obj;
};

// Arrow function para obtener el numero de bitacora de acuerdo a la fecha

const numeroBitacora = () => {
  let fechaInicial = new Date();
  let fechaFinal = new Date();
  fechaInicial.setMonth(0, 0);
  return Math.round((fechaFinal - fechaInicial) / 8.64e7);
};

// Borrar todos los valores

const borrarValores = () => {
  let inputs = document.getElementById("myForm");
  for (let i = 0; i < inputs.length; i++) {
    //inputs[i].value = "";
    if (!(inputs.elements[i].type == "select-one"))
      inputs.elements[i].value = "";

    if (inputs[i].type === "radio") {
      inputs.elements[i].checked = "";
    }
  }
};

// Crear turno

const CrearTurno = () => {
  validarClima("dia");
  validarCrearTurno();

  const obj = {
    fechaInicioTurno: document.getElementById("fechaInicioTurno").value,
    horaInicioTurno: document.getElementById("HoraInicioTurno").value,
    fechaFinTurno: document.getElementById("fechaFinTurno").value,
    horaFinTurno: document.getElementById("HoraFinTurno").value,
    numBitacora: document.getElementById("numBitacora").value,
    clima: validarClima("dia"),
    compuertas: leerCompuertas(),
    filtroU1: document.getElementById("filtrosCentralU1").value,
    filtroU2: document.getElementById("filtrosCentralU2").value,
    azud: document.getElementById("azudValor").value,
    rebosadero: document.getElementById("rebosaderoValor").value,
  };

  let horaTurno = document.getElementById("horaIngresoPersonal").value;
  let tipoTurno = document.getElementById("horarioDeIngreso").value;
  let recibeEntrega = document.getElementById("entregaRecibeTurnos").value;

  if (
    horaTurno === "06:00" &&
    tipoTurno === "Primer Turno" &&
    recibeEntrega === "Recibe"
  ) {
    obj.recibePrimerTurno = turno();
  } else if (
    horaTurno === "18:00" &&
    tipoTurno === "Primer Turno" &&
    recibeEntrega === "Entrega"
  ) {
    obj.entregaPrimerTurno = turno();
  } else if (
    horaTurno === "18:00" &&
    tipoTurno === "Segundo Turno" &&
    recibeEntrega === "Recibe"
  ) {
    obj.recibeSegundoTurno = turno();
  } else if (
    horaTurno === "06:00" &&
    tipoTurno === "Segundo Turno" &&
    recibeEntrega === "Entrega"
  ) {
    obj.entregaSegundoTurno = turno();
  } else {
    document.getElementById("horaIngresoPersonal").classList.add("error");
    // return "Objeto recibe turno no creado";
  }

  // Validar la Creacion del turno
  let var1 = document.getElementById("climaTabla").classList;
  let entradas = document.getElementById("myForm");

  for (let i = 0; i < entradas.length; i++) {
    if (entradas[i].classList.contains("error") || var1.contains("error")) {
      return confirm("Error al crear el turno, Complete los campos resaltados");
    }
  }

  // LLamar funcion que envia datos al backend
  enviarDatosCrearTurno(obj);
};

// Funcion para leer los datos de las compuertas

const leerCompuertas = () => {
  return {
    hora: document.getElementById("horaDatosCompuertas").value,
    CompuertaC1C4: document.getElementById("c1c4DatosCompuertas").value,
    CompuertaC5C6: document.getElementById("c5c6DatosCompuertas").value,
    CompuertaC7C8C9: document.getElementById("c7c8DatosCompuertas").value,
    CompuertaC10: document.getElementById("c10c11DatosCompuertas").value,
  };
};

// funcion retorna los valores del turno

const turno = () => {
  let cadenaInicial = document.getElementById("nombresPersonal").value;
  let cadena1 = cadenaInicial.replace(/;|:|,/gi, "*");
  let cadena2 = cadena1.replaceAll(".", "*");
  let cadena = cadena2.split("*");

  let aux = new Array();
  cadena.forEach((element) => {
    if (element.trim() != "") aux.push(element.trim());
  });

  return {
    hora: document.getElementById("horaIngresoPersonal").value,
    turno: document.getElementById("horarioDeIngreso").value,
    accion: document.getElementById("entregaRecibeTurnos").value,
    nombres: aux,
    potencia: document.getElementById("potenciaCentral").value,
    reactivos: document.getElementById("reactivosCentral").value,
    alabesU1: document.getElementById("alabesCentralU1").value,
    alabesU2: document.getElementById("alabesCentralU2").value,
  };
};

// Validación de turno

const validarCrearTurno = () => {
  let turno = document.getElementById("horarioDeIngreso");

  if (!(turno.value === "Primer Turno")) {
    turno.classList.add("error");
  } else {
    turno.classList.remove("error");
  }

  // Validación de recepcion entrega
  let recibe = document.getElementById("entregaRecibeTurnos");

  if (!(recibe.value === "Recibe")) {
    recibe.classList.add("error");
  } else {
    recibe.classList.remove("error");
  }

  horaEntrega("06:00");
  validarCompuertasC1C4();
  validarCompuertasC5C6();
  validarCompuertasC7C8();
  validarCompuertasC10();
  validarObservaciones();
  ValidaciónFechas();
  validarPotencia();
  validarReactivos();
  validarAlabesU1();
  validarAlabesU2();
  validarNumeroBitacora();
  validarFiltrosU1();
  validarFiltrosU2();
  validarNombre();
  validarAzud();
  validarRebosadero();
};

//******** Funciones utilizadas para Validación en tiempo real y cuando se crea el turno doble uso ***************//

// Validar número de bitácora

const validarNumeroBitacora = () => {
  let bitacora = document.getElementById("numBitacora");
  if (
    bitacora.value === "" ||
    !(bitacora.value >= 0 && bitacora.value <= 366)
  ) {
    bitacora.classList.add("error");
  } else {
    bitacora.classList.remove("error");
  }

  let valor = numeroBitacora();

  let diaValor = document.getElementById("numBitacora");
  if (diaValor.value === "" || diaValor.value != valor) {
    diaValor.classList.add("error");
  } else {
    diaValor.classList.remove("error");
  }
};

// Funcion Validación Potencia

const validarPotencia = () => {
  let potenciaVal = document.getElementById("potenciaCentral");
  if (
    potenciaVal.value === "" ||
    !(potenciaVal.value >= 0 && potenciaVal.value <= 10.5)
  ) {
    potenciaVal.classList.add("error");
  } else {
    potenciaVal.classList.remove("error");
  }
};

// Funcion Validación Reactivos

const validarReactivos = () => {
  // Validación Potencia reactiva

  let reactivosVal = document.getElementById("reactivosCentral");
  if (
    reactivosVal.value === "" ||
    !(reactivosVal.value >= -5 && reactivosVal.value <= 5)
  ) {
    reactivosVal.classList.add("error");
  } else {
    reactivosVal.classList.remove("error");
  }
};

// Validación Alabes U1 porcentaje

const validarAlabesU1 = () => {
  let alabesVal = document.getElementById("alabesCentralU1");
  if (
    alabesVal.value === "" ||
    !(alabesVal.value >= 0 && alabesVal.value <= 100)
  ) {
    alabesVal.classList.add("error");
  } else {
    alabesVal.classList.remove("error");
  }
};

// Validación Alabes U2 porcentaje

const validarAlabesU2 = () => {
  let alabesVal = document.getElementById("alabesCentralU2");
  if (
    alabesVal.value === "" ||
    !(alabesVal.value >= 0 && alabesVal.value <= 100)
  ) {
    alabesVal.classList.add("error");
  } else {
    alabesVal.classList.remove("error");
  }
};

// Validación filtros U1

const validarFiltrosU1 = () => {
  // Validación Filtros U1

  let filtrosValU1 = document.getElementById("filtrosCentralU1");
  if (
    filtrosValU1.value === "" ||
    !(filtrosValU1.value >= 0 && filtrosValU1.value <= 500)
  ) {
    filtrosValU1.classList.add("error");
  } else {
    filtrosValU1.classList.remove("error");
  }
};

// Validación filtros U2

const validarFiltrosU2 = () => {
  // Validación Filtros U2

  let filtrosValU2 = document.getElementById("filtrosCentralU2");
  if (
    filtrosValU2.value === "" ||
    !(filtrosValU2.value >= 0 && filtrosValU2.value <= 500)
  ) {
    filtrosValU2.classList.add("error");
  } else {
    filtrosValU2.classList.remove("error");
  }
};

// Validación nombres

const validarNombre = () => {
  // Validación de nombres

  let nombres = document.getElementById("nombresPersonal").value;
  let regExpre = /[^(A-Za-z.,;:)-\s_áéíóúÁÉÍÓÚñÑ]/g;
  let Result = regExpre.test(nombres);
  let variable = document.getElementById("nombresPersonal");
  // variable.trim();

  if (Result || nombres === "" || nombres.trim() === "") {
    //variable.classList.add("error");
    variable.classList.add("error");
    variable.classList.add("border-danger");
    variable.classList.add("bg-warning");
  } else {
    variable.classList.remove("error");
    variable.classList.remove("border-danger");
    variable.classList.remove("bg-warning");
    //variable.classList.remove("error");
  }
};

// Validación observaciones alarmas

const validarObservaciones = () => {
  let observacionesValor = document.getElementById(
    "observacionesCentral"
  ).value;
  let expresionRegular = /[^(A-Za-z.,;:)-\s_=áéíóúÁÉÍÓÚñÑ0-9]/g;
  let resultado1 = expresionRegular.test(observacionesValor);
  let observacionEval = document.getElementById("observacionesCentral");

  let horaObservar = document.getElementById("horaObservaciones").value;
  let horaAlarm = document.getElementById("horaAlarmas").value;
  let opcAlarm = document.getElementById("opcionAlarmasPalmira").value;

  if (
    resultado1 ||
    observacionesValor === "" ||
    observacionesValor.trim() === ""
  ) {
    if (observacionesValor.trim() === "") {
      observacionEval.classList.add("error");
      observacionEval.classList.add("border-danger");
      observacionEval.classList.add("bg-warning");
      return;
    }

    if (!horaObservar || (!horaAlarm && opcAlarm != "Otros")) return;
    observacionEval.classList.add("error");
    observacionEval.classList.add("border-danger");
    observacionEval.classList.add("bg-warning");
  } else {
    observacionEval.classList.remove("error");
    observacionEval.classList.remove("border-danger");
    observacionEval.classList.remove("bg-warning");
  }
};

// Validación observaciones turno

const validarObservacionesTurno = (count) => {
  let observacionesValor = document.getElementById(
    "observacionesCentral"
  ).value;
  let expresionRegular = /[^(A-Za-z.,;:)-\s_áéíóúÁÉÍÓÚñÑ0-9]/g;
  //let resultado1 = expresionRegular.test(observacionesValor);
  let observacionEval = document.getElementById("observacionesCentral");

  if (count > 1) {
    //observacionEval.classList.add("error");
    observacionEval.classList.add("error");
    observacionEval.classList.add("border-danger");
    observacionEval.classList.add("bg-warning");
  }
};

// Funcion Validar clima

const validarClima = (clima) => {
  let inputs = document.getElementById("myForm");
  let error = "";

  //let clima = "noche";
  let climaMostrar = "";
  let variable = "diaValor";
  let out = "";

  switch (clima) {
    case "dia":
      variable = `${variable}1`;
      climaMostrar = "dia";
      break;
    case "tarde":
      variable = `${variable}2`;
      climaMostrar = "tarde";
      break;
    case "noche":
      variable = `${variable}3`;
      climaMostrar = "noche";
      break;
  }

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].name === variable) {
      if (inputs[i].checked) {
        switch (i) {
          case 8:
            out = "Bueno";
            break;
          case 11:
            out = "Nublado";
            break;
          case 14:
            out = "Lluvioso";
            break;
          case 17:
            out = "Crecida";
            break;
        }
      }
    }

    if (inputs[i].name === variable) {
      if (inputs[i].checked) {
        switch (i) {
          case 9:
            out = "Bueno";
            break;
          case 12:
            out = "Nublado";
            break;
          case 15:
            out = "Lluvioso";
            break;
          case 18:
            out = "Crecida";
            break;
        }
      }
    }

    if (inputs[i].name === variable) {
      // console.log("noche", i, inputs[i].name, inputs[i].checked);

      if (inputs[i].checked) {
        switch (i) {
          case 10:
            out = "Bueno";
            break;
          case 13:
            out = "Nublado";
            break;
          case 17:
            out = "Lluvioso";
            break;
          case 20:
            out = "Crecida";
            break;
        }
      }
    }
  }

  if (out === "") {
    document.getElementById("climaTabla").classList.add("error");
    error = `Clima ${climaMostrar} sin datos\n`;
  } else {
    document.getElementById("climaTabla").classList.remove("error");
  }

  obj = {
    out,
    error,
  };
  return obj;
};

// Funciones para validar compuertas

const validarCompuertasC1C4 = () => {
  let compuertas1 = document.getElementById("c1c4DatosCompuertas");
  if (
    compuertas1.value === "" ||
    !(compuertas1.value >= 0 && compuertas1.value <= 150)
  ) {
    compuertas1.classList.add("error");
  } else {
    compuertas1.classList.remove("error");
  }
};

// Validación compuertas 5 - 6

const validarCompuertasC5C6 = () => {
  let compuertas2 = document.getElementById("c5c6DatosCompuertas");
  if (
    compuertas2.value === "" ||
    !(compuertas2.value >= 0 && compuertas2.value <= 250)
  ) {
    compuertas2.classList.add("error");
  } else {
    compuertas2.classList.remove("error");
  }
};

// Validación compuertas 7 - 8

const validarCompuertasC7C8 = () => {
  let compuertas3 = document.getElementById("c7c8DatosCompuertas");
  if (
    compuertas3.value === "" ||
    !(compuertas3.value >= 0 && compuertas3.value <= 150)
  ) {
    compuertas3.classList.add("error");
  } else {
    compuertas3.classList.remove("error");
  }
};

// Validación compuertas 10

const validarCompuertasC10 = () => {
  let compuertas4 = document.getElementById("c10c11DatosCompuertas");
  if (
    compuertas4.value === "" ||
    !(compuertas4.value >= 0 && compuertas4.value <= 110)
  ) {
    compuertas4.classList.add("error");
  } else {
    compuertas4.classList.remove("error");
  }
};

// Validación Azud

const validarAzud = () => {
  let azud = document.getElementById("azudValor");
  if (azud.value === "" || !(azud.value >= -110 && azud.value <= 120)) {
    azud.classList.add("error");
  } else {
    azud.classList.remove("error");
  }
};

// Validación Rebosadero

const validarRebosadero = () => {
  let rebosadero = document.getElementById("rebosaderoValor");
  if (
    rebosadero.value === "" ||
    !(rebosadero.value >= -110 && rebosadero.value <= 30)
  ) {
    rebosadero.classList.add("error");
  } else {
    rebosadero.classList.remove("error");
  }
};

// Validación Número Bitácora

const ValidaciónNumBitacora = () => {
  let valor = numeroBitacora();

  let diaValor = document.getElementById("numBitacora");
  if (diaValor.value === "" || diaValor.value != valor) {
    diaValor.classList.add("error");
  } else {
    diaValor.classList.remove("error");
  }
};

// Validación Fechas

const ValidaciónFechas = () => {
  let hora1 = document.getElementById("horaIngresoPersonal");

  if (hora1.value === "") {
    hora1.classList.add("error");
  } else {
    hora1.classList.remove("error");
  }

  let hora2 = document.getElementById("HoraInicioTurno");
  if (hora2.value === "" || hora2.value != "06:00") {
    hora2.classList.add("error");
  } else {
    hora2.classList.remove("error");
  }

  let hora3 = document.getElementById("HoraFinTurno");
  if (hora3.value === "" || hora3.value != "06:00") {
    hora3.classList.add("error");
  } else {
    hora3.classList.remove("error");
  }

  let hora4 = document.getElementById("horaDatosCompuertas");
  if (hora4.value === "" || hora4.value != "06:00") {
    hora4.classList.add("error");
  } else {
    hora4.classList.remove("error");
  }

  let fecha1 = document.getElementById("fechaInicioTurno");
  if (fecha1.value === "") {
    fecha1.classList.add("error");
  } else {
    fecha1.classList.remove("error");
  }

  let fecha2 = document.getElementById("fechaFinTurno");
  if (fecha2.value === "") {
    fecha2.classList.add("error");
  } else {
    fecha2.classList.remove("error");
  }

  let validar = obtenerFecha(fecha1.value, fecha2.value);

  let fechaA = new Date(fecha1.value);
  let fechaB = new Date(fecha2.value);

  let resta = fechaB.getTime() - fechaA.getTime();
  let numeroDia = Math.round(resta / (1000 * 60 * 60 * 24));
  let fechaInicio = new Date();
  let val = fechaInicio.toLocaleDateString().split("/").reverse();

  if (validar.error != "Ok") {
    fecha2.classList.add("error");
    fecha1.classList.add("error");
  } else {
    fecha2.classList.remove("error");
    fecha1.classList.remove("error");
  }
};

// Borrar error de la clase

const borrarClaseError = () => {
  let inputs = document.getElementById("myForm");
  for (let i = 0; i < inputs.length; i++) {
    inputs.elements[i].classList.remove("error");
  }
  document.getElementById("climaTabla").classList.remove("error");

  let observacionesCentral = document.getElementById("observacionesCentral");
  let nombresPersonal = document.getElementById("nombresPersonal");

  observacionesCentral.classList.remove("error");
  observacionesCentral.classList.remove("border-danger");
  observacionesCentral.classList.remove("bg-warning");

  nombresPersonal.classList.remove("error");
  nombresPersonal.classList.remove("border-danger");
  nombresPersonal.classList.remove("bg-warning");
};

// Validación Obtener las fechas usada en validaciones

const obtenerFecha = (data, data1) => {
  let fecha = new Date();
  let fechaFin = new Date();
  fechaFin.setDate(fechaFin.getDate() + 1);

  dia = fecha.getDate();
  mes = fecha.getMonth() + 1;
  anio = fecha.getFullYear();

  dia1 = fechaFin.getDate();
  mes1 = fechaFin.getMonth() + 1;
  anio1 = fechaFin.getFullYear();

  let valores3 = data.split("-");

  let y = valores3[2];
  let m = valores3[1];
  let d = valores3[0];

  let valores = data.split("-");
  let valores1 = data1.split("-");

  let y1 = valores1[2];
  let m1 = valores1[1];
  let d1 = valores1[0];

  obj = {
    dia: valores[0],
    mes: valores[1],
    anio: valores[2],
    dia1: valores1[0],
    mes1: valores1[1],
    anio1: valores1[2],
  };

  let diaCon = dia === parseInt(d) && dia1 === parseInt(d1);
  let mesCon = mes === parseInt(m) && mes1 === parseInt(m1);
  let anioCon = anio === parseInt(y) && anio1 === parseInt(y1);

  let condicion = parseInt(obj.dia) + 1 === parseInt(obj.dia1);
  let condicion2 = y === obj.anio && m === obj.mes && d === obj.dia;

  //if( obj.mes=== obj.mes1 && obj.anio === obj.anio1 && condicion && condicion2)
  if (diaCon && mesCon && anioCon) {
    obj.error = "Ok";
  } else {
    obj.error = "Error fechas";
  }

  return obj;
};

// ******************************* INICIO COMUNICACION CON EL BACKEND ENVIA DATOS CREAR TURNO ******************** //

const enviarDatosCrearTurno = (objeto) => {
  // inicio acondicionamiento de algunas variables

  let observaciones = document.getElementById("observacionesCentral").value;
  let nombresPrimerTurno = objeto.recibePrimerTurno.nombres;

  //  Fin acondicionamiento de variables

  let dataTotal = new FormData(); // Crear el formato para enviar datos
  dataTotal.append("fechaInicioTurno", objeto.fechaInicioTurno); // Fecha inicio turno
  dataTotal.append("fechaFinTurno", objeto.fechaFinTurno); // Fecha fin turno
  dataTotal.append("horaInicioTurno", objeto.horaInicioTurno); // Hora inicio Turno
  dataTotal.append("horaFinTurno", objeto.horaFinTurno); // Hora fin turno
  dataTotal.append("numBitacora", objeto.numBitacora); // Número de bitácora
  dataTotal.append("climaDia", objeto.clima.out); // Objeto clima día
  dataTotal.append("horaCompuertas", objeto.compuertas.hora); // Hora guardar evento compuertas
  dataTotal.append("CompuertaC1C4", objeto.compuertas.CompuertaC1C4); // Compuertas 1 - 4
  dataTotal.append("CompuertaC5C6", objeto.compuertas.CompuertaC5C6); // Compuertas 5 - 6
  dataTotal.append("CompuertaC7C8C9", objeto.compuertas.CompuertaC7C8C9); // Compuertas 7 - 9
  dataTotal.append("CompuertaC10", objeto.compuertas.CompuertaC10); // Compuertas 10
  dataTotal.append("accion", objeto.recibePrimerTurno.accion); // Recibe turno
  dataTotal.append("alabesU1", objeto.recibePrimerTurno.alabesU1); // Apertura de alabes U1
  dataTotal.append("alabesU2", objeto.recibePrimerTurno.alabesU2); // Apertura de alabes U2
  dataTotal.append("horaRecibePrimerTurno", objeto.recibePrimerTurno.hora); // Hora reecibe primer turno
  dataTotal.append("potencia", objeto.recibePrimerTurno.potencia); // Potencia recibe primer turno
  dataTotal.append("reactivos", objeto.recibePrimerTurno.reactivos); // Reactivos recibe primer turno
  dataTotal.append("turno", objeto.recibePrimerTurno.turno); // Recibe turno
  dataTotal.append("nombresRecibeTurno", nombresPrimerTurno); // Nombres personal recibe turno
  dataTotal.append("Observaciones", observaciones); // Observaciones con las que recibe turno
  dataTotal.append("filtroU1", objeto.filtroU1);
  dataTotal.append("filtroU2", objeto.filtroU2);
  dataTotal.append("azud", objeto.azud);
  dataTotal.append("rebosadero", objeto.rebosadero);
  dataTotal.append("guardarTurno", "guardarTurno");

  //console.log(objeto);

  let xhr = new XMLHttpRequest(); // Crea objeto request
  xhr.open("POST", "backend.php", true); // Abre comunicacion con archivo backend
  xhr.onload = function () {
    // Funcion que recibe respuesta del servidor

    if (this.response === "ERROR AL CREAR TURNO") {
      alert("Este Turno Ya existe");
      return false;
    } else {
      location.reload(window);
    }
  };

  xhr.send(dataTotal); // Envía datos al servidor
  return false; // Finaliza la funcion retornando false
};

// ******************************* FIN COMUNICACION CON EL BACKEND ENVIA DATOS CREAR TURNO ********************** //

// ********************* INICIO COMUNICACION CON EL BACKEND ENVIA DATOS ENTREGA PRIMER TURNO ******************** //

const enviarDatosEntregaPrimerTurno = (objeto) => {
  let dataTotal = new FormData(); // Crear el formato para enviar datos
  dataTotal.append("numBitacora", objeto.numBitacora); // Número de bitácora
  dataTotal.append("CompuertaC1C4", objeto.c1c4DatosCompuertas); // Compuertas 1 - 4
  dataTotal.append("CompuertaC5C6", objeto.c5c6DatosCompuertas); // Compuertas 5 - 6
  dataTotal.append("CompuertaC7C8C9", objeto.c7c8DatosCompuertas); // Compuertas 7 - 9
  dataTotal.append("CompuertaC10", objeto.c10c11DatosCompuertas); // Compuertas 10
  dataTotal.append("accion", objeto.accionTurnos); // Recibe turno
  dataTotal.append("alabesU1", objeto.alabesUnidadU1); // Apertura de alabes U1
  dataTotal.append("alabesU2", objeto.alabesUnidadU2); // Apertura de alabes U2
  dataTotal.append("horaEntregaPrimerTurno", objeto.horaEntregaTurno); // Hora reecibe primer turno
  dataTotal.append("potencia", objeto.potenciaUnidades); // Potencia recibe primer turno
  dataTotal.append("reactivos", objeto.reactivosUnidades); // Reactivos recibe primer turno
  dataTotal.append("nombresRecibeTurno", objeto.nombresPersonal); // Nombres personal recibe turno
  dataTotal.append("Observaciones", objeto.observacionesCentral); // Observaciones con las que recibe turno
  dataTotal.append("filtroU1", objeto.filtroUnidadU1);
  dataTotal.append("filtroU2", objeto.filtroUnidadU2);
  dataTotal.append("azud", objeto.azud);
  dataTotal.append("rebosadero", objeto.rebosadero);
  dataTotal.append("clima", objeto.tarde);
  dataTotal.append("guardarTurno", "guardarTurno");

  let xhr = new XMLHttpRequest(); // Crea objeto request
  xhr.open("POST", "./GuardarEventos/entregaPrimerTurno.php", true); // Abre comunicacion con archivo backend
  xhr.onload = function () {
    // Funcion que recibe respuesta del servidor
    //document.getElementById("buttonCrearTurno").remove();
    location.reload(window);
  };

  xhr.send(dataTotal); // Envía datos al servidor
  return false; // Finaliza la funcion retornando false
};

const guardarEvento = () => {
  let hora = document.getElementById("buttonGuardar");
  let data = "";

  if (hora) {
    data = "dia";
  } else {
    data = "noche";
  }

  let count = validarIngresoOtros();
  let validarRecargarPag = 0;
  let objCompuertas = estadoCompuertas(data);
  let objFlushing = estadoFlushing(data);
  let objAlarmas = estadoAlarmas(count, data);
  let objRejillas = estadoLimpiezaRejillas(data);
  let objTanque = estadoLimpiezaTanques(data);
  let objRio = estadoCondicionesRio(data);
  let objDispExte = estadoDisparosExternos(count, data);
  let objDispInte = estadoDisparosInternos(count, data);
  let objObservaciones = validarObservacionesSola(count, data);
  let objAzudRebosadero = validarAzudRebosadero(data);

  let observacionesAlarmasPalmira = document.getElementById(
    "observacionesCentral"
  );

  if (
    !observacionesAlarmasPalmira.classList.contains("error") &&
    funcionCambia() != "error"
  ) {
    // Validación compuertas

    if (objCompuertas.error === "Ok") {
      validarRecargarPag++;
      enviarDatosCompuertas(objCompuertas);
    }

    // Validación flushing

    if (objFlushing.error === "Ok") {
      validarRecargarPag++;
      enviarFlushing(objFlushing);
    }

    // Validación Alarmas

    if (objAlarmas.error === "Ok") {
      validarRecargarPag++;
      enviarAlarmas(objAlarmas);
    }

    // Validación Rejillas

    if (objRejillas.error === "Ok") {
      validarRecargarPag++;
      enviarRejillasDia(objRejillas);
    }

    // Validación Tanque

    if (objTanque.error === "Ok") {
      validarRecargarPag++;
      enviarTanques(objTanque);
    }

    // Validación Rio

    if (objRio.error === "Ok") {
      validarRecargarPag++;
      enviarRio(objRio);
    }

    // Validación Disparos Externos

    if (objDispExte.error === "Ok") {
      validarRecargarPag++;
      enviarDisparosExternos(objDispExte);
    }

    // Validación Disparos Internos

    if (objDispInte.error === "Ok") {
      validarRecargarPag++;
      enviarDisparosInternos(objDispInte);
    }

    // Validación Observaciones

    if (objObservaciones.error === "Ok") {
      validarRecargarPag++;
      enviarObservacionesDia(objObservaciones);
    }

    // Validación Observaciones

    if (objAzudRebosadero.error === "Ok") {
      validarRecargarPag++;
      enviarDatosAzudRebosadero(objAzudRebosadero);
    }

    // recargar pagina despues de 2 segundos
    if (validarRecargarPag > 0) {
      recargarPaginaAfterToSeconds();
    } else {
      confirm("No ha ingresado ningun evento");
    }
  } else {
    confirm("Error en el ingreso de eventos!!!");
  }
};

const guardarObservaciones = (objObservaciones, Observaciones) => {
  let txt;
  let str1 = "Desea guardar";

  let r = confirm(str1.concat(" ", Observaciones));
  if (r === true) {
    enviarObservacionesDia(objObservaciones);
  }
};

const resolveAfter2Seconds = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      location.reload(window);
    }, 500);
  });
};

async function recargarPaginaAfterToSeconds() {
  const a = await resolveAfter2Seconds();
}

const estadoCompuertas = (data) => {
  let horaCompuertas = document.getElementById("horaDatosCompuertas");
  let compuertaC1C4 = document.getElementById("c1c4DatosCompuertas");
  let compuertaC5C6 = document.getElementById("c5c6DatosCompuertas");
  let compuertaC7C8C9 = document.getElementById("c7c8DatosCompuertas");
  let compuertaC10 = document.getElementById("c10c11DatosCompuertas");

  obj = {
    horaCompuertas: horaCompuertas.value,
    compuertaC1C4: compuertaC1C4.value,
    compuertaC5C6: compuertaC5C6.value,
    compuertaC7C8C9: compuertaC7C8C9.value,
    compuertaC10: compuertaC10.value,
  };

  let error = "";

  if (horaCompuertas.value != "") {
    if (data === "dia") {
      if (
        horaCompuertas.value === "" ||
        !(horaCompuertas.value >= "06:00" && horaCompuertas.value <= "18:00")
      ) {
        error += "Error hora compuertas\n";
        horaCompuertas.classList.add("error");
      } else {
        horaCompuertas.classList.remove("error");
      }
    } else {
      if (
        horaCompuertas.value === "" ||
        (horaCompuertas.value >= "06:01" && horaCompuertas.value <= "17:59")
      ) {
        error += "Error hora compuertas\n";
        horaCompuertas.classList.add("error");
      } else {
        horaCompuertas.classList.remove("error");
      }
    }

    if (
      compuertaC1C4.value === "" ||
      !(compuertaC1C4.value >= 0 && compuertaC1C4.value <= 150)
    ) {
      error += "Error compuertas 1-4\n";
      compuertaC1C4.classList.add("error");
    }

    if (
      compuertaC5C6.value === "" ||
      !(compuertaC5C6.value >= 0 && compuertaC5C6.value <= 250)
    ) {
      error += "Error compuertas 5-6\n";
      compuertaC5C6.classList.add("error");
    }

    if (
      compuertaC7C8C9.value === "" ||
      !(compuertaC7C8C9.value >= 0 && compuertaC7C8C9.value <= 100)
    ) {
      error += "Error compuertas 7-8-9\n";
      compuertaC7C8C9.classList.add("error");
    }

    if (
      compuertaC10.value === "" ||
      !(compuertaC10.value >= 0 && compuertaC10.value <= 110)
    ) {
      error += "Error compuertas 10\n";
      compuertaC10.classList.add("error");
    }
  } else {
    error = "elemento vacio";
    horaCompuertas.classList.remove("error");
    compuertaC1C4.classList.remove("error");
    compuertaC5C6.classList.remove("error");
    compuertaC7C8C9.classList.remove("error");
    compuertaC10.classList.remove("error");
  }

  if (error != "") {
    obj.error = "Error";
    return obj;
  } else {
    obj.error = "Ok";
    return obj;
  }
};

const estadoFlushing = (data) => {
  let horaFlushing = document.getElementById("horaFlushingUnidades");
  let unidadesFlushing = document.getElementById("flusingUnida1Unidad2");
  let tipoDeAgua = document.getElementById("tipoDeAgua");
  let error = "";

  obj = {
    horaFlushing: horaFlushing.value,
    unidadesFlushing: unidadesFlushing.value,
    tipoDeAgua: tipoDeAgua.value,
  };

  if (horaFlushing.value != "") {
    if (data === "dia") {
      if (!(horaFlushing.value >= "06:00" && horaFlushing.value <= "18:00")) {
        error += "Error hora flushing\n";
        horaFlushing.classList.add("error");
      } else {
        error = "Ok";
        horaFlushing.classList.remove("error");
      }
    } else {
      if (horaFlushing.value >= "06:01" && horaFlushing.value <= "17:59") {
        error += "Error hora flushing\n";
        horaFlushing.classList.add("error");
      } else {
        error = "Ok";
        horaFlushing.classList.remove("error");
      }
    }
    /*
      if(!(horaFlushing.value >= horaInicio && horaFlushing.value <= horaFin)){
        error += "Error hora flushing\n";
        horaFlushing.classList.add("error");        
      }
      else{
        error = "Ok";
        horaFlushing.classList.remove("error"); 
      }  */
  } else {
    error = "elemento vacio";
  }

  obj.error = error;

  return obj;
};

const funcionCambia = () => {
  let observacionesAlarmasPalmira = document.getElementById(
    "observacionesCentral"
  );
  let value = document.getElementById("opcionAlarmasPalmira").value;
  let value1 = document.getElementById("opcionDisparosExternosPalmira").value;
  let value2 = document.getElementById("opcionDisparosInternosPalmira").value;

  let hora = document.getElementById("horaAlarmas").value;
  let hora1 = document.getElementById("horaDisparosExternos").value;
  let hora2 = document.getElementById("horaDisparosInternos").value;

  let obse = observacionesAlarmasPalmira.value;

  if (
    ((value === "Otros" && hora != "") ||
      (value1 === "Otros" && hora1 != "") ||
      (value2 === "Otros" && hora2 != "")) &&
    observacionesAlarmasPalmira.value.trim() === ""
  ) {
    observacionesAlarmasPalmira.classList.add("error");
    observacionesAlarmasPalmira.classList.add("border-danger");
    observacionesAlarmasPalmira.classList.add("bg-warning");
    return "error";
  } else {
    observacionesAlarmasPalmira.classList.remove("error");
    observacionesAlarmasPalmira.classList.remove("border-danger");
    observacionesAlarmasPalmira.classList.remove("bg-warning");
    return "Ok";
  }
};

const estadoAlarmas = (count, data) => {
  let horaAlarmas = document.getElementById("horaAlarmas");
  let opcionAlarmasPalmira = document.getElementById("opcionAlarmasPalmira");
  let observacionesAlarmasPalmira = document.getElementById(
    "observacionesCentral"
  );
  let error = "";

  obj = {
    horaAlarmas: horaAlarmas.value,
    opcionAlarmasPalmira: opcionAlarmasPalmira.value,
    observaciones: observacionesAlarmasPalmira.value.trim(),
  };

  let condicion1 = obj.horaAlarmas >= "06:00" && obj.horaAlarmas <= "18:00";
  let condicion2 = !(obj.horaAlarmas >= "06:01" && obj.horaAlarmas <= "17:59");

  if (data === "dia") {
    condicion1 = condicion1;
  } else {
    condicion1 = condicion2;
  }

  // Valida hora entrada

  if (!condicion1 && obj.horaAlarmas != "") {
    error += "Error hora Alarmas";
    horaAlarmas.classList.add("error");
  } else {
    horaAlarmas.classList.remove("error");
  }

  // Valida ingresos

  if (
    condicion1 &&
    obj.horaAlarmas != "" &&
    obj.observaciones != "" &&
    obj.opcionAlarmasPalmira === "Otros" &&
    count === 1
  ) {
    error += "Ok";
  } else if (
    obj.horaAlarmas != "" &&
    obj.opcionAlarmasPalmira != "Otros" &&
    count <= 1
  ) {
    obj.observaciones = "";
    error += "Ok";
  }
  obj.error = error;

  return obj;
};

const estadoDisparosExternos = (count, data) => {
  let horaDisparosExternos = document.getElementById("horaDisparosExternos");
  let opcionDisparosExternosPalmira = document.getElementById(
    "opcionDisparosExternosPalmira"
  );
  let observacionesAlarmasPalmira = document.getElementById(
    "observacionesCentral"
  );
  let error = "";

  obj = {
    horaDisparosExternos: horaDisparosExternos.value,
    opcionDisparosExternosPalmira: opcionDisparosExternosPalmira.value,
    observaciones: observacionesAlarmasPalmira.value.trim(),
  };

  let condicion = "";

  if (data === "dia") {
    condicion =
      obj.horaDisparosExternos >= "06:00" &&
      obj.horaDisparosExternos <= "18:00";
  } else {
    condicion = !(
      obj.horaDisparosExternos >= "06:01" && obj.horaDisparosExternos <= "17:59"
    );
  }

  //let condicion1 = (obj.horaDisparosExternos >= "06:00" && obj.horaDisparosExternos <= "18:00");

  // Valida hora entrada

  if (!condicion && obj.horaDisparosExternos != "") {
    error += "Error hora Alarmas";
    horaDisparosExternos.classList.add("error");
  } else {
    horaDisparosExternos.classList.remove("error");
  }

  // Valida ingresos

  if (
    condicion &&
    obj.horaDisparosExternos != "" &&
    obj.observaciones != "" &&
    obj.opcionDisparosExternosPalmira === "Otros" &&
    count === 1
  ) {
    error += "Ok";
  } else if (
    obj.horaDisparosExternos != "" &&
    obj.opcionDisparosExternosPalmira != "Otros" &&
    count <= 1
  ) {
    obj.observaciones = "";
    error += "Ok";
  }
  obj.error = error;

  return obj;
};

const estadoDisparosInternos = (count, data) => {
  let horaDisparosInternos = document.getElementById("horaDisparosInternos");
  let opcionDisparosInternosPalmira = document.getElementById(
    "opcionDisparosInternosPalmira"
  );
  let observacionesAlarmasPalmira = document.getElementById(
    "observacionesCentral"
  );
  let error = "";

  obj = {
    horaDisparosInternos: horaDisparosInternos.value,
    opcionDisparosInternosPalmira: opcionDisparosInternosPalmira.value,
    observaciones: observacionesAlarmasPalmira.value.trim(),
  };

  let condicion1 = "";

  if (data === "dia") {
    condicion1 =
      obj.horaDisparosInternos >= "06:00" &&
      obj.horaDisparosInternos <= "18:00";
  } else {
    condicion1 = !(
      obj.horaDisparosInternos >= "06:01" && obj.horaDisparosInternos <= "17:59"
    );
  }

  //let condicion1 = (obj.horaDisparosInternos >= "06:00" && obj.horaDisparosInternos <= "18:00");

  // Valida hora entrada

  if (!condicion1 && obj.horaDisparosInternos != "") {
    error += "Error hora Alarmas";
    horaDisparosInternos.classList.add("error");
  } else {
    horaDisparosInternos.classList.remove("error");
  }

  // Valida ingresos

  if (
    condicion1 &&
    obj.horaDisparosInternos != "" &&
    obj.observaciones != "" &&
    obj.opcionDisparosInternosPalmira === "Otros" &&
    count === 1
  ) {
    error += "Ok";
  } else if (
    obj.horaDisparosInternos != "" &&
    obj.opcionDisparosInternosPalmira != "Otros" &&
    count <= 1
  ) {
    obj.observaciones = "";
    error += "Ok";
  }
  obj.error = error;

  return obj;
};

const estadoLimpiezaRejillas = (data) => {
  let horaLimpiezaRejillas = document.getElementById("horaLimpiezaRejillas");
  let opcionRejillas = document.getElementById("opcionRejillas");
  let error = "";

  obj = {
    horaLimpiezaRejillas: horaLimpiezaRejillas.value,
    opcionRejillas: opcionRejillas.value,
  };

  let condicion1 = "";

  if (data === "dia") {
    condicion1 = !(
      obj.horaLimpiezaRejillas >= "06:00" && obj.horaLimpiezaRejillas <= "18:00"
    );
  } else {
    condicion1 =
      obj.horaLimpiezaRejillas >= "06:01" &&
      obj.horaLimpiezaRejillas <= "17:59";
  }

  if (horaLimpiezaRejillas.value != "") {
    if (condicion1) {
      error += "Error hora limpieza rejillas\n";
      horaLimpiezaRejillas.classList.add("error");
    } else {
      error = "Ok";
      horaLimpiezaRejillas.classList.remove("error");
    }
  } else {
    error = "elemento vacio";
  }

  obj.error = error;
  return obj;
};

const estadoLimpiezaTanques = (data) => {
  let horaLimpiezaTanques = document.getElementById("horaLimpiezaTanques");
  let opcionTanque = document.getElementById("opcionTanque");
  let error = "";

  obj = {
    horaLimpiezaTanques: horaLimpiezaTanques.value,
    opcionTanque: opcionTanque.value,
  };

  let condicion = "";

  if (data === "dia") {
    condicion = !(
      horaLimpiezaTanques.value >= "06:00" &&
      horaLimpiezaTanques.value <= "18:00"
    );
  } else {
    condicion =
      horaLimpiezaTanques.value >= "06:01" &&
      horaLimpiezaTanques.value <= "17:59";
  }

  if (horaLimpiezaTanques.value != "") {
    if (condicion) {
      error += "Error hora limpieza tanques\n";
      horaLimpiezaTanques.classList.add("error");
    } else {
      error = "Ok";
      horaLimpiezaTanques.classList.remove("error");
    }
  } else {
    error = "elemento vacio";
  }

  obj.error = error;

  return obj;
};

const estadoCondicionesRio = (data) => {
  let horaCondicionesRio = document.getElementById("horaCondicionesRio");
  let CondicionesDelRio = document.getElementById("opcionRio");
  let error = "";

  obj = {
    horaCondicionesRio: horaCondicionesRio.value,
    CondicionesDelRio: CondicionesDelRio.value,
  };

  let condicion = "";

  if (data === "dia") {
    condicion = !(
      horaCondicionesRio.value >= "06:00" && horaCondicionesRio.value <= "18:00"
    );
  } else {
    condicion =
      horaCondicionesRio.value >= "06:01" &&
      horaCondicionesRio.value <= "17:59";
  }

  if (horaCondicionesRio.value != "") {
    if (condicion) {
      error += "Error hora limpieza tanques\n";
      horaCondicionesRio.classList.add("error");
    } else {
      error = "Ok";
      horaCondicionesRio.classList.remove("error");
    }
  } else {
    error = "elemento vacio";
  }

  obj.error = error;

  return obj;
};

const validarIngresoOtros = () => {
  let count = 0;
  let arreglo = new Array();
  let arregloHora = new Array();
  let opcionDisparosExternosPalmira = document.getElementById(
    "opcionDisparosExternosPalmira"
  ).value;
  let opcionDisparosInternosPalmira = document.getElementById(
    "opcionDisparosInternosPalmira"
  ).value;
  let opcionAlarmasPalmira = document.getElementById(
    "opcionAlarmasPalmira"
  ).value;
  let observacionesAlarmasPalmira = document.getElementById(
    "observacionesCentral"
  );

  let horaAlarmas = document.getElementById("horaAlarmas").value;
  let horaDisparosExternos = document.getElementById(
    "horaDisparosExternos"
  ).value;
  let horaDisparosInternos = document.getElementById(
    "horaDisparosInternos"
  ).value;

  arreglo.push(opcionDisparosExternosPalmira);
  arregloHora.push(horaDisparosExternos);

  arreglo.push(opcionAlarmasPalmira);
  arregloHora.push(horaAlarmas);

  arregloHora.push(horaDisparosInternos);
  arreglo.push(opcionDisparosInternosPalmira);

  for (let i = 0; i < arregloHora.length; i++) {
    if (arreglo[i] === "Otros" && arregloHora[i] != "") {
      count++;
    }
  }
  if (count > 1) {
    observacionesAlarmasPalmira.classList.add("error");
  } else {
    observacionesAlarmasPalmira.classList.remove("error");
  }

  return count;
};

const validarAzudRebosadero = (data) => {
  let horaAzud = document.getElementById("horaAzud");
  let azudValor = document.getElementById("azudValor");
  let rebosaderoValor = document.getElementById("rebosaderoValor");
  let error = "";

  obj = {
    horaAzud: horaAzud.value,
    azudValor: azudValor.value,
    rebosaderoValor: rebosaderoValor.value,
  };

  let condicion = "";

  if (data === "dia") {
    condicion = !(horaAzud.value >= "06:00" && horaAzud.value <= "18:00");
  } else {
    condicion = horaAzud.value >= "06:01" && horaAzud.value <= "17:59";
  }

  if (horaAzud.value != "") {
    if (horaAzud.value === "" || condicion) {
      error += "Error hora azud\n";
      horaAzud.classList.add("error");
    } else {
      horaAzud.classList.remove("error");
    }

    if (
      azudValor.value === "" ||
      !(azudValor.value >= -110 && azudValor.value <= 120)
    ) {
      error += "Error azud valor\n";
      azudValor.classList.add("error");
    }

    if (
      rebosaderoValor.value === "" ||
      !(rebosaderoValor.value >= -110 && rebosaderoValor.value <= 30)
    ) {
      error += "Error rebosadero valor\n";
      rebosaderoValor.classList.add("error");
    }
  } else {
    error = "elemento vacio";
    horaAzud.classList.remove("error");
    azudValor.classList.remove("error");
    rebosaderoValor.classList.remove("error");
  }

  if (error != "") {
    obj.error = "Error";
    return obj;
  } else {
    obj.error = "Ok";
    return obj;
  }
};

const validarObservacionesSola = (contador, data) => {
  let horaObservaciones = document.getElementById("horaObservaciones");
  let observacionesCentral = document.getElementById("observacionesCentral");
  let error = "";

  obj = {
    horaObservaciones: horaObservaciones.value,
    observacionesCentral: observacionesCentral.value.trim(),
  };

  let condicion = "";

  if (data === "dia") {
    condicion = !(
      obj.horaObservaciones >= "06:00" && obj.horaObservaciones <= "18:00"
    );
  } else {
    condicion =
      obj.horaObservaciones >= "06:01" && obj.horaObservaciones <= "17:59";
  }

  if (obj.horaObservaciones != "") {
    if (condicion) {
      error += "Error hora observaciones\n";
      horaObservaciones.classList.add("error");
    } else {
      horaObservaciones.classList.remove("error");
    }

    if (obj.observacionesCentral === "" || contador != 0) {
      error += "Error observaciones\n";
      observacionesCentral.classList.add("error");
      observacionesCentral.classList.add("border-danger");
      observacionesCentral.classList.add("bg-warning");
    } else {
      observacionesCentral.classList.remove("error");
      observacionesCentral.classList.remove("border-danger");
      observacionesCentral.classList.remove("bg-warning");
    }
  } else {
    error += "Elemento vacío\n";
  }

  if (error === "") {
    obj.error = "Ok";
  } else {
    obj.error = error;
  }

  return obj;
};

/******************************************** Guardar Primer turno **********************************************/

const entregarPrimerTurno = () => {
  let horaEntregaTurno = document.getElementById("horaIngresoPersonal");
  let entregaTurno = document.getElementById("horarioDeIngreso");
  let accionTurnos = document.getElementById("entregaRecibeTurnos");
  let nombresPersonal = document.getElementById("nombresPersonal");
  let potenciaUnidades = document.getElementById("potenciaCentral");
  let reactivosUnidades = document.getElementById("reactivosCentral");
  let alabesUnidadU1 = document.getElementById("alabesCentralU1");
  let alabesUnidadU2 = document.getElementById("alabesCentralU2");
  let filtroUnidadU1 = document.getElementById("filtrosCentralU1");
  let filtroUnidadU2 = document.getElementById("filtrosCentralU2");
  let horaDatosCompuertas = document.getElementById("horaDatosCompuertas");
  let c1c4DatosCompuertas = document.getElementById("c1c4DatosCompuertas");
  let c5c6DatosCompuertas = document.getElementById("c5c6DatosCompuertas");
  let c7c8DatosCompuertas = document.getElementById("c7c8DatosCompuertas");
  let c10c11DatosCompuertas = document.getElementById("c10c11DatosCompuertas");
  let observacionesCentral = document.getElementById("observacionesCentral");
  let azud = document.getElementById("azudValor");
  let rebosadero = document.getElementById("rebosaderoValor");
  let horaAzud = document.getElementById("horaAzud");
  let numBitacora = document.getElementById("numBitacora");
  let error = "";

  objeto = {
    horaEntregaTurno: horaEntregaTurno.value,
    entregaTurno: entregaTurno.value,
    accionTurnos: accionTurnos.value,
    nombresPersonal: nombresPersonal.value.trim(),
    potenciaUnidades: potenciaUnidades.value,
    reactivosUnidades: reactivosUnidades.value,
    alabesUnidadU1: alabesUnidadU1.value,
    alabesUnidadU2: alabesUnidadU2.value,
    filtroUnidadU1: filtroUnidadU1.value,
    filtroUnidadU2: filtroUnidadU2.value,
    numBitacora: numBitacora.value,
    horaDatosCompuertas: horaDatosCompuertas.value,
    c1c4DatosCompuertas: c1c4DatosCompuertas.value,
    c5c6DatosCompuertas: c5c6DatosCompuertas.value,
    c7c8DatosCompuertas: c7c8DatosCompuertas.value,
    c10c11DatosCompuertas: c10c11DatosCompuertas.value,
    azud: azud.value,
    rebosadero: rebosadero.value,
    horaAzud: horaAzud.value,
    observacionesCentral: observacionesCentral.value.trim(),
  };

  // Validación hora entrega turno

  if (objeto.horaEntregaTurno != "18:00") {
    error += "Hora invalida\n";
    horaEntregaTurno.classList.add("error");
  } else {
    horaEntregaTurno.classList.remove("error");
  }

  // Validación Primero/Segundo turno

  if (objeto.entregaTurno != "Primer Turno") {
    error += "Primer turno invalido\n";
    entregaTurno.classList.add("error");
  } else {
    entregaTurno.classList.remove("error");
  }

  // Validación accion turno

  if (objeto.accionTurnos != "Entrega") {
    error += "Entrega turno invalido\n";
    accionTurnos.classList.add("error");
  } else {
    accionTurnos.classList.remove("error");
  }

  // Validación nombres

  validarNombre();

  if (
    objeto.nombresPersonal === "" ||
    nombresPersonal.classList.contains("error")
  ) {
    error += "Nombres invalido\n";
    nombresPersonal.classList.add("error");
  } else {
    nombresPersonal.classList.remove("error");
  }

  // Validación tabla clima tarde

  let clima = validarClima("tarde");

  error += clima.error;
  objeto.tarde = clima.out;

  // Validación potencia

  if (objeto.potenciaUnidades === "") {
    error += "Potencia invalida\n";
    potenciaUnidades.classList.add("error");
  } else {
    potenciaUnidades.classList.remove("error");
  }

  // Validación reactivos

  if (objeto.reactivosUnidades === "") {
    error += "Reactivos invalidos\n";
    reactivosUnidades.classList.add("error");
  } else {
    reactivosUnidades.classList.remove("error");
  }

  // Validación Alabes U1 - U2

  if (objeto.alabesUnidadU1 === "") {
    error += "Alabes U1 invalidos\n";
    alabesUnidadU1.classList.add("error");
  } else {
    alabesUnidadU1.classList.remove("error");
  }

  if (objeto.alabesUnidadU2 === "") {
    error += "Alabes U2 invalidos\n";
    alabesUnidadU2.classList.add("error");
  } else {
    alabesUnidadU2.classList.remove("error");
  }

  // Validación filtros U1 - U2

  if (objeto.filtroUnidadU1 === "") {
    error += "Filtro U1 invalido\n";
    filtroUnidadU1.classList.add("error");
  } else {
    filtroUnidadU1.classList.remove("error");
  }

  if (objeto.filtroUnidadU2 === "") {
    error += "Filtro U2 invalido\n";
    filtroUnidadU2.classList.add("error");
  } else {
    filtroUnidadU2.classList.remove("error");
  }

  // Validación compuertas

  if (
    objeto.horaDatosCompuertas === "" ||
    objeto.horaDatosCompuertas != "18:00"
  ) {
    error += "Hora compuertas invalidas\n";
    horaDatosCompuertas.classList.add("error");
  } else {
    horaDatosCompuertas.classList.remove("error");
  }

  if (objeto.c1c4DatosCompuertas === "") {
    error += "Compuertas c1 - c4 invalidas\n";
    c1c4DatosCompuertas.classList.add("error");
  } else {
    c1c4DatosCompuertas.classList.remove("error");
  }

  if (objeto.c5c6DatosCompuertas === "") {
    error += "Compuertas c5 - c6 invalidas\n";
    c5c6DatosCompuertas.classList.add("error");
  } else {
    c5c6DatosCompuertas.classList.remove("error");
  }

  if (objeto.c7c8DatosCompuertas === "") {
    error += "Compuertas c7 - c9 invalidas\n";
    c7c8DatosCompuertas.classList.add("error");
  } else {
    c7c8DatosCompuertas.classList.remove("error");
  }

  if (objeto.c10c11DatosCompuertas === "") {
    error += "Compuerta c10 invalida\n";
    c10c11DatosCompuertas.classList.add("error");
  } else {
    c10c11DatosCompuertas.classList.remove("error");
  }

  // Validación Bitacora

  if (objeto.numBitacora === "") {
    error += "Numero de bitacora invalida\n";
    numBitacora.classList.add("error");
  } else {
    numBitacora.classList.remove("error");
  }

  // Validación Observaciones

  if (objeto.observacionesCentral === "") {
    error += "Observaciones invalidas\n";
    observacionesCentral.classList.add("error");
    observacionesCentral.classList.add("border-danger");
    observacionesCentral.classList.add("bg-warning");
  } else {
    observacionesCentral.classList.remove("error");
    observacionesCentral.classList.remove("border-danger");
    observacionesCentral.classList.remove("bg-warning");
  }

  // Validación Azud

  if (objeto.horaAzud === "" || objeto.horaAzud != "18:00") {
    error += "Hora azud invalido\n";
    horaAzud.classList.add("error");
  } else {
    horaAzud.classList.remove("error");
  }

  // Validación Azud

  if (objeto.azud === "") {
    error += "Azud invalido\n";
    azud.classList.add("error");
  } else {
    azud.classList.remove("error");
  }

  // Validación rebosadero

  if (objeto.rebosadero === "") {
    error += "Rebosadero invalido\n";
    rebosadero.classList.add("error");
  } else {
    rebosadero.classList.remove("error");
  }

  // Error Validación Total

  if (error === "") {
    objeto.error = "Ok";
  } else {
    objeto.error = error;
  }

  if (objeto.error === "Ok") {
    enviarDatosEntregaPrimerTurno(objeto);
  }

  // Validar la entrega del turno
  let var1 = document.getElementById("climaTabla").classList;
  let entradas = document.getElementById("myForm");

  for (let i = 0; i < entradas.length; i++) {
    if (entradas[i].classList.contains("error") || var1.contains("error")) {
      return confirm(
        "Error al entregar el turno, Complete los campos resaltados"
      );
    }
  }
};

// ************************************************** Inicio Alarmas Base datos ********************************
const enviarAlarmas = (objeto) => {
  let dataTotal = new FormData(); // Crear el formato para enviar datos
  dataTotal.append("numBitacora", objeto.numBitacora); // Número de bitácora
  dataTotal.append("horaAlarmas", objeto.horaAlarmas);
  dataTotal.append("opcionAlarmasPalmira", objeto.opcionAlarmasPalmira);
  dataTotal.append("observaciones", objeto.observaciones);

  let xhr = new XMLHttpRequest(); // Crea objeto request
  xhr.open("POST", "./GuardarEventos/alarmas.php", true); // Abre comunicacion con archivo backend
  xhr.onload = function () {
    // Funcion que recibe respuesta del servidor
  };

  xhr.send(dataTotal); // Envía datos al servidor
  return false; // Finaliza la funcion retornando false
};
// ************************************************** Fin Alarmas Base datos ********************************

// ************************************************** Inicio FLUSHING Base datos ********************************
const enviarFlushing = (objeto) => {
  let dataTotal = new FormData(); // Crear el formato para enviar datos
  dataTotal.append("horaFlushing", objeto.horaFlushing); // Número de bitácora
  dataTotal.append("tipoDeAgua", objeto.tipoDeAgua);
  dataTotal.append("unidadesFlushing", objeto.unidadesFlushing);

  let xhr = new XMLHttpRequest(); // Crea objeto request
  xhr.open("POST", "./GuardarEventos/flushing.php", true); // Abre comunicacion con archivo backend
  xhr.onload = function () {
    // Funcion que recibe respuesta del servidor
  };

  xhr.send(dataTotal); // Envía datos al servidor
  return false; // Finaliza la funcion retornando false
};
// ************************************************** Fin FLUSHING Base datos ********************************

//******************************************* Inicio Limpieza rejillas Base datos ********************************
const enviarRejillasDia = (objeto) => {
  let dataTotal = new FormData(); // Crear el formato para enviar datos
  dataTotal.append("horaLimpiezaRejillas", objeto.horaLimpiezaRejillas); // Número de bitácora
  dataTotal.append("opcionRejillas", objeto.opcionRejillas);

  let xhr = new XMLHttpRequest(); // Crea objeto request
  xhr.open("POST", "./GuardarEventos/rejillas.php", true); // Abre comunicacion con archivo backend
  xhr.onload = function () {
    // Funcion que recibe respuesta del servidor
  };

  xhr.send(dataTotal); // Envía datos al servidor
  return false; // Finaliza la funcion retornando false
};
//******************************************* Fin Limpieza rejillas Base datos ********************************

//******************************************* Inicio Limpieza tanques Base datos ********************************
const enviarTanques = (objeto) => {
  let dataTotal = new FormData(); // Crear el formato para enviar datos
  dataTotal.append("horaLimpiezaTanques", objeto.horaLimpiezaTanques); // Número de bitácora
  dataTotal.append("opcionTanque", objeto.opcionTanque);

  let xhr = new XMLHttpRequest(); // Crea objeto request
  xhr.open("POST", "./GuardarEventos/tanques.php", true); // Abre comunicacion con archivo backend
  xhr.onload = function () {
    // Funcion que recibe respuesta del servidor
  };

  xhr.send(dataTotal); // Envía datos al servidor
  return false; // Finaliza la funcion retornando false
};
//******************************************* Fin Limpieza tanques Base datos ********************************

//******************************************* Inicio rio Base datos ********************************
const enviarRio = (objeto) => {
  let dataTotal = new FormData(); // Crear el formato para enviar datos
  dataTotal.append("horaCondicionesRio", objeto.horaCondicionesRio); // Número de bitácora
  dataTotal.append("opcionRio", objeto.CondicionesDelRio);

  let xhr = new XMLHttpRequest(); // Crea objeto request
  xhr.open("POST", "./GuardarEventos/rio.php", true); // Abre comunicacion con archivo backend
  xhr.onload = function () {
    // Funcion que recibe respuesta del servidor
  };

  xhr.send(dataTotal); // Envía datos al servidor
  return false; // Finaliza la funcion retornando false
};
//******************************************* Fin rio Base datos ********************************

//******************************************* Inicio Disparos internos Base datos ********************************
const enviarDisparosInternos = (objeto) => {
  let dataTotal = new FormData(); // Crear el formato para enviar datos
  dataTotal.append("horaDisparosInternos", objeto.horaDisparosInternos); // Número de bitácora
  dataTotal.append(
    "opcionDisparosInternosPalmira",
    objeto.opcionDisparosInternosPalmira
  );
  dataTotal.append("observaciones", objeto.observaciones);

  let xhr = new XMLHttpRequest(); // Crea objeto request
  xhr.open("POST", "./GuardarEventos/disparosInternos.php", true); // Abre comunicacion con archivo backend
  xhr.onload = function () {
    // Funcion que recibe respuesta del servidor
  };

  xhr.send(dataTotal); // Envía datos al servidor
  return false; // Finaliza la funcion retornando false
};
//******************************************* Fin Disparos internos Base datos ********************************

//******************************************* Inicio Disparos externos Base datos ********************************
const enviarDisparosExternos = (objeto) => {
  let dataTotal = new FormData(); // Crear el formato para enviar datos
  dataTotal.append("horaDisparosExternos", objeto.horaDisparosExternos); // Número de bitácora
  dataTotal.append(
    "opcionDisparosExternosPalmira",
    objeto.opcionDisparosExternosPalmira
  );
  dataTotal.append("observaciones", objeto.observaciones);

  let xhr = new XMLHttpRequest(); // Crea objeto request
  xhr.open("POST", "./GuardarEventos/disparosExternos.php", true); // Abre comunicacion con archivo backend
  xhr.onload = function () {
    // Funcion que recibe respuesta del servidor
  };

  xhr.send(dataTotal); // Envía datos al servidor
  return false; // Finaliza la funcion retornando false
};
//******************************************* Fin Disparos externos Base datos ********************************

//******************************************* Inicio compuertas Base datos ********************************
const enviarDatosCompuertas = (objeto) => {
  let dataTotal = new FormData(); // Crear el formato para enviar datos
  dataTotal.append("horaCompuertas", objeto.horaCompuertas); // Número de bitácora
  dataTotal.append("compuertaC1C4", objeto.compuertaC1C4);
  dataTotal.append("compuertaC5C6", objeto.compuertaC5C6);
  dataTotal.append("compuertaC7C8C9", objeto.compuertaC7C8C9);
  dataTotal.append("compuertaC10", objeto.compuertaC10);

  let xhr = new XMLHttpRequest(); // Crea objeto request
  xhr.open("POST", "./GuardarEventos/datosCompuertas.php", true); // Abre comunicacion con archivo backend
  xhr.onload = function () {
    // Funcion que recibe respuesta del servidor
  };

  xhr.send(dataTotal); // Envía datos al servidor
  return false; // Finaliza la funcion retornando false
};
//******************************************* Fin compuertas Base datos ********************************

//******************************************* Inicio compuertas Base datos ********************************
const enviarDatosAzudRebosadero = (objeto) => {
  let dataTotal = new FormData(); // Crear el formato para enviar datos
  dataTotal.append("horaAzud", objeto.horaAzud); // Número de bitácora
  dataTotal.append("azudValor", objeto.azudValor);
  dataTotal.append("rebosaderoValor", objeto.rebosaderoValor);

  let xhr = new XMLHttpRequest(); // Crea objeto request
  xhr.open("POST", "./GuardarEventos/datosAzudRebosadero.php", true); // Abre comunicacion con archivo backend
  xhr.onload = function () {
    // Funcion que recibe respuesta del servidor
  };

  xhr.send(dataTotal); // Envía datos al servidor
  return false; // Finaliza la funcion retornando false
};
//******************************************* Fin compuertas Base datos ********************************

//******************************************* Inicio observaciones Base datos ********************************
const enviarObservacionesDia = (objeto) => {
  let dataTotal = new FormData(); // Crear el formato para enviar datos
  dataTotal.append("horaObservaciones", objeto.horaObservaciones); // Número de bitácora
  dataTotal.append("observacionesCentral", objeto.observacionesCentral);

  let xhr = new XMLHttpRequest(); // Crea objeto request
  xhr.open("POST", "./GuardarEventos/datosObservaciones.php", true); // Abre comunicacion con archivo backend
  xhr.onload = function () {
    // Funcion que recibe respuesta del servidor
  };

  xhr.send(dataTotal); // Envía datos al servidor
  return false; // Finaliza la funcion retornando false
};
//******************************************* Fin observaciones Base datos ********************************

//******************************************** RECIBIR EL SEGUNDO TURNO ***********************************//

const RecibirSegundoTurno = () => {
  validarCompuertasC1C4();
  validarCompuertasC5C6();
  validarCompuertasC7C8();
  validarCompuertasC10();
  validarObservaciones();

  // Validación de horas y fechas
  horaEntrega("18:00");
  validarPotencia();
  validarReactivos();
  validarAlabesU1();
  validarAlabesU2();
  validarNumeroBitacora();
  validarFiltrosU1();
  validarFiltrosU2();
  validarNombre();
  validarAzud();
  validarRebosadero();

  let nombresPersonal = document.getElementById("nombresPersonal");
  let noche = validarClima("noche");
  let potencia = document.getElementById("potenciaCentral");
  let reactivos = document.getElementById("reactivosCentral");
  let azudValor = document.getElementById("azudValor");
  let rebosaderoValor = document.getElementById("rebosaderoValor");
  let c1c4DatosCompuertas = document.getElementById("c1c4DatosCompuertas");
  let c5c6DatosCompuertas = document.getElementById("c5c6DatosCompuertas");
  let c7c8DatosCompuertas = document.getElementById("c7c8DatosCompuertas");
  let c10c11DatosCompuertas = document.getElementById("c10c11DatosCompuertas");
  let alabesCentralU1 = document.getElementById("alabesCentralU1");
  let alabesCentralU2 = document.getElementById("alabesCentralU2");
  let filtrosCentralU1 = document.getElementById("filtrosCentralU1");
  let filtrosCentralU2 = document.getElementById("filtrosCentralU2");
  let numBitacora = document.getElementById("numBitacora");
  let observacionesCentral = document.getElementById("observacionesCentral");
  let valoresNombres = turno();

  obj = {
    nombresPersonal: valoresNombres.nombres,
    noche: noche.out,
    potencia: potencia.value,
    reactivos: reactivos.value,
    azudValor: azudValor.value,
    rebosaderoValor: rebosaderoValor.value,
    c1c4DatosCompuertas: c1c4DatosCompuertas.value,
    c5c6DatosCompuertas: c5c6DatosCompuertas.value,
    c7c8DatosCompuertas: c7c8DatosCompuertas.value,
    c10c11DatosCompuertas: c10c11DatosCompuertas.value,
    alabesCentralU1: alabesCentralU1.value,
    alabesCentralU2: alabesCentralU2.value,
    filtrosCentralU1: filtrosCentralU1.value,
    filtrosCentralU2: filtrosCentralU2.value,
    numBitacora: numBitacora.value,
    observacionesCentral: observacionesCentral.value,
    //valores:                    valoresNombres.nombres,
  };

  let hora1 = document.getElementById("horaIngresoPersonal");
  let opcion = document.getElementById("entregaRecibeTurnos");
  let opcion1 = document.getElementById("horarioDeIngreso");

  if (hora1.value === "" || hora1.value != "18:00") {
    hora1.classList.add("error");
  } else {
    hora1.classList.remove("error");
  }

  if (opcion.value != "Recibe") {
    opcion.classList.add("error");
  } else {
    opcion.classList.remove("error");
  }

  if (opcion1.value != "Segundo Turno") {
    opcion1.classList.add("error");
  } else {
    opcion1.classList.remove("error");
  }

  let var1 = document.getElementById("climaTabla").classList;
  let entradas = document.getElementById("myForm");

  for (let i = 0; i < entradas.length; i++) {
    if (entradas[i].classList.contains("error") || var1.contains("error")) {
      confirm(
        "Error al recibir el segundo turno, Complete los campos resaltados"
      );
      return "Error al recibir el segundo turno";
    }
  }
  enviarRecibeSegundoTurno(obj);
};

//******************************************* Inicio observaciones Base datos ********************************
const enviarRecibeSegundoTurno = (objeto) => {
  let dataTotal = new FormData(); // Crear el formato para enviar datos

  // dataTotal.append("horaObservaciones",objeto.horaObservaciones);                             // Número de bitácora
  dataTotal.append("observacionesCentral", objeto.observacionesCentral);

  dataTotal.append("nombresPersonal", objeto.nombresPersonal);
  dataTotal.append("noche", objeto.noche);
  dataTotal.append("potencia", objeto.potencia);
  dataTotal.append("reactivos", objeto.reactivos);
  dataTotal.append("azudValor", objeto.azudValor);
  dataTotal.append("rebosaderoValor", objeto.rebosaderoValor);
  dataTotal.append("c1c4DatosCompuertas", objeto.c1c4DatosCompuertas);
  dataTotal.append("c5c6DatosCompuertas", objeto.c5c6DatosCompuertas);
  dataTotal.append("c7c8DatosCompuertas", objeto.c7c8DatosCompuertas);
  dataTotal.append("c10c11DatosCompuertas", objeto.c10c11DatosCompuertas);
  dataTotal.append("alabesCentralU1", objeto.alabesCentralU1);
  dataTotal.append("alabesCentralU2", objeto.alabesCentralU2);
  dataTotal.append("filtrosCentralU1", objeto.filtrosCentralU1);
  dataTotal.append("filtrosCentralU2", objeto.filtrosCentralU2);
  dataTotal.append("numBitacora", objeto.numBitacora);
  dataTotal.append("segundoTurno", "SegundoOk");
  dataTotal.append("observacionesCentral", objeto.observacionesCentral);

  let xhr = new XMLHttpRequest(); // Crea objeto request
  xhr.open("POST", "./GuardarEventos/recibeSegundoTurno.php", true); // Abre comunicacion con archivo backend
  xhr.onload = function () {
    // Funcion que recibe respuesta del servidor
    location.reload(window);
  };

  xhr.send(dataTotal); // Envía datos al servidor
  return false; // Finaliza la funcion retornando false
};
//******************************************* Fin observaciones Base datos ********************************

/********************************************* Inicio Validar hora *************************************/
const horaEntrega = (horaVal) => {
  let hora1 = document.getElementById("horaIngresoPersonal");
  let hora2 = document.getElementById("horaDatosCompuertas");
  let hora3 = document.getElementById("horaAzud");

  if (hora1.value === "" || hora1.value != horaVal) {
    hora1.classList.add("error");
  } else {
    hora1.classList.remove("error");
  }

  if (hora2.value === "" || hora2.value != horaVal) {
    hora2.classList.add("error");
  } else {
    hora2.classList.remove("error");
  }

  if (hora3.value === "" || hora3.value != horaVal) {
    hora3.classList.add("error");
  } else {
    hora3.classList.remove("error");
  }
};
/********************************************* Fin Validar hora ****************************************/

/******************************************** Guardar Segundo turno **********************************************/

const entregarSegundoTurno = () => {
  let horaEntregaTurno = document.getElementById("horaIngresoPersonal");
  let entregaTurno = document.getElementById("horarioDeIngreso");
  let accionTurnos = document.getElementById("entregaRecibeTurnos");
  let nombresPersonal = document.getElementById("nombresPersonal");
  let potenciaUnidades = document.getElementById("potenciaCentral");
  let reactivosUnidades = document.getElementById("reactivosCentral");
  let alabesUnidadU1 = document.getElementById("alabesCentralU1");
  let alabesUnidadU2 = document.getElementById("alabesCentralU2");
  let filtroUnidadU1 = document.getElementById("filtrosCentralU1");
  let filtroUnidadU2 = document.getElementById("filtrosCentralU2");
  let horaDatosCompuertas = document.getElementById("horaDatosCompuertas");
  let c1c4DatosCompuertas = document.getElementById("c1c4DatosCompuertas");
  let c5c6DatosCompuertas = document.getElementById("c5c6DatosCompuertas");
  let c7c8DatosCompuertas = document.getElementById("c7c8DatosCompuertas");
  let c10c11DatosCompuertas = document.getElementById("c10c11DatosCompuertas");
  let observacionesCentral = document.getElementById("observacionesCentral");
  let azud = document.getElementById("azudValor");
  let rebosadero = document.getElementById("rebosaderoValor");
  let horaAzud = document.getElementById("horaAzud");
  let numBitacora = document.getElementById("numBitacora");
  let error = "";

  objeto = {
    horaEntregaTurno: horaEntregaTurno.value,
    entregaTurno: entregaTurno.value,
    accionTurnos: accionTurnos.value,
    nombresPersonal: nombresPersonal.value.trim(),
    potenciaUnidades: potenciaUnidades.value,
    reactivosUnidades: reactivosUnidades.value,
    alabesUnidadU1: alabesUnidadU1.value,
    alabesUnidadU2: alabesUnidadU2.value,
    filtroUnidadU1: filtroUnidadU1.value,
    filtroUnidadU2: filtroUnidadU2.value,
    numBitacora: numBitacora.value,
    horaDatosCompuertas: horaDatosCompuertas.value,
    c1c4DatosCompuertas: c1c4DatosCompuertas.value,
    c5c6DatosCompuertas: c5c6DatosCompuertas.value,
    c7c8DatosCompuertas: c7c8DatosCompuertas.value,
    c10c11DatosCompuertas: c10c11DatosCompuertas.value,
    azud: azud.value,
    rebosadero: rebosadero.value,
    horaAzud: horaAzud.value,
    observacionesCentral: observacionesCentral.value.trim(),
  };

  // Validación hora entrega turno

  if (objeto.horaEntregaTurno != "06:00") {
    error += "Hora invalida\n";
    horaEntregaTurno.classList.add("error");
  } else {
    horaEntregaTurno.classList.remove("error");
  }

  // Validación Primero/Segundo turno

  if (objeto.entregaTurno != "Segundo Turno") {
    error += "Segundo turno invalido\n";
    entregaTurno.classList.add("error");
  } else {
    entregaTurno.classList.remove("error");
  }

  // Validación accion turno

  if (objeto.accionTurnos != "Entrega") {
    error += "Entrega turno invalido\n";
    accionTurnos.classList.add("error");
  } else {
    accionTurnos.classList.remove("error");
  }

  // Validación nombres

  validarNombre();

  if (
    objeto.nombresPersonal === "" ||
    nombresPersonal.classList.contains("error")
  ) {
    error += "Nombres invalido\n";
    nombresPersonal.classList.add("error");
  } else {
    nombresPersonal.classList.remove("error");
  }
  /*   
// Validación tabla clima tarde


    error += clima.error;
    objeto.tarde = clima.out;
*/
  // Validación potencia

  if (objeto.potenciaUnidades === "") {
    error += "Potencia invalida\n";
    potenciaUnidades.classList.add("error");
  } else {
    potenciaUnidades.classList.remove("error");
  }

  // Validación reactivos

  if (objeto.reactivosUnidades === "") {
    error += "Reactivos invalidos\n";
    reactivosUnidades.classList.add("error");
  } else {
    reactivosUnidades.classList.remove("error");
  }

  // Validación Alabes U1 - U2

  if (objeto.alabesUnidadU1 === "") {
    error += "Alabes U1 invalidos\n";
    alabesUnidadU1.classList.add("error");
  } else {
    alabesUnidadU1.classList.remove("error");
  }

  if (objeto.alabesUnidadU2 === "") {
    error += "Alabes U2 invalidos\n";
    alabesUnidadU2.classList.add("error");
  } else {
    alabesUnidadU2.classList.remove("error");
  }

  // Validación filtros U1 - U2

  if (objeto.filtroUnidadU1 === "") {
    error += "Filtro U1 invalido\n";
    filtroUnidadU1.classList.add("error");
  } else {
    filtroUnidadU1.classList.remove("error");
  }

  if (objeto.filtroUnidadU2 === "") {
    error += "Filtro U2 invalido\n";
    filtroUnidadU2.classList.add("error");
  } else {
    filtroUnidadU2.classList.remove("error");
  }

  // Validación compuertas

  if (
    objeto.horaDatosCompuertas === "" ||
    objeto.horaDatosCompuertas != "06:00"
  ) {
    error += "Hora compuertas invalidas\n";
    horaDatosCompuertas.classList.add("error");
  } else {
    horaDatosCompuertas.classList.remove("error");
  }

  if (objeto.c1c4DatosCompuertas === "") {
    error += "Compuertas c1 - c4 invalidas\n";
    c1c4DatosCompuertas.classList.add("error");
  } else {
    c1c4DatosCompuertas.classList.remove("error");
  }

  if (objeto.c5c6DatosCompuertas === "") {
    error += "Compuertas c5 - c6 invalidas\n";
    c5c6DatosCompuertas.classList.add("error");
  } else {
    c5c6DatosCompuertas.classList.remove("error");
  }

  if (objeto.c7c8DatosCompuertas === "") {
    error += "Compuertas c7 - c9 invalidas\n";
    c7c8DatosCompuertas.classList.add("error");
  } else {
    c7c8DatosCompuertas.classList.remove("error");
  }

  if (objeto.c10c11DatosCompuertas === "") {
    error += "Compuerta c10 invalida\n";
    c10c11DatosCompuertas.classList.add("error");
  } else {
    c10c11DatosCompuertas.classList.remove("error");
  }

  // Validación Bitacora

  if (objeto.numBitacora === "") {
    error += "Numero de bitacora invalida\n";
    numBitacora.classList.add("error");
  } else {
    numBitacora.classList.remove("error");
  }

  // Validación Observaciones

  if (objeto.observacionesCentral === "") {
    error += "Observaciones invalidas\n";
    //observacionesCentral.classList.add("error");
    observacionesCentral.classList.add("error");
    observacionesCentral.classList.add("border-danger");
    observacionesCentral.classList.add("bg-warning");
  } else {
    //observacionesCentral.classList.remove("error");
    observacionesCentral.classList.remove("error");
    observacionesCentral.classList.remove("border-danger");
    observacionesCentral.classList.remove("bg-warning");
  }

  // Validación Azud

  if (objeto.horaAzud === "" || objeto.horaAzud != "06:00") {
    error += "Hora azud invalido\n";
    horaAzud.classList.add("error");
  } else {
    horaAzud.classList.remove("error");
  }

  // Validación Azud

  if (objeto.azud === "") {
    error += "Azud invalido\n";
    azud.classList.add("error");
  } else {
    azud.classList.remove("error");
  }

  // Validación rebosadero

  if (objeto.rebosadero === "") {
    error += "Rebosadero invalido\n";
    rebosadero.classList.add("error");
  } else {
    rebosadero.classList.remove("error");
  }

  // Error Validación Total

  if (error === "") {
    objeto.error = "Ok";
  } else {
    objeto.error = error;
  }

  // Validar la entrega del turno
  let var1 = document.getElementById("climaTabla").classList;
  let entradas = document.getElementById("myForm");

  for (let i = 0; i < entradas.length; i++) {
    if (entradas[i].classList.contains("error") || var1.contains("error")) {
      return confirm(
        "Error al entregar el turno, Complete los campos resaltados"
      );
    }
  }

  if (objeto.error === "Ok") {
    enviarDatosEntregaSegundoTurno(objeto);
  }
};
// ********************* FIN Guardar Segundo turno  **************************************************** //

// ********************* INICIO COMUNICACION CON EL BACKEND ENVIA DATOS ENTREGA PRIMER TURNO ********************** //

const enviarDatosEntregaSegundoTurno = (objeto) => {
  let dataTotal = new FormData(); // Crear el formato para enviar datos
  dataTotal.append("numBitacora", objeto.numBitacora); // Número de bitácora
  dataTotal.append("CompuertaC1C4", objeto.c1c4DatosCompuertas); // Compuertas 1 - 4
  dataTotal.append("CompuertaC5C6", objeto.c5c6DatosCompuertas); // Compuertas 5 - 6
  dataTotal.append("CompuertaC7C8C9", objeto.c7c8DatosCompuertas); // Compuertas 7 - 9
  dataTotal.append("CompuertaC10", objeto.c10c11DatosCompuertas); // Compuertas 10
  dataTotal.append("accion", objeto.accionTurnos); // Recibe turno
  dataTotal.append("alabesU1", objeto.alabesUnidadU1); // Apertura de alabes U1
  dataTotal.append("alabesU2", objeto.alabesUnidadU2); // Apertura de alabes U2
  dataTotal.append("horaEntregaPrimerTurno", objeto.horaEntregaTurno); // Hora reecibe primer turno
  dataTotal.append("potencia", objeto.potenciaUnidades); // Potencia recibe primer turno
  dataTotal.append("reactivos", objeto.reactivosUnidades); // Reactivos recibe primer turno
  dataTotal.append("nombresRecibeTurno", objeto.nombresPersonal); // Nombres personal recibe turno
  dataTotal.append("Observaciones", objeto.observacionesCentral); // Observaciones con las que recibe turno
  dataTotal.append("filtroU1", objeto.filtroUnidadU1);
  dataTotal.append("filtroU2", objeto.filtroUnidadU2);
  dataTotal.append("azud", objeto.azud);
  dataTotal.append("rebosadero", objeto.rebosadero);
  dataTotal.append("guardarTurno", "Fin");

  let xhr = new XMLHttpRequest(); // Crea objeto request
  xhr.open("POST", "./GuardarEventos/entregaSegundoTurno.php", true); // Abre comunicacion con archivo backend
  xhr.onload = function () {
    // Funcion que recibe respuesta del servidor
    location.reload(window);
  };

  xhr.send(dataTotal); // Envía datos al servidor
  return false; // Finaliza la funcion retornando false
};

// ********************* FIN COMUNICACION CON EL BACKEND ENVIA DATOS ENTREGA PRIMER TURNO ********************** //
