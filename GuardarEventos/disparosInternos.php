<?php  
    include ('./ObtenerNumeroBitacora.php'); 
/*
   print_r($_POST);
     
    echo "Numero de bitacora => ". $numBitacora."\n";
    echo "Hora de disparos internos => ". $_POST['horaDisparosInternos']."\n";
    echo "Opciones disparos internos => ". $_POST['opcionDisparosInternosPalmira']."\n";
    echo "Observaciones => ". $_POST['observaciones']."\n";
        */
    if($_POST['observaciones'] === ""){
        $observaciones = "vacio";
    }
    else
    {
        $observaciones = $_POST['observaciones'];
    }

  include ('../conexionBaseDatos/conexionDia.php');  

  $alarma = "INSERT INTO disparosinternos (numBitacora, horaDisparosInternos, opcionDisparosInternosPalmira, observaciones) VALUES ('".$numBitacora."','".$_POST["horaDisparosInternos"]."','".$_POST["opcionDisparosInternosPalmira"]."','".$observaciones."')"; 

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