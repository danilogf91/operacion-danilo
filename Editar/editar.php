<?php  
  include ('../conexionBaseDatos/conexionDia.php');    
  include ('../Funciones/Funciones.php');   
 
  $id               = $_POST['id'];
  $fecha            = $_POST['fecha'];
  $opcionesTurno    = $_POST['selectionTurno'];
  $selectionTablas  = strval($_POST['selectionTablas'] + 4);

  //$id = 172;
  //$fecha = "21-06-2021";
  //$opcionesTurno = 2;
  $busquedaObj = array('id' => $id,'fecha' => $fecha, 'selectionTurno' => $opcionesTurno, 'selectionTablas' => $selectionTablas);

  $resultadoBaseDatosFinal = $conexionTurnoDia  -> query("SELECT * FROM crearturnodia WHERE (numeroBitacora = '$id' and fechaInicioTurno = '$fecha') ");      
  $row = $resultadoBaseDatosFinal -> fetch_assoc();

  $resultadoBaseDatos1 = $conexionTurnoDia      -> query("SELECT * FROM finturnodia WHERE numBitacora = '$id'");      
  $row1 = $resultadoBaseDatos1 -> fetch_assoc();

  $resultadoBaseDatos2 = $conexionTurnoDia      -> query("SELECT * FROM iniciosegundoturno WHERE numBitacora = '$id'");      
  $row2 = $resultadoBaseDatos2 -> fetch_assoc();

  $resultadoBaseDatos3 = $conexionTurnoDia      -> query("SELECT * FROM finturnonoche WHERE numBitacora = '$id'");      
  $row3 = $resultadoBaseDatos3 -> fetch_assoc();

  $condicion = ($resultadoBaseDatos1 ->num_rows) > 0 || ($resultadoBaseDatos2 ->num_rows) > 0 || ($resultadoBaseDatos3 ->num_rows) > 0 || ($resultadoBaseDatosFinal ->num_rows) > 0;

// Selecciona las opciones  
if($opcionesTurno != 0 && $selectionTablas != 4){
    $opciones = 0;
}
else if($opcionesTurno != 0){
    $opciones = $opcionesTurno;
}else if($selectionTablas > 4){
    $opciones = $selectionTablas;
}else{
    $opciones = 0;
}
/*
echo "OpcionesTurno = ".$opcionesTurno." SelectionTablas = ".$selectionTablas."\n";
echo "Opciones = ". $opciones."\n";*/

