<?php  
    include ('./ObtenerNumeroBitacora.php');

  /* print_r($_POST);
    
   echo "Numero de bitacora => ". $numBitacora."\n";
  
   echo "Hora de flushing => ". $_POST['horaFlushing']."\n";
    echo "Opciones de agua => ". $_POST['tipoDeAgua']."\n";
     
    echo "unidadesFlushing => ". $_POST['unidadesFlushing']."\n";    
*/

  include ('../conexionBaseDatos/conexionDia.php');  

  $segundoTurno = "INSERT INTO iniciosegundoturno (numBitacora, nombresPersonal, potencia, reactivos, azudValor, rebosaderoValor, c1c4DatosCompuertas, c5c6DatosCompuertas, c7c8DatosCompuertas, c10c11DatosCompuertas, alabesCentralU1, alabesCentralU2, filtrosCentralU1, filtrosCentralU2, noche, observacionesCentral, segundoTurno) VALUES ('".$numBitacora."','".$_POST["nombresPersonal"]."','".$_POST["potencia"]."','".$_POST["reactivos"]."','".$_POST["azudValor"]."','".$_POST["rebosaderoValor"]."','".$_POST["c1c4DatosCompuertas"]."','".$_POST["c5c6DatosCompuertas"]."','".$_POST["c7c8DatosCompuertas"]."','".$_POST["c10c11DatosCompuertas"]."','".$_POST["alabesCentralU1"]."','".$_POST["alabesCentralU2"]."','".$_POST["filtrosCentralU1"]."','".$_POST["filtrosCentralU2"]."','".$_POST["noche"]."','".$_POST["observacionesCentral"]."','".$_POST["segundoTurno"]."')"; 

  
  if(mysqli_query($conexionTurnoDia,$segundoTurno))
  {	
    mysqli_close($conexionTurnoDia);
  }
  
  else
  {
    echo "error is ".mysqli_error($conexionTurnoDia);			
  }
?>