<?php  
    include ('./ObtenerNumeroBitacora.php');  
/*
   //print_r($_POST);
     
   echo "Numero de bitacora => ". $numBitacora."\n";
    echo "Hora de flushing => ". $_POST['horaFlushing']."\n";
    echo "Opciones de agua => ". $_POST['tipoDeAgua']."\n";
     
    echo "unidadesFlushing => ". $_POST['unidadesFlushing']."\n";    

*/
  include ('../conexionBaseDatos/conexionDia.php');  

  $alarma = "INSERT INTO flushing (numBitacora, horaFlushing, unidadesFlushing, tipoAgua) VALUES ('".$numBitacora."','".$_POST["horaFlushing"]."','".$_POST["unidadesFlushing"]."','".$_POST["tipoDeAgua"]."')"; 

  if(mysqli_query($conexionTurnoDia,$alarma))
  {	
    mysqli_close($conexionTurnoDia);
  }
  
  else
  {
    echo "error is ".mysqli_error($conexionTurnoDia);			
  }
?>