$orden = 'ASC';

  switch($opciones){
    case 1:
            $busqueda = array('numBitacora' => $id, 'fechaIniTurno' => $row['fechaInicioTurno'],
            'fechaFinTurno' => $row['fechaFinTurno'], 'nombres' => nombresFormato($row['nombres']), 'alabesU1' => $row['alabesU1'],
            'alabesU2' => $row['alabesU2'], 'potencia' => $row['potencia'], 'reactivos' => $row['reactivos'], 
            'Clima' => $row['clima'], 'compC1C4' => $row['c1c4'], 'compC5C6' => $row['c5c6'], 'compC7C9' => $row['c7c9'],
            'compC10'=> $row['c10'], 'Azud' => $row['azud'], 'Rebosadero' => $row['rebosadero'], 'filtroU1' => $row['filtroU1'],
            'filtroU2' => $row['filtroU2'],'Observaciones' => $row['observaciones']);  
        break;
    case 2:
            $busqueda = array('nombres' => nombresFormato($row1['nombresRecibeTurno']),'alabesU1' => $row1['alabesU1'],
            'alabesU2' => $row1['alabesU2'], 'potencia' => $row1['potencia'], 'reactivos' => $row1['reactivos'], 
            'Clima' => $row1['clima'], 'compC1C4' => $row1['CompuertaC1C4'], 'compC5C6' => $row1['CompuertaC5C6'], 'compC7C9' => $row1['CompuertaC7C8C9'],
            'compC10'=> $row1['CompuertaC10'], 'Azud' => $row1['azud'], 'Rebosadero' => $row1['rebosadero'], 'filtroU1' => $row1['filtroU1'],
            'filtroU2' => $row1['filtroU2'],'Observaciones' => $row1['Observaciones']);
        break;
    case 3:
            $busqueda = array('nombres' => nombresFormato($row2['nombresPersonal']),'alabesU1' => $row2['alabesCentralU1'],
            'alabesU2' => $row2['alabesCentralU2'], 'potencia' => $row2['potencia'], 'reactivos' => $row2['reactivos'], 
            'Clima' => $row2['noche'], 'compC1C4' => $row2['c1c4DatosCompuertas'], 'compC5C6' => $row2['c5c6DatosCompuertas'], 'compC7C9' => $row2['c7c8DatosCompuertas'],
            'compC10'=> $row2['c10c11DatosCompuertas'], 'Azud' => $row2['azudValor'], 'Rebosadero' => $row2['rebosaderoValor'], 'filtroU1' => $row2['filtrosCentralU1'],
            'filtroU2' => $row2['filtrosCentralU2'],'Observaciones' => $row2['observacionesCentral']);                    
        break;
    case 4:
            $busqueda = array('nombres' => nombresFormato($row3['nombresRecibeTurno']),'alabesU1' => $row3['alabesU1'],
            'alabesU2' => $row3['alabesU2'], 'potencia' => $row3['potencia'], 'reactivos' => $row3['reactivos'], 
            'compC1C4' => $row3['CompuertaC1C4'],'compC5C6' => $row3['CompuertaC5C6'], 'compC7C9' => $row3['CompuertaC7C8C9'],
            'compC10'=> $row3['CompuertaC10'], 'Azud' => $row3['azud'], 'Rebosadero' => $row3['rebosadero'], 'filtroU1' => $row3['filtroU1'],
            'filtroU2' => $row3['filtroU2'], 'Observaciones' => $row3['Observaciones']);        
        break;  
    case 5:    
            // Inicio Alarmas

            $resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM alarmas WHERE numBitacora = '$id' ORDER BY horaAlarma $orden");  
            $resultado1 = $resultadoBaseDatos;

            $busqueda = array();

            while($filaAlarma = $resultado1 -> fetch_assoc())
            {	      

                array_push($busqueda, ['horaAlarma' => $filaAlarma['horaAlarma'], 'tipoAlarma'=> $filaAlarma['tipoAlarma'], 
                'observaciones'=> $filaAlarma['observaciones']]); 
            } 

            // Fin alarmas        
        break;            
    case 6:     
            // Inicio azud

            $resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM azud WHERE numBitacora = '$id' ORDER BY horaAzud $orden");      
            $busqueda = array();

                while($row = $resultadoBaseDatos -> fetch_assoc())
                {				
                    array_push($busqueda, ['horaAzud' => $row['horaAzud'], 'azudValor' => $row['azudValor'],
                    'rebosaderoValor' => $row['rebosaderoValor']]); 
                }


            // Fin azud        
        break;             
    case 7:     
            // Inicio compuertas

            $resultadoBaseDatosCompuertas = $conexionTurnoDia -> query("SELECT * FROM compuertas WHERE numBitacora = '$id' ORDER BY horaCompuertas $orden");  

            $busqueda = array();

                while($row = $resultadoBaseDatosCompuertas -> fetch_assoc())
                {	      	
                    array_push($busqueda, ['horaCompuertas' => $row['horaCompuertas'], 'compuertaC1C4' => $row['compuertaC1C4'],
                    'compuertaC5C6' => $row['compuertaC5C6'], 'compuertaC7C8C9' => $row['compuertaC7C8C9'],'compuertaC10' => $row['compuertaC10']]); 
                } 
            // Fin compuertas        
        break;            
    case 8:     
        break; 
    case 9:     
        break;            
    case 10:    
            // Inicio flushing
            $resultadoflushing = $conexionTurnoDia -> query("SELECT * FROM flushing WHERE numBitacora = '$id' ORDER BY horaFlushing $orden");  
            $resultado1 = $resultadoflushing;

            $busqueda = array();

            while($fila = $resultado1 -> fetch_assoc())
            {	      						
                array_push($busqueda, ['horaFlushing' => $fila['horaFlushing'], 'unidadesFlushing'=> $fila['unidadesFlushing'], 
                'tipoAgua'=> $fila['tipoAgua']]);
            } 
            // Fin Flushing          
        break; 
    case 11:     
        break;            
    case 12:     
        break;             
    case 13:     
        break;            
    case 14:     
        break; 
    default:
            $busqueda = array('Error' => "Sin datos para la busqueda");            
            $bitacora = array($busqueda, $busquedaObj); 
        break;
  }
  $bitacora = array($busqueda, $busquedaObj);    

/*
if($condicion != 0){     
    $bitacora = array($busqueda, $busquedaObj);    
}
else 
{
    $busqueda = array('Error' => "Sin datos para la busqueda");
    $bitacora = array($busqueda, $busquedaObj); 
}
*/

mysqli_close($conexionTurnoDia);

    $json = json_encode($bitacora);
    echo $json;
?>