<?php  
    include ('./ObtenerNumeroBitacora.php');  

  /*  print_r($_POST);
    echo "Numero de bitacora => ". $numBitacora."\n";
    echo "Hora de alarma => ". $_POST['horaAlarmas']."\n";
    echo "Opciones de alarma => ". $_POST['opcionAlarmasPalmira']."\n";
    echo "Observaciones => ". $_POST['observaciones']."\n";    
*/
    if($_POST['observaciones'] ==""){
        $observaciones = "vacio";
    }
    else
    {
        $observaciones = $_POST['observaciones'];
    }

  include ('../conexionBaseDatos/conexionDia.php');  

  $alarma = "INSERT INTO alarmas (numBitacora, horaAlarma, tipoAlarma, observaciones) VALUES ('".$numBitacora."','".$_POST["horaAlarmas"]."','".$_POST["opcionAlarmasPalmira"]."','".$observaciones."')"; 
  
  if(mysqli_query($conexionTurnoDia,$alarma))
  {	
 // echo "Datos Guardados ok";
  // function sendEmail();
  mysqli_close($conexionTurnoDia);
  }
  
  else
  {
  echo "error is ".mysqli_error($conexionTurnoDia);			
  }
?>