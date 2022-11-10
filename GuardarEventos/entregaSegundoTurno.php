<?php  
include ('./ObtenerNumeroBitacora.php');  
/*
   print_r($_POST); 
*/		

  include ('../conexionBaseDatos/conexionDia.php');  

  $finTurnoNoche = "INSERT INTO finturnonoche (numBitacora, alabesU1, alabesU2, potencia, reactivos, filtroU1, filtroU2, nombresRecibeTurno, CompuertaC1C4, CompuertaC5C6, CompuertaC7C8C9, CompuertaC10, horaEntregaPrimerTurno, accion, guardarTurno, Observaciones, azud, rebosadero) VALUES ('".$numBitacora."','".$_POST["alabesU1"]."','".$_POST["alabesU2"]."','".$_POST["potencia"]."','".$_POST["reactivos"]."','".$_POST["filtroU1"]."','".$_POST["filtroU2"]."','".$_POST["nombresRecibeTurno"]."','".$_POST["CompuertaC1C4"]."','".$_POST["CompuertaC5C6"]."','".$_POST["CompuertaC7C8C9"]."','".$_POST["CompuertaC10"]."','".$_POST["horaEntregaPrimerTurno"]."','".$_POST["accion"]."','".$_POST["guardarTurno"]."','".$_POST["Observaciones"]."','".$_POST["azud"]."','".$_POST["rebosadero"]."')"; 

  if(mysqli_query($conexionTurnoDia,$finTurnoNoche))
  {	
    mysqli_close($conexionTurnoDia);
  }
  
  else
  {
    echo "error is ".mysqli_error($conexionTurnoDia);			
  }	 
?>