<?php

include('./conexionBaseDatos/connexionCrearTurno.php');
$resultadoBaseDatos = $conexionCrearTurno->query("SELECT * FROM crearturnodia WHERE id=(SELECT MAX(id) FROM crearturnodia)");
$row = $resultadoBaseDatos->fetch_assoc();
$fechaBasedatos = $row['fechaInicioTurno'];
$turnoCreado    = $row['turnoCreado'];
$fechaComparar = date('d') . "-" . date('m') . "-" . date('Y');
$numeroBitacora = $row['numeroBitacora'];


// Entrega primer turno

$resultadoBaseDatos = $conexionTurnoDia->query("SELECT * FROM finturnodia WHERE (numBitacora = '$numeroBitacora'  AND YEAR(event)='$yearDate') ");

$row = $resultadoBaseDatos->fetch_assoc();
$entregarPrimerTurno    = isset($row['accion']);

// Recibe segundo turno

$resultadoBaseDatos = $conexionTurnoDia->query("SELECT * FROM iniciosegundoturno WHERE (numBitacora = '$numeroBitacora'  AND YEAR(event)='$yearDate')");

$row = $resultadoBaseDatos->fetch_assoc();
$recibeSegundoTurno    = isset($row['segundoTurno']);


$valor = isset($recibeSegundoTurno);


$resultadoBaseDatos = $conexionTurnoDia->query("SELECT * FROM finturnonoche WHERE (numBitacora = '$numeroBitacora'  AND YEAR(event)='$yearDate')");

$row = $resultadoBaseDatos->fetch_assoc();

$finSegundoTurno    = isset($row['guardarTurno']);


$valor1 = isset($finSegundoTurno);

$fechaHoy = date("z") + 1;

//var_dump($fechaHoy);
//var_dump($numeroBitacora);
/*
if(intval($numeroBitacora) === $fechaHoy)
{
  echo"<h1 style='background-color: coral;'>Esta Bitácora Ya se ha creado</h1>";  
} 
else*/


//var_dump($finSegundoTurno);

// Verificar si existe el turno está cerrado, para habilitar la creación del nuevo turno
//echo "Valor $fechaComparar otro $fechaBasedatos".var_dump($fechaComparar === $fechaBasedatos);
if (($fechaComparar === $fechaBasedatos) && $turnoCreado === "Ok" && ($entregarPrimerTurno != "null" && $entregarPrimerTurno != "Entrega")) {
  echo ("<button id='buttonFinTurno' class='botonesFunciones btn btn-primary' onclick='entregarPrimerTurno(this);'>Entregar turno</button>");
  echo ("<button id='buttonGuardar' class='botonesFunciones btn btn-success' onclick='guardarEvento(this);'>Guardar Evento</button>");
} else if ($turnoCreado === "Ok" && $entregarPrimerTurno === "Entrega" && $valor === false) {
  echo "<button id='buttonRecibirSegundoTurno' class='botonesFunciones btn btn-info' onclick='RecibirSegundoTurno(this);' >Recibir Segundo Turno</button>";
} else if ($turnoCreado === "Ok" && $entregarPrimerTurno === "Entrega" && $recibeSegundoTurno === 'SegundoOk' && $finSegundoTurno === null) {
  echo ("<button id='buttonFinSegundoTurno' class='botonesFunciones btn btn-primary' onclick='entregarSegundoTurno(this);'>Entregar turno</button>");
  echo ("<button id='buttonSegundoGuardar' class='botonesFunciones btn btn-success' onclick='guardarEvento(this);'>Guardar Evento</button>");
} else if ($turnoCreado === "Ok" && $entregarPrimerTurno === "Entrega" && $recibeSegundoTurno === 'SegundoOk' && $finSegundoTurno != null) {
  echo "<button id='buttonCrearTurno' class='botonesFunciones btn btn-warning' onclick='CrearTurno(this);' >Crear Turno</button>";
  /*
    echo("<button id='buttonFinSegundoTurno' class='botonesFunciones btn btn-primary' onclick='entregarSegundoTurno(this);'>Entregar turno</button>");    
    echo("<button id='buttonSegundoGuardar' class='botonesFunciones btn btn-primary' onclick='guardarEvento(this);'>Guardar Evento</button>");  
    */
} else {
  echo "<button id='buttonCrearTurno' class='botonesFunciones btn btn-warning' onclick='CrearTurno(this);' >Crear Turno</button>";
}

mysqli_close($conexionCrearTurno);
