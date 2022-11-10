<?php  
    include ('./ObtenerNumeroBitacora.php');  

   /* print_r($_POST);
     
    echo "Numero de bitacora => ". $numBitacora."\n";
    echo "Hora de limpieza rejillas => ". $_POST['horaLimpiezaRejillas']."\n";
    echo "Opciones rejillas => ". $_POST['opcionRejillas']."\n";
     */

  include ('../conexionBaseDatos/conexionDia.php');  

  $alarma = "INSERT INTO rejilas (numBitacora, horaLimpiezaRejillas, opcionRejillas) VALUES ('".$numBitacora."','".$_POST["horaLimpiezaRejillas"]."','".$_POST["opcionRejillas"]."')"; 

  //echo $alarma;
  if(mysqli_query($conexionTurnoDia,$alarma))
  {	
    mysqli_close($conexionTurnoDia);
  }
  
  else
  {
    echo "error is ".mysqli_error($conexionTurnoDia);			
  }
?>