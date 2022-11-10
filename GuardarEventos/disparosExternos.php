<?php  
    include ('./ObtenerNumeroBitacora.php');  

  // print_r($_POST);
     
   if($_POST['observaciones'] === ""){
    $observaciones = "vacio";
    }
    else
    {
        $observaciones = $_POST['observaciones'];
    }
/*
    echo "Numero de bitacora => ". $numBitacora."\n";
    echo "Hora de disparos externos => ". $_POST['horaDisparosExternos']."\n";
    echo "Opciones disparos externos => ". $_POST['opcionDisparosExternosPalmira']."\n";
    echo "Observaciones => ". $observaciones."\n";
        

*/
  include ('../conexionBaseDatos/conexionDia.php');  

  $alarma = "INSERT INTO disparosexternos (numBitacora, horaDisparosExternos, opcionDisparosExternosPalmira, observaciones) VALUES ('".$numBitacora."','".$_POST["horaDisparosExternos"]."','".$_POST["opcionDisparosExternosPalmira"]."','".$observaciones."')"; 

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