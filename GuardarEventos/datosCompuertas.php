<?php  
    include ('ObtenerNumeroBitacora.php');  
/*
   print_r($_POST);
   
    echo "Numero de bitacora => ". $numBitacora."\n";
    echo "Hora compuertas => ". $_POST['horaCompuertas']."\n";
    echo "Compuertas compuertaC1C4 => ". $_POST['compuertaC1C4']."\n";
    echo "Compuertas compuertaC5C6 => ". $_POST['compuertaC5C6']."\n";
    echo "Compuertas compuertaC7C8C9 => ". $_POST['compuertaC7C8C9']."\n";
    echo "Compuertas compuertaC10 => ". $_POST['compuertaC10']."\n";
    
     */   
    					
  include ('../conexionBaseDatos/conexionDia.php');  

  $alarma = "INSERT INTO compuertas (numBitacora, horaCompuertas, compuertaC1C4, compuertaC5C6, compuertaC7C8C9, compuertaC10) VALUES ('".$numBitacora."','".$_POST["horaCompuertas"]."','".$_POST["compuertaC1C4"]."','".$_POST["compuertaC5C6"]."','".$_POST["compuertaC7C8C9"]."','".$_POST["compuertaC10"]."')"; 

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