<?php  
    include ('./ObtenerNumeroBitacora.php'); 
/*
   print_r($_POST);
     
    echo "Numero de bitacora => ". $numBitacora."\n";
    echo "Hora de Rio => ". $_POST['horaCondicionesRio']."\n";
    echo "Opciones de Rio => ". $_POST['opcionRio']."\n";
        
*/

  include ('../conexionBaseDatos/conexionDia.php');  

  $alarma = "INSERT INTO rio (numBitacora, horaCondicionesRio, opcionRio) VALUES ('".$numBitacora."','".$_POST["horaCondicionesRio"]."','".$_POST["opcionRio"]."')"; 

  if(mysqli_query($conexionTurnoDia,$alarma))
  {	
    mysqli_close($conexionTurnoDia);
  }
  
  else
  {
    echo "error is ".mysqli_error($conexionTurnoDia);			
  }
?>