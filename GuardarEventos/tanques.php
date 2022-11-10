<?php  
    include ('./ObtenerNumeroBitacora.php');  
/*
   //print_r($_POST);
     
    echo "Numero de bitacora => ". $numBitacora."\n";
    echo "Hora de Tanques => ". $_POST['horaLimpiezaTanques']."\n";
    echo "Opciones de tanque => ". $_POST['opcionTanque']."\n";
*/         


  include ('../conexionBaseDatos/conexionDia.php');  

  $alarma = "INSERT INTO tanques (numBitacora, horaLimpiezaTanques, opcionTanque) VALUES ('".$numBitacora."','".$_POST["horaLimpiezaTanques"]."','".$_POST["opcionTanque"]."')"; 

  if(mysqli_query($conexionTurnoDia,$alarma))
  {	
    mysqli_close($conexionTurnoDia);
  }
  
  else
  {
    echo "error is ".mysqli_error($conexionTurnoDia);			
  }
?>