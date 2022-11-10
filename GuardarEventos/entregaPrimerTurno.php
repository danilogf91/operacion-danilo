<?php  
    include ('./ObtenerNumeroBitacora.php');  
  /*
   print_r($_POST); 
 
 
    echo "Numero de bitacora => ". $numBitacora."\n";
    echo "Hora compuertas => ". $_POST['horaCompuertas']."\n";
    echo "Compuertas compuertaC1C4 => ". $_POST['compuertaC1C4']."\n";
    echo "Compuertas compuertaC5C6 => ". $_POST['compuertaC5C6']."\n";
    echo "Compuertas compuertaC7C8C9 => ". $_POST['compuertaC7C8C9']."\n";
    echo "Compuertas compuertaC10 => ". $_POST['compuertaC10']."\n";}    
  	*/			
  include ('../conexionBaseDatos/conexionDia.php');  

  $finTurnoDia = "INSERT INTO finturnodia (numBitacora, alabesU1, alabesU2, potencia, reactivos, filtroU1, filtroU2, nombresRecibeTurno, CompuertaC1C4, CompuertaC5C6, CompuertaC7C8C9, CompuertaC10, horaEntregaPrimerTurno, accion, guardarTurno, Observaciones, azud, rebosadero, clima) VALUES ('".$numBitacora."','".$_POST["alabesU1"]."','".$_POST["alabesU2"]."','".$_POST["potencia"]."','".$_POST["reactivos"]."','".$_POST["filtroU1"]."','".$_POST["filtroU2"]."','".$_POST["nombresRecibeTurno"]."','".$_POST["CompuertaC1C4"]."','".$_POST["CompuertaC5C6"]."','".$_POST["CompuertaC7C8C9"]."','".$_POST["CompuertaC10"]."','".$_POST["horaEntregaPrimerTurno"]."','".$_POST["accion"]."','".$_POST["guardarTurno"]."','".$_POST["Observaciones"]."','".$_POST["azud"]."','".$_POST["rebosadero"]."','".$_POST["clima"]."')"; 
	

  //echo $finTurnoDia;

  if(mysqli_query($conexionTurnoDia,$finTurnoDia))
  {	
    mysqli_close($conexionTurnoDia);
  }
  
  else
  {
    echo "error is ".mysqli_error($conexionTurnoDia);			
  }	 
?>