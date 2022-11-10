<?php  
    //print_r($_POST);
   
  include ('../conexionBaseDatos/conexionDia.php');    
  include ('../Funciones/Funciones.php');   
 
  
  // $year = Date('Y');
  $id = $_POST['id'];
  $fechaB = $_POST['fecha'];
  $year = substr($fechaB, -4);
  //echo($year);
//$id = 172;
//$fechaB = '21-06-2022';


  /* consulta bases de datos */

  $resultadoBaseDatosFinal = $conexionTurnoDia  -> query("SELECT * FROM crearturnodia WHERE (numeroBitacora = '$id' AND YEAR(event)='$year' AND fechaInicioTurno = '$fechaB') ");      
  $rowA = $resultadoBaseDatosFinal -> fetch_assoc(); 

  $resultadoBaseDatos1 = $conexionTurnoDia      -> query("SELECT * FROM finturnodia WHERE numBitacora = '$id' AND YEAR(event)='$year'");      
  $row1 = $resultadoBaseDatos1 -> fetch_assoc();

  $resultadoBaseDatos2 = $conexionTurnoDia      -> query("SELECT * FROM iniciosegundoturno WHERE numBitacora = '$id' AND YEAR(event)='$year'");      
  $row2 = $resultadoBaseDatos2 -> fetch_assoc();

  $resultadoBaseDatos3 = $conexionTurnoDia      -> query("SELECT * FROM finturnonoche WHERE numBitacora = '$id' AND YEAR(event)='$year'");      
  $row3 = $resultadoBaseDatos3 -> fetch_assoc();

// Como ordenar las peticiones
$orden = "ASC";

// Inicio Alarmas

  $resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM alarmas WHERE (numBitacora = '$id' AND YEAR(event)='$year') ORDER BY horaAlarma $orden");  
  $resultado1 = $resultadoBaseDatos;
  
  $alarmasPrimerTurno = array();
  $alarmasSegundoTurno = array();


  while($filaAlarma = $resultado1 -> fetch_assoc())
  {	      
    if(($filaAlarma['horaAlarma'] >= "06:00" && $filaAlarma['horaAlarma'] <= "18:00"))
    { 						

      array_push($alarmasPrimerTurno, ['horaAlarma' => $filaAlarma['horaAlarma'], 'tipoAlarma'=> $filaAlarma['tipoAlarma'], 
      'observaciones'=> $filaAlarma['observaciones']]); 
    } 
    else
    {
        array_push($alarmasSegundoTurno, ['horaAlarma' => $filaAlarma['horaAlarma'], 'tipoAlarma'=> $filaAlarma['tipoAlarma'], 
        'observaciones'=> $filaAlarma['observaciones']]); 
    }
  } 

// Fin alarmas

// Inicio flushing
  $resultadoflushing = $conexionTurnoDia -> query("SELECT * FROM flushing WHERE (numBitacora = '$id' AND YEAR(event)='$year') ORDER BY horaFlushing $orden");  
  $resultado1 = $resultadoflushing;

  $flushingPrimerTurno = array();
  $flushingSegundoTurno = array();

  while($fila = $resultado1 -> fetch_assoc())
  {	      
    if(($fila['horaFlushing'] >= "06:00" && $fila['horaFlushing'] <= "18:00"))
    { 						
       array_push($flushingPrimerTurno, ['horaFlushing' => $fila['horaFlushing'], 'unidadesFlushing'=> $fila['unidadesFlushing'], 
      'tipoAgua'=> $fila['tipoAgua']]);
    } 
    else
    {
       array_push($flushingSegundoTurno, ['horaFlushing' => $fila['horaFlushing'], 'unidadesFlushing'=> $fila['unidadesFlushing'], 
      'tipoAgua'=> $fila['tipoAgua']]);
    }

  } 


// Fin Flushing


// Inicio limpieza rejillas

  $resultadoBaseDatosRejilas = $conexionTurnoDia -> query("SELECT * FROM rejilas WHERE (numBitacora = '$id' AND YEAR(event)='$year') ORDER BY horaLimpiezaRejillas $orden");  
  $resultadoA = $resultadoBaseDatosRejilas;
  
  $limpiezaRejillasPrimerTurno = array();
  $limpiezaRejillasSegundoTurno = array();
  
  while($rejillas = $resultadoA -> fetch_assoc())
  {	     
    if(($rejillas['horaLimpiezaRejillas'] >= "06:00" && $rejillas['horaLimpiezaRejillas'] <= "18:00"))
    {         
        array_push($limpiezaRejillasPrimerTurno, ['horaLimpiezaRejillas' => $rejillas['horaLimpiezaRejillas'],
        'opcionRejillas'=> $rejillas['opcionRejillas']]);
    }
    else
    {
        array_push($limpiezaRejillasSegundoTurno, ['horaLimpiezaRejillas' => $rejillas['horaLimpiezaRejillas'],
        'opcionRejillas'=> $rejillas['opcionRejillas']]);
    } 
  }

