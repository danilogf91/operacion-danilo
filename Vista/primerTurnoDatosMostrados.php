<?php  
 // echo "<table>";
 // echo "<tr>";
 
  // echo("<div class='row'>");
  // echo("<div class='col-6'>");
  // echo("<div class='card' >");
  // echo("<img class='card-img-top' src='...' alt='Card image cap'>");
  // echo("<div class='card-body'>");
  // echo("<h5 class='card-title'>Card title</h5>");
  // echo("<p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>");
  // echo("<a href='#' class='btn btn-primary'>Go somewhere</a>");
  // echo("</div>");
  // echo("</div>");
  // echo("</div>");

  // echo("<div class='col-6'>");
  // echo("<div class='card'>");
  // echo("<img class='card-img-top' src='...' alt='Card image cap'>");
  // echo("<div class='card-body'>");
  // echo("<h5 class='card-title'>Card title</h5>");
  // echo("<p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>");
  // echo("<a href='#' class='btn btn-primary'>Go somewhere</a>");
  // echo("</div>");
  // echo("</div>");
  // echo("</div>");
  // echo("</div>");

  $year = Date('Y');

  include ('./conexionBaseDatos/conexionDia.php');  
$resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM alarmas WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaAlarma $orden");  
$resultado1 = $conexionTurnoDia -> query("SELECT * FROM alarmas WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaAlarma $orden");  

