<?php  

include ('./ObtenerNumeroBitacora.php');  

 /*  
   print_r($_POST);

   

    echo "Numero de bitacora => ". $numBitacora."\n";
    echo "Hora azud => ". $_POST['horaAzud']."\n";
    echo "Azud => ". $_POST['azudValor']."\n";
    echo "Rebosadero => ". $_POST['rebosaderoValor']."\n";
  */

  include ('../conexionBaseDatos/conexionDia.php');  

  $valor = "INSERT INTO azud (numBitacora, horaAzud, azudValor, rebosaderoValor) VALUES ('".$numBitacora."','".$_POST["horaAzud"]."','".$_POST["azudValor"]."','".$_POST["rebosaderoValor"]."')"; 

    if(mysqli_query($conexionTurnoDia,$valor))
    {	
      mysqli_close($conexionTurnoDia);
    }
    else
    {
      echo "error is ".mysqli_error($conexionTurnoDia);			
    } 		 
?>