// Fin limpieza rejillas

// Inicio limpieza tanques

  $resultadoBaseDatosTanques = $conexionTurnoDia -> query("SELECT * FROM tanques WHERE (numBitacora = '$id' AND YEAR(event)='$year') ORDER BY horaLimpiezaTanques $orden");  
  $resultado1 = $resultadoBaseDatosTanques;
  

  $limpiezaTanquesPrimerTurno = array();
  $limpiezaTanquesSegundoTurno = array();
  
  while($tanque = $resultado1 -> fetch_assoc())
  {	      
    if(($tanque['horaLimpiezaTanques'] >= "06:00" && $tanque['horaLimpiezaTanques'] <= "18:00"))
    { 						
        array_push($limpiezaTanquesPrimerTurno, ['horaLimpiezaTanques' => $tanque['horaLimpiezaTanques'],
        'opcionTanque'=> $tanque['opcionTanque']]);
    } 
    else
    {
        array_push($limpiezaTanquesSegundoTurno, ['horaLimpiezaTanques' => $tanque['horaLimpiezaTanques'],
        'opcionTanque'=> $tanque['opcionTanque']]);       
    }
  } 

//var_dump($limpiezaTanquesPrimerTurno);

// Fin limpieza tanques


// Inicio limpieza rio

$resultadoBaseDatosRio = $conexionTurnoDia -> query("SELECT * FROM rio WHERE (numBitacora = '$id' AND YEAR(event)='$year') ORDER BY horaCondicionesRio $orden");  
$resultado1 = $resultadoBaseDatosRio;

$rioPrimerTurno = array();
$rioSegundoTurno = array();

while($rio = $resultado1 -> fetch_assoc())
{	      
  if(($rio['horaCondicionesRio'] >= "06:00" && $rio['horaCondicionesRio'] <= "18:00"))
  {         
    array_push($rioPrimerTurno, ['horaCondicionesRio' => $rio['horaCondicionesRio'],
    'opcionRio'=> $rio['opcionRio']]);						
  } 
  else
  {         
    array_push($rioSegundoTurno, ['horaCondicionesRio' => $rio['horaCondicionesRio'],
    'opcionRio'=> $rio['opcionRio']]);						
  } 
} 

// Fin limpieza rio


// Inicio disparos internos

$resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM disparosinternos WHERE (numBitacora = '$id' AND YEAR(event)='$year') ORDER BY horaDisparosInternos $orden");      
$disparosInternosPrimerTurno = array();
$disparosInternosSegundoTurno = array();

  if(!($resultadoBaseDatos ->num_rows) <= 0){
    while($row = $resultadoBaseDatos -> fetch_assoc())
    {				
      if($row['observaciones'] === "vacio"){
        $observaciones = "";
      }	
      else
      {
        $observaciones = $row['observaciones'];
      }	

      if($row['horaDisparosInternos'] >= "06:00" && $row['horaDisparosInternos'] <= "18:00")
      { 	
        array_push($disparosInternosPrimerTurno, ['horaDisparosInternos' => $row['horaDisparosInternos'],
        'opcionDisparosInternosPalmira'=> $row['opcionDisparosInternosPalmira'], 'observaciones' => $observaciones]);
      }       
      else
      { 	
        array_push($disparosInternosSegundoTurno, ['horaDisparosInternos' => $row['horaDisparosInternos'],
        'opcionDisparosInternosPalmira'=> $row['opcionDisparosInternosPalmira'], 'observaciones' => $observaciones]);
      }  
    }  

  }   

// Fin disparos internos

// Inicio disparos externos

$resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM disparosexternos WHERE (numBitacora = '$id' AND YEAR(event)='$year') ORDER BY horaDisparosExternos $orden");  
$disparosExternosPrimerTurno = array();
$disparosExternosSegundoTurno = array();

  if(!($resultadoBaseDatos ->num_rows) <= 0){

    while($row = $resultadoBaseDatos -> fetch_assoc())
    {				
      if($row['observaciones'] === "vacio"){
        $observaciones = "";
      }	
      else
      {
        $observaciones = $row['observaciones'];
      }	

      if($row['horaDisparosExternos'] >= "06:00" && $row['horaDisparosExternos'] <= "18:00")
      { 	
        array_push($disparosExternosPrimerTurno, ['horaDisparosExternos' => $row['horaDisparosExternos'],
        'opcionDisparosExternosPalmira'=> $row['opcionDisparosExternosPalmira'], 'observaciones' => $observaciones]);
      }  
      else
      { 	
        array_push($disparosExternosSegundoTurno, ['horaDisparosExternos' => $row['horaDisparosExternos'],
        'opcionDisparosExternosPalmira'=> $row['opcionDisparosExternosPalmira'], 'observaciones' => $observaciones]);
      }  	      
    }  

  }    

