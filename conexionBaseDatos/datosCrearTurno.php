<?php
	include ('connexionCrearTurno.php');
    $resultadoBaseDatos = $conexionCrearTurno -> query("SELECT * FROM crearturnodia WHERE id=(SELECT MAX(id) FROM crearturnodia)");  
 
    $fechaComparar  = date('Y')."-".date('m')."-".date('d');
    $row = $resultadoBaseDatos -> fetch_assoc();
    
    $numBitacora = $row['numeroBitacora'];
    //echo $numBitacora;

    $numero = $_POST["numBitacora"];
    //$numero = 44;
    //echo $numero."<br>";
    //echo $numBitacora."<br>";
    //print_r($_POST);
   
if($numBitacora != $numero){
//echo "Numero = ".$numero;
$turnoOk = "Ok";
$sql_datos_insertados = "INSERT INTO crearturnodia (fechaInicioTurno, fechaFinTurno, horaInicioTurno, horaFinTurno, clima, numeroBitacora, horaRecibeTurno, nombres, potencia, reactivos, alabesU1, alabesU2, filtroU1, filtroU2, c1c4, c5c6, c7c9, c10, observaciones, turnoCreado, azud, rebosadero) VALUES ('".$_POST["fechaInicioTurno"]."','".$_POST["fechaFinTurno"]."','".$_POST["horaInicioTurno"]."','".$_POST["horaFinTurno"]."','".$_POST["climaDia"]."','".$_POST["numBitacora"]."','".$_POST["horaRecibePrimerTurno"]."','".$_POST["nombresRecibeTurno"]."','".$_POST["potencia"]."','".$_POST["reactivos"]."','".$_POST["alabesU1"]."','".$_POST["alabesU2"]."','".$_POST["filtroU1"]."','".$_POST["filtroU2"]."','".$_POST["CompuertaC1C4"]."','".$_POST["CompuertaC5C6"]."','".$_POST["CompuertaC7C8C9"]."','".$_POST["CompuertaC10"]."','".$_POST["Observaciones"]."','".$turnoOk."','".$_POST["azud"]."','".$_POST["rebosadero"]."')";     

 
 
        if(mysqli_query($conexionCrearTurno,$sql_datos_insertados))
        {	
            mysqli_close($conexionCrearTurno);
        }
        
        else
        {
            echo "error is ".mysqli_error($conexionCrearTurno);			
        }
}     
else
{
    mysqli_close($conexionCrearTurno);
    echo"ERROR AL CREAR TURNO";
}       
?>