$count = 0;
while($fila = $resultado1 -> fetch_assoc())
{	      
  if(($fila['horaAlarma'] >= "06:00" && $fila['horaAlarma'] <= "18:00"))
  { 						
    $count++;    
  } 
} 
    
  
  if(!($resultadoBaseDatos ->num_rows) <= 0 && $count >= 1){
   // echo"<td>";

    echo "<h4>Alarmas</h4>";  
    echo "<ul>";
    while($row = $resultadoBaseDatos -> fetch_assoc())
    {	      
      if($row['observaciones'] === "vacio"){
        $observaciones = "";
      }	
      else
      {
        $observaciones = "=> ".$row['observaciones'];
      }	

      if($row['horaAlarma'] >= "06:00" && $row['horaAlarma'] <= "18:00")
      { 															
        echo "<li style='text-align:left;'>".$row['horaAlarma']." ".$row['tipoAlarma']." ".$observaciones."</li>";       
      }  
      else
      {        
        //echo "<li style='text-align:left; background: #e0e6e7;'>"."noche => ".$row['horaAlarma']." ".$row['tipoAlarma']." ".$observaciones."</li>";           
      }																      
    } 

    echo "</ul>";
   // echo"</td>";
  }

  $resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM flushing WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaFlushing $orden");  
  $resultado1 = $conexionTurnoDia -> query("SELECT * FROM flushing WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaFlushing $orden");  

  $count = 0;
  while($fila = $resultado1 -> fetch_assoc())
  {	      
    if(($fila['horaFlushing'] >= "06:00" && $fila['horaFlushing'] <= "18:00"))
    { 						
      $count++;    
    } 
  } 
      
    
  if(!($resultadoBaseDatos ->num_rows) <= 0 && $count >= 1){
    echo"<td>";
    echo "<h4>Flushing</h4>";  
      echo "<ul>";
        while($row = $resultadoBaseDatos -> fetch_assoc())
        {	      
          if($row['horaFlushing'] >= "06:00" && $row['horaFlushing'] <= "18:00")
          {      
            echo "<li style='text-align:left;'>".$row['horaFlushing']." ".$row['unidadesFlushing'].", Agua: ".$row['tipoAgua']."</li>";             
          } 
          else
          {
            //echo "<li style='text-align:left; background: #e0e6e7;'>"."noche => ".$row['horaFlushing']." ".$row['unidadesFlushing']." ".$row['tipoAgua']."</li>";                       
          }     
        }

      echo "</ul>";
    echo"</td>";
  }

  $resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM rejilas WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaLimpiezaRejillas $orden");  
  $resultado1 = $conexionTurnoDia -> query("SELECT * FROM rejilas WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaLimpiezaRejillas $orden");  
  
  $count = 0;
  while($fila = $resultado1 -> fetch_assoc())
  {	      
    if(($fila['horaLimpiezaRejillas'] >= "06:00" && $fila['horaLimpiezaRejillas'] <= "18:00"))
    { 						
      $count++;    
    } 
  } 
      
    
  if(!($resultadoBaseDatos ->num_rows) <= 0 && $count >= 1){
    echo"<td>";
    echo "<h4>Rejillas</h4>";  
      echo "<ul>";
        while($row = $resultadoBaseDatos -> fetch_assoc())
        {	         
          if($row['horaLimpiezaRejillas'] >= "06:00" && $row['horaLimpiezaRejillas'] <= "18:00")
          { 	
            echo "<li style='text-align:left;'>".$row['horaLimpiezaRejillas']." ".$row['opcionRejillas']."</li>";             
          }  
          else
          {        
            //echo "<li style='text-align:left; background: #e0e6e7;'>"."Noche => ".$row['horaLimpiezaRejillas']." ".$row['opcionRejillas']."</li>";                         
          }																      
        }

      echo "</ul>";
    echo"</td>";
  }

  $resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM tanques WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaLimpiezaTanques $orden");  
  $resultado1 = $conexionTurnoDia -> query("SELECT * FROM tanques WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaLimpiezaTanques $orden");  
  
  $count = 0;
  while($fila = $resultado1 -> fetch_assoc())
  {	      
    if(($fila['horaLimpiezaTanques'] >= "06:00" && $fila['horaLimpiezaTanques'] <= "18:00"))
    { 						
      $count++;    
    } 
  } 
      
    
  if(!($resultadoBaseDatos ->num_rows) <= 0 && $count >= 1){
    echo"<td>";
    echo "<h4>Tanques</h4>";  
      echo "<ul>";

        while($row = $resultadoBaseDatos -> fetch_assoc())
        {	         
          if($row['horaLimpiezaTanques'] >= "06:00" && $row['horaLimpiezaTanques'] <= "18:00")
          { 	
            echo "<li style='text-align:left;'>".$row['horaLimpiezaTanques']." ".$row['opcionTanque']."</li>"; 
          }  
          else
          {        
            //echo "<li style='text-align:left; background: #e0e6e7;'>"."Noche => ".$row['horaLimpiezaTanques']." ".$row['opcionTanque']."</li>"; 
          }																      
        }        
      echo "</ul>";
    echo"</td>";
  }  
 
  $resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM rio WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaCondicionesRio $orden");  
  $resultado1 = $conexionTurnoDia -> query("SELECT * FROM rio WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaCondicionesRio $orden");  
  $count = 0;
  while($fila = $resultado1 -> fetch_assoc())
  {	      
    if(($fila['horaCondicionesRio'] >= "06:00" && $fila['horaCondicionesRio'] <= "18:00"))
    { 						
      $count++;    
    } 
  } 
      
    
  if(!($resultadoBaseDatos ->num_rows) <= 0 && $count >= 1){
    echo"<td>";
    echo "<h4>R??o</h4>";  
      echo "<ul>";
        while($row = $resultadoBaseDatos -> fetch_assoc())
        {																		         
          if($row['horaCondicionesRio'] >= "06:00" && $row['horaCondicionesRio'] <= "18:00")
          { 	
            echo "<li style='text-align:left;'>".$row['horaCondicionesRio']." ".$row['opcionRio']."</li>"; 
          }  
          else
          {        
            //echo "<li style='text-align:left; background: #e0e6e7;'>".$row['horaCondicionesRio']." ".$row['opcionRio']."</li>"; 
          }		
        }  

      echo "</ul>";
    echo"</td>";
  } 

  // fila 2
  echo "<tr>";

  $resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM disparosinternos WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaDisparosInternos $orden");  
  $resultado1 = $conexionTurnoDia -> query("SELECT * FROM disparosinternos WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaDisparosInternos $orden");  
  $count = 0;
  while($fila = $resultado1 -> fetch_assoc())
  {	      
    if(($fila['horaDisparosInternos'] >= "06:00" && $fila['horaDisparosInternos'] <= "18:00"))
    { 						
      $count++;    
    } 
  } 
      
    
  if(!($resultadoBaseDatos ->num_rows) <= 0 && $count >= 1){
    echo"<td>";
    echo "<h4>Disparos Internos</h4>";  
    echo "<ul>";
    while($row = $resultadoBaseDatos -> fetch_assoc())
    {				
      if($row['observaciones'] === "vacio"){
        $observaciones = "";
      }	
      else
      {
        $observaciones = "=> ".$row['observaciones'];
      }	

      if($row['horaDisparosInternos'] >= "06:00" && $row['horaDisparosInternos'] <= "18:00")
      { 	
        echo "<li style='text-align:left;'>".$row['horaDisparosInternos']." ".$row['opcionDisparosInternosPalmira']." ".$observaciones."</li>"; 
      }  
      else
      {        
        //echo "<li style='text-align:left; background: #e0e6e7;'>"."Noche => ".$row['horaDisparosInternos']." ".$row['opcionDisparosInternosPalmira']." ".$observaciones."</li>"; 
      }	      
    }  
    echo "</ul>";
    echo"</td>";
  }   


  $resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM disparosexternos WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaDisparosExternos $orden");  
  $resultado1 = $conexionTurnoDia -> query("SELECT * FROM disparosexternos WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaDisparosExternos $orden");  
  $count = 0;
  while($fila = $resultado1 -> fetch_assoc())
  {	      
    if(($fila['horaDisparosExternos'] >= "06:00" && $fila['horaDisparosExternos'] <= "18:00"))
    { 						
      $count++;    
    } 
  } 
      
  //var_dump($resultado1);
    
  if(!($resultadoBaseDatos ->num_rows) <= 0 && $count >= 1){
    echo"<td>";
    echo "<h4>Disparos Externos</h4>";  
    echo "<ul>";
    while($row = $resultadoBaseDatos -> fetch_assoc())
    {				
      if($row['observaciones'] === "vacio"){
        $observaciones = "";
      }	
      else
      {
        $observaciones = "=> ".$row['observaciones'];
      }	

      if($row['horaDisparosExternos'] >= "06:00" && $row['horaDisparosExternos'] <= "18:00")
      { 	
        echo "<li style='text-align:left;'>".$row['horaDisparosExternos']." ".$row['opcionDisparosExternosPalmira']." ".$observaciones."</li>"; 
      }  
      else
      {        
        //echo "<li style='text-align:left; background: #e0e6e7;'>"."Noche => ".$row['horaDisparosExternos']." ".$row['opcionDisparosExternosPalmira']." ".$observaciones."</li>"; 
      }		      
    }  
    echo "</ul>";
    echo"</td>";
  }   

  $resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM compuertas WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaCompuertas $orden");  
  $resultado1 = $conexionTurnoDia -> query("SELECT * FROM compuertas WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaCompuertas $orden");  
  $count = 0;
  while($fila = $resultado1 -> fetch_assoc())
  {	      
    if(($fila['horaCompuertas'] >= "06:00" && $fila['horaCompuertas'] <= "18:00"))
    { 						
      $count++;    
    } 
  } 
      
    
  if(!($resultadoBaseDatos ->num_rows) <= 0 && $count >= 1){
    echo"<td colspan='2'>";
    echo "<h4>Compuertas</h4>";  
    echo "<ul>";
    while($row = $resultadoBaseDatos -> fetch_assoc())
    {	      
      if($row['horaCompuertas'] >= "06:00" && $row['horaCompuertas'] <= "18:00")
      {      
        echo "<li style='text-align:left;'>".$row['horaCompuertas']." Comp 1-4 = ".$row['compuertaC1C4']." cm, Comp 5-6 = ".$row['compuertaC5C6']." cm, Comp 7-9 = ".$row['compuertaC7C8C9']." cm, Comp 10 = ".$row['compuertaC10']." cm"."</li>"; 
      } 
      else
      {
        //echo "<li style='text-align:left; background: #e0e6e7;'>"."noche => ".$row['horaCompuertas']." Comp 1-4 = ".$row['compuertaC1C4']."  Comp 5-6 = ".$row['compuertaC5C6']."  Comp 7-9 = ".$row['compuertaC7C8C9']."  Comp 10 = ".$row['compuertaC10']." "."</li>"; 
      }     
    }      
    echo "</ul>";
    echo"</td>";
  }  

  $resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM azud WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaAzud $orden");      
  $resultado1 = $conexionTurnoDia -> query("SELECT * FROM azud WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaAzud $orden");      
  $count = 0;
  while($fila = $resultado1 -> fetch_assoc())
  {	      
    if(($fila['horaAzud'] >= "06:00" && $fila['horaAzud'] <= "18:00"))
    { 						
      $count++;    
    } 
  } 
      
    
  if(!($resultadoBaseDatos ->num_rows) <= 0 && $count >= 1){  
    echo"<td>";
    echo "<h4>Azud</h4>";  
    echo "<ul>";
    while($row = $resultadoBaseDatos -> fetch_assoc())
    {				
      if($row['horaAzud'] >= "06:00" && $row['horaAzud'] <= "18:00")
      { 	
        echo "<li style='text-align:left;'>".$row['horaAzud']." Azud = ".$row['azudValor']." cm, Rebosadero = ".$row['rebosaderoValor']." cm</li>"; 
      }  
      else
      {        
        //echo "<li style='text-align:left; background: #e0e6e7;'>"."Noche => ".$row['horaAzud']." Azud = ".$row['azudValor']."  Rebosadero = ".$row['rebosaderoValor']."</li>"; 
      }	
    }  
    echo "</ul>";
    echo"</td>";
  }

  echo "</tr>";

   
  $resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM observacionesdia WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaObservaciones $orden ");  
  $resultado1 = $conexionTurnoDia-> query("SELECT * FROM observacionesdia WHERE (numBitacora = '$numeroBitacora' AND YEAR(event)='$year') ORDER BY horaObservaciones $orden ");  
  $count = 0;
      
    while($fila = $resultadoBaseDatos -> fetch_assoc())
    {	      
      if(($fila['horaObservaciones'] >= "06:00" && $fila['horaObservaciones'] <= "18:00"))
      { 						
        $count++;    
      }       
    } 
       
    
    if(!($resultado1 ->num_rows) <= 0 && $count >= 1)
    { 
      echo "<tr>";
      echo"<td colspan='5'>";
      echo "<h4>Observaciones del turno</h4>";     
      echo "<ul>";

      while($row = $resultado1 -> fetch_assoc())
      {				        
        if($row['horaObservaciones'] >= "06:00" && $row['horaObservaciones'] <= "18:00")
        { 	
          echo "<li style='text-align:left;'>".$row['horaObservaciones']." => ".$row['observacionesCentral'] ."</li>";           
        }  
        else
        {        
          //echo "<li style='text-align:left; background: #e0e6e7;'>"."Noche => ".$row['horaObservaciones']." => ".$row['observacionesCentral'] ."</li>";           
        }	
      }  
      echo "</ul>";
      echo "</td>";
      echo "</tr>";
    }

mysqli_close($conexionTurnoDia);									
//echo "</tr>";
//echo "</table>";
?>