// Fin disparos externos


// Inicio compuertas


$resultadoBaseDatosCompuertas = $conexionTurnoDia -> query("SELECT * FROM compuertas WHERE (numBitacora = '$id' AND YEAR(event)='$year') ORDER BY horaCompuertas $orden");  

$compuertasPrimerTurno = array();
$compuertasSegundoTurno = array();

if(!($resultadoBaseDatosCompuertas ->num_rows) <= 0){

    while($row = $resultadoBaseDatosCompuertas -> fetch_assoc())
    {	      
        if($row['horaCompuertas'] >= "06:00" && $row['horaCompuertas'] <= "18:00")
        {      
          array_push($compuertasPrimerTurno, ['horaCompuertas' => $row['horaCompuertas'], 'compuertaC1C4' => $row['compuertaC1C4'],
          'compuertaC5C6' => $row['compuertaC5C6'], 'compuertaC7C8C9' => $row['compuertaC7C8C9'],'compuertaC10' => $row['compuertaC10']]);        
        } 
        else
        { 	
          array_push($compuertasSegundoTurno, ['horaCompuertas' => $row['horaCompuertas'], 'compuertaC1C4' => $row['compuertaC1C4'],
          'compuertaC5C6' => $row['compuertaC5C6'], 'compuertaC7C8C9' => $row['compuertaC7C8C9'],'compuertaC10' => $row['compuertaC10']]); 
        }  
    } 
}
// Fin compuertas



// Inicio azud

$resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM azud WHERE (numBitacora = '$id' AND YEAR(event)='$year') ORDER BY horaAzud $orden");      
$azudPrimerTurno = array();
$azudSegundoTurno = array();

  if(!($resultadoBaseDatos ->num_rows) <= 0 ){  

    while($row = $resultadoBaseDatos -> fetch_assoc())
    {				
      if($row['horaAzud'] >= "06:00" && $row['horaAzud'] <= "18:00")
      { 	
        array_push($azudPrimerTurno, ['horaAzud' => $row['horaAzud'], 'azudValor' => $row['azudValor'],
        'rebosaderoValor' => $row['rebosaderoValor']]); 
      } 
      else
      { 	
        array_push($azudSegundoTurno, ['horaAzud' => $row['horaAzud'], 'azudValor' => $row['azudValor'],
        'rebosaderoValor' => $row['rebosaderoValor']]); 
      }   
    }
}

// Fin azud



$resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM observacionesdia WHERE (numBitacora = '$id' AND YEAR(event)='$year') ORDER BY horaObservaciones $orden ");  

    $observacionesPrimerTurno = array();
    $observacionesSegundoTurno = array();

    if(!($resultadoBaseDatos ->num_rows) <= 0)
    { 

      while($row = $resultadoBaseDatos -> fetch_assoc())
      {				
        if($row['horaObservaciones'] >= "06:00" && $row['horaObservaciones'] <= "18:00")
        { 	
            array_push($observacionesPrimerTurno, ['horaObservaciones' => $row['horaObservaciones'], 
            'observacionesCentral' => $row['observacionesCentral']]);           
        } 
        else
        { 	
          array_push($observacionesSegundoTurno, ['horaObservaciones' => $row['horaObservaciones'], 
          'observacionesCentral' => $row['observacionesCentral']]); 
        }  
      }
    }


