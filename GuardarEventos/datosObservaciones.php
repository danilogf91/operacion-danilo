<?php  
    include ('./ObtenerNumeroBitacora.php'); 

  /* print_r($_POST); 
    echo "Numero de bitacora => ". $numBitacora."\n";
    echo "Hora compuertas => ". $_POST['horaCompuertas']."\n";
    echo "Compuertas compuertaC1C4 => ". $_POST['compuertaC1C4']."\n";
    echo "Compuertas compuertaC5C6 => ". $_POST['compuertaC5C6']."\n";
    echo "Compuertas compuertaC7C8C9 => ". $_POST['compuertaC7C8C9']."\n";
    echo "Compuertas compuertaC10 => ". $_POST['compuertaC10']."\n";}    
  */					
  include ('../conexionBaseDatos/conexionDia.php');  

  $observaciones = "INSERT INTO observacionesdia (numBitacora, horaObservaciones, observacionesCentral) VALUES ('".$numBitacora."','".$_POST["horaObservaciones"]."','".$_POST["observacionesCentral"]."')"; 

  //echo $observaciones;

  if(mysqli_query($conexionTurnoDia,$observaciones))
  {	
    mysqli_close($conexionTurnoDia);
  }
  
  else
  {
    echo "error is ".mysqli_error($conexionTurnoDia);			
  }    
?>