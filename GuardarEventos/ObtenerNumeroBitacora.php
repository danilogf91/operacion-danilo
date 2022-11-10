<?php    

  include ('../conexionBaseDatos/connexionCrearTurno.php');  

  $resultadoBaseDatos = $conexionCrearTurno -> query("SELECT * FROM crearturnodia WHERE id=(SELECT MAX(id) FROM crearturnodia)");  
 
  $fechaComparar  = date('Y')."-".date('m')."-".date('d');
  $row = $resultadoBaseDatos -> fetch_assoc();
  
  $numBitacora = $row['numeroBitacora'];
   
?>