if(($resultadoBaseDatosFinal ->num_rows) > 0){  

    $numeroBitacora = $rowA['numeroBitacora'];
    $fechaInicioTurno = $rowA['fechaInicioTurno'];

    $inicioPrimerTurno = array('numBitacora' => $numeroBitacora, 'fechaIniTurno' => $rowA['fechaInicioTurno'],
    'fechaFinTurno' => $rowA['fechaFinTurno'], 'nombres' => nombresFormato($rowA['nombres']), 'alabesU1' => $rowA['alabesU1'],
    'alabesU2' => $rowA['alabesU2'], 'potencia' => $rowA['potencia'], 'reactivos' => $rowA['reactivos'], 
    'Clima' => $rowA['clima'], 'compC1C4' => $rowA['c1c4'], 'compC5C6' => $rowA['c5c6'], 'compC7C9' => $rowA['c7c9'],
    'compC10'=> $rowA['c10'], 'Azud' => $rowA['azud'], 'Rebosadero' => $rowA['rebosadero'], 'filtroU1' => $rowA['filtroU1'],
    'filtroU2' => $rowA['filtroU2'],'Observaciones' => $rowA['observaciones']);  
    
    $finPrimerTurno = array('nombres' => nombresFormato($row1['nombresRecibeTurno']),'alabesU1' => $row1['alabesU1'],
    'alabesU2' => $row1['alabesU2'], 'potencia' => $row1['potencia'], 'reactivos' => $row1['reactivos'], 
    'Clima' => $row1['clima'], 'compC1C4' => $row1['CompuertaC1C4'], 'compC5C6' => $row1['CompuertaC5C6'], 'compC7C9' => $row1['CompuertaC7C8C9'],
    'compC10'=> $row1['CompuertaC10'], 'Azud' => $row1['azud'], 'Rebosadero' => $row1['rebosadero'], 'filtroU1' => $row1['filtroU1'],
    'filtroU2' => $row1['filtroU2'],'Observaciones' => $row1['Observaciones']);
    
    $inicioSegundoTurno = array('nombres' => nombresFormato($row2['nombresPersonal']),'alabesU1' => $row2['alabesCentralU1'],
    'alabesU2' => $row2['alabesCentralU2'], 'potencia' => $row2['potencia'], 'reactivos' => $row2['reactivos'], 
    'Clima' => $row2['noche'], 'compC1C4' => $row2['c1c4DatosCompuertas'], 'compC5C6' => $row2['c5c6DatosCompuertas'], 'compC7C9' => $row2['c7c8DatosCompuertas'],
    'compC10'=> $row2['c10c11DatosCompuertas'], 'Azud' => $row2['azudValor'], 'Rebosadero' => $row2['rebosaderoValor'], 'filtroU1' => $row2['filtrosCentralU1'],
    'filtroU2' => $row2['filtrosCentralU2'],'Observaciones' => $row2['observacionesCentral']);

    $finSegundoTurno = array('nombres' => nombresFormato($row3['nombresRecibeTurno']),'alabesU1' => $row3['alabesU1'],
    'alabesU2' => $row3['alabesU2'], 'potencia' => $row3['potencia'], 'reactivos' => $row3['reactivos'], 
    'compC1C4' => $row3['CompuertaC1C4'],'compC5C6' => $row3['CompuertaC5C6'], 'compC7C9' => $row3['CompuertaC7C8C9'],
    'compC10'=> $row3['CompuertaC10'], 'Azud' => $row3['azud'], 'Rebosadero' => $row3['rebosadero'], 'filtroU1' => $row3['filtroU1'],
    'filtroU2' => $row3['filtroU2'], 'Observaciones' => $row3['Observaciones']);

    $valorA= is_string($fechaB);

    $busquedaObj = array('id' => $id,'fecha' => $fechaB, 'tipo' => $valorA);

    $bitacora = array($inicioPrimerTurno, $finPrimerTurno, $inicioSegundoTurno, $finSegundoTurno, $alarmasPrimerTurno, $alarmasSegundoTurno, 
    $flushingPrimerTurno, $flushingSegundoTurno, $limpiezaRejillasPrimerTurno, $limpiezaRejillasSegundoTurno, 
    $limpiezaTanquesPrimerTurno, $limpiezaTanquesSegundoTurno, $rioPrimerTurno, $rioSegundoTurno, $disparosInternosPrimerTurno, 
    $disparosInternosSegundoTurno, $disparosExternosPrimerTurno, $disparosExternosSegundoTurno, $compuertasPrimerTurno, $compuertasSegundoTurno, 
    $azudPrimerTurno, $azudSegundoTurno, $observacionesPrimerTurno, $observacionesSegundoTurno, $busquedaObj);    
}
else if(isset($id))
{
  $resultadoBusqueda = $conexionTurnoDia -> query("SELECT * FROM crearturnodia WHERE id=1");  
 
  $row = $resultadoBusqueda -> fetch_assoc();
  
  $fechaInicioPrograma = $row['fechaInicioTurno'];

  $resultadoBusqueda = $conexionTurnoDia -> query("SELECT * FROM crearturnodia WHERE id=(SELECT MAX(id) FROM crearturnodia)");  
 
  $row = $resultadoBusqueda -> fetch_assoc();
  
  $fechaInicioTurno = $row['fechaInicioTurno'];

    $inicioPrimerTurno = array('Error' => "Sin datos para la busqueda",'fechaBusqueda' => $fechaB,'fechaInicio'=> $fechaInicioPrograma, 'fechaFinal' => $fechaInicioTurno);
    $bitacora = array($inicioPrimerTurno);
}
mysqli_close($conexionTurnoDia);
  
    $json = json_encode($bitacora);
    echo $json;
?>