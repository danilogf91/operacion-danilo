<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://unpkg.com/gijgo@1.9.13/js/gijgo.min.js" type="text/javascript"></script>
<link rel="stylesheet" href="https://unpkg.com/gijgo@1.9.13/css/gijgo.min.css" type="text/css" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<!--<link rel="stylesheet" type="text/css" href="Estilos/style.css">-->
<link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>
<!--
<div class="divPrincipal">

<div class="tab">
  <button class="tablinks" onclick="openMenu(event, 'Principal')" id="defaultOpen">Principal</button>
  <button class="tablinks" onclick="openMenu(event, 'Ingresar')">Ingresar</button>
  <button class="tablinks" onclick="openMenu(event, 'Editar')">Editar</button>  
  <button class="tablinks" onclick="openMenu(event, 'Datos')">Datos</button>  
</div>

<div id="Principal" class="tabcontent">
-->

<?php 
/*
  date_default_timezone_set('America/Guayaquil');
  require_once ('Funciones/funciones.php');
  include ('./conexionBaseDatos/connexionCrearTurno.php');  
  include ('./conexionBaseDatos/conexionDia.php');    
  
  $resultadoBaseDatos = $conexionCrearTurno -> query("SELECT * FROM crearturnodia WHERE id=(SELECT MAX(id) FROM crearturnodia)");  
 
  $fechaComparar  = date('Y')."-".date('m')."-".date('d');
  $row = $resultadoBaseDatos -> fetch_assoc();
  
  $fechaBasedatos = $row['fechaInicioTurno'];

  $orden = "ASC";
        
  $numeroBitacora = $row['numeroBitacora'];
  

  $aux = $row['nombres'];

  $resultadoBaseDatosFinal = $conexionTurnoDia -> query("SELECT * FROM finturnonoche WHERE numBitacora ='$numeroBitacora'");      
  $fila = $resultadoBaseDatosFinal -> fetch_assoc();
  $turnoNoche = $fila['guardarTurno'];
  $primerTurnoCreado = $row['turnoCreado'];

  $fechaA = date('H');
  //echo($fechaA);
  //var_dump($fechaA);

  $fechaInicioTurnoBaseDatos = $row['fechaInicioTurno'];
  $fechaFinalTurnoBaseDatos = $row['fechaFinTurno'];


  $fechaInicioServidor  = getDateFun(true, 0);
  $fechaFinalServidor   = getDateFun(true, 1);


  $condicionUno         = ($fechaInicioServidor === $fechaInicioTurnoBaseDatos || $fechaInicioServidor === $fechaFinalTurnoBaseDatos) && $turnoNoche != 'Fin';
  //$condicionUno         = true ;

  if($condicionUno && $primerTurnoCreado === 'Ok' && $primerTurnoCreado === 'Ok')
  {
    echo "<center><h1>BITACORA ° ".$numeroBitacora."</h1></center>";
    echo "<p>";
    echo("Fecha inicio turno = ".$row['fechaInicioTurno']."<br> Fecha fin turno &nbsp;&nbsp;&nbsp;&nbsp; = ".$row['fechaFinTurno']);
    echo("<h3>Inicio turno día</h3>");
    echo ("<br> Nombres: ".nombresFormato($aux)."<br> Se recibe el turno con las unidades U1 = ".$row['alabesU1'].
    " %, U2 = ".$row['alabesU2']." %, potencia = ".$row['potencia']." MW, reactivos =".$row['reactivos'].
    " MVAR<br> Clima = ".$row['clima'].", captación compuertas 1 - 4 = ".$row['c1c4'])." cm, compuertas 5 - 6 = "
    .$row['c5c6']." cm, compuertas 7 - 8 - 9 = ".$row['c7c9']." cm, compuerta 10 = ".$row['c10']." cm<br> Azud: "
    .$row['azud']." cm, Rebosadero: ".$row['rebosadero']." cm, filtro U1 = ". $row['filtroU1'].", filtro U2 = ".$row['filtroU2'].". <br> Observaciones: ".$row['observaciones'];
    echo "</p>";
  }
  else
  {
    echo "<center><h1> CREAR BITACORA </h1></center>";
  }

  mysqli_close($conexionCrearTurno);  

if($condicionUno && $primerTurnoCreado === 'Ok' && $primerTurnoCreado === 'Ok')
{
// Mostrar Eventos primer turno
  include ('./Vista/primerTurnoDatosMostrados.php');    
}


  include ('./conexionBaseDatos/conexionDia.php');    
  $resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM finturnodia WHERE numBitacora = '$numeroBitacora'");      
  $row = $resultadoBaseDatos -> fetch_assoc();
  $aux = $row['nombresRecibeTurno'];
  $entregaTurnoOk = $row['guardarTurno'];

if($condicionUno && $primerTurnoCreado === 'Ok' && $primerTurnoCreado === 'Ok' && $entregaTurnoOk === 'guardarTurno')
{
  echo("<h3>Fin turno dia</h3>");
  echo "<p>";
  echo("Nombres: ".nombresFormato($aux)."<br> Se entrega el turno con las unidades U1 = ".$row['alabesU1']." %, U2 = "
  .$row['alabesU2']." %, potencia = ".$row['potencia']." MW, reactivos =".$row['reactivos']." MVAR<br> Clima = "
  .$row['clima'].", captación compuertas 1 - 4 = ".$row['CompuertaC1C4']." cm, compuertas 5 - 6 = ".$row['CompuertaC5C6'].
  " cm, compuertas 7 - 8 - 9 = ".$row['CompuertaC7C8C9']." cm, compuerta 10 = ".$row['CompuertaC10'].
  " cm<br> Azud: ".$row['azud']." cm, Rebosadero: ".$row['rebosadero']." cm, filtro U1 = ". $row['filtroU1'].", filtro U2 = ".$row['filtroU2'].
  "<br> Observaciones: ".$row['Observaciones']);  
  echo "</p>";
}

  include ('./conexionBaseDatos/conexionDia.php');    
  $resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM iniciosegundoturno WHERE numBitacora = '$numeroBitacora'");      
  $row = $resultadoBaseDatos -> fetch_assoc();
  $aux = $row['nombresPersonal'];
  $inicioSegundoTurno = $row['segundoTurno'];

if($condicionUno && $primerTurnoCreado === 'Ok' && $primerTurnoCreado === 'Ok' && $inicioSegundoTurno === 'SegundoOk')
{
  echo("<h3>Inicio turno noche</h3>");
  echo "<p>";
  echo("Nombres: ".nombresFormato($aux)."<br> Se recibe el turno con las unidades U1 = ".$row['alabesCentralU1']." %, U2 = "
  .$row['alabesCentralU1']." %, potencia = ".$row['potencia']." MW, reactivos =".$row['reactivos']." MVAR <br> Clima = "
  .$row['noche'].", captación compuertas 1 - 4 = ".$row['c1c4DatosCompuertas']." cm, compuertas 5 - 6 = ".$row['c5c6DatosCompuertas'].
  " cm, compuertas 7 - 8 - 9 = ".$row['c7c8DatosCompuertas']." cm, compuerta 10 = ".$row['c10c11DatosCompuertas']." cm<br> Azud: "
  .$row['azudValor']." cm, Rebosadero: ".$row['rebosaderoValor']." cm, filtro U1 = ". $row['filtrosCentralU1'].", filtro U2 = "
  .$row['filtrosCentralU2']."<br> Observaciones: ".$row['observacionesCentral']);  
  echo "</p>";
}

if($condicionUno && $primerTurnoCreado === 'Ok' && $primerTurnoCreado === 'Ok' && $inicioSegundoTurno === 'SegundoOk')
{
// Mostrar Eventos Segundo turno 
include ('./Vista/segundoTurnoDatosMostrados.php');    
}

include ('./conexionBaseDatos/conexionDia.php');    
$resultadoBaseDatos = $conexionTurnoDia -> query("SELECT * FROM finturnonoche WHERE numBitacora = '$numeroBitacora'");      
$row = $resultadoBaseDatos -> fetch_assoc();
$aux = $row['nombresRecibeTurno'];
$fin = $row['guardarTurno'];

if($condicionUno && $primerTurnoCreado === 'Ok' && $primerTurnoCreado === 'Ok' && $fin === 'Fin')
{
echo "<h3>Fin turno noche</h3>";
echo "<p>";
echo("Nombres: ".nombresFormato($aux)."<br> Se entrega el turno con las unidades U1 = ".$row['alabesU1']." %, U2 = ".$row['alabesU2']." %, potencia = ".$row['potencia']." MW, reactivos = 
".$row['reactivos']." MVAR<br> captación compuertas 1 - 4 = ".$row['CompuertaC1C4']." cm, compuertas 5 - 6 = ".$row['CompuertaC5C6']." cm, compuertas 7 - 8 - 9 = ".$row['CompuertaC7C8C9']." cm, compuerta 10 = ".$row['CompuertaC10']." cm<br> Azud: ".$row['azud']." cm, Rebosadero: ".$row['rebosadero']." cm <br> Observaciones: ".$row['Observaciones']);  
echo "</p>";

}*/
?> 

<!--
</div>

<div id="Editar" class="tabcontent">
  <h3>Editar</h3>
  <p>Crear la pagina de edicion de datos</p>
  
  <form action="#">
    <input type="submit" value="Borrar base" class="btn btn-primary">      
  </form>
</div>

<div id="Datos" class="tabcontent">


<div class="container">
        <header class="row">
            <div class="col-lg-12 text-center">
                
              <div class="form-row col-lg-12 text-center">

                <div class="form-group col-md-8">
                  <label for="inputState">Fecha</label>
                  <input id="fechaBuscarTurno"/>
        
                  <div class="input-group date" data-provide="fechaBuscarTurno">
                      <div class="input-group-addon ">
                          <span class="glyphicon glyphicon-th"></span>
                      </div>
                  </div>

                </div>

                <div class="form-group col-md-4">
                  <label for="inputCity">Buscar</label>
                  <button type="button" id="buscarDatos" onclick="buscarDatos(this);" class="btn btn-info form-control">Buscar</button>
                </div>                

              </div>

            </div>
        </header>
        <span id="ErrorData">
          
        </span>
</div>



        

  <div id="datosMostrados"  style="display: none;" >
    <center><h1>BITACORA ° <span id = "numBitaMostarTurno"> </span></h1></center>
    <p>
      Fecha inicio turno = <span id="iniTurnoMostarTurno"></span>
      </br>
      Fecha fin turno = <span id="finTurnoMostarTurno"></span>

      <h3>Inicio turno día</h3>
      <br> Nombres: <span id=nombresMostarTurno></span>
      <br> 
        Se recibe el turno con las unidades U1 = <span id="alabesU1MostrarTurno"></span> %,

       U2 =  <span id="alabesU2MostrarTurno"></span> %,
       potencia = <span id="potenciaMostrarTurno"></span> MW, reactivos = <span id="reactivosMostrarTurno"></span> MVAR.
       </br>
       Clima = <span id="climaMostrarTurno"></span>, captación compuertas 1 - 4 = <span id="C1C4MostrarTurno"></span> cm, compuertas 5 - 6 = <span id="C5C6MostrarTurno"></span> cm, 
       compuertas 7 - 8 - 9 = <span id="C7C8MostrarTurno"></span> cm, compuerta 10 = <span id="C10MostrarTurno"></span> cm
       </br>
       Azud: <span id="azudMostrarTurno"></span> cm, Rebosadero: <span id="rebosaderoMostrarTurno"></span> cm, 
       filtro U1 = <span id="filtroU1MostrarTurno"></span>, filtro U2 = <span id="filtroU2MostrarTurno"></span>
       </br>
       Observaciones: <span id="observacionMostrarTurno"></span>
    </p>
-->
    <!--  eventos primer turno -->

<!--
        <table>
          <tbody id="bodyTablaDia">

          </tbody>
        </table>
-->

    <!--  Fin primer turno -->

    <!--
    <p>
      <h3>Fin turno dia</h3>
      <br> Nombres: <span id=nombres1MostarTurno></span>
      <br> 
        Se entrega el turno con las unidades U1 = <span id="alabes1U1MostrarTurno"></span> %,

       U2 =  <span id="alabes1U2MostrarTurno"></span> %,
       potencia = <span id="potencia1MostrarTurno"></span> MW, reactivos = <span id="reactivos1MostrarTurno"></span> MVAR.
       </br>
       Clima = <span id="clima1MostrarTurno"></span>, captación compuertas 1 - 4 = <span id="C1C41MostrarTurno"></span> cm, compuertas 5 - 6 = <span id="C5C61MostrarTurno"></span> cm, 
       compuertas 7 - 8 - 9 = <span id="C7C81MostrarTurno"></span> cm, compuerta 10 = <span id="C101MostrarTurno"></span> cm
       </br>
       Azud: <span id="azud1MostrarTurno"></span> cm, Rebosadero: <span id="rebosadero1MostrarTurno"></span> cm, 
       filtro U1 = <span id="filtro1U1MostrarTurno"></span>, filtro U2 = <span id="filtro1U2MostrarTurno"></span>
       </br>
       Observaciones: <span id="observacion1MostrarTurno"></span>
    </p>


    <p>
      <h3>Incio turno noche</h3>
      <br> Nombres: <span id=nombres2MostarTurno></span>
      <br> 
        Se recibe el turno con las unidades U1 = <span id="alabes2U1MostrarTurno"></span> %,

       U2 =  <span id="alabes2U2MostrarTurno"></span> %,
       potencia = <span id="potencia2MostrarTurno"></span> MW, reactivos = <span id="reactivos2MostrarTurno"></span> MVAR.
       </br>
       Clima = <span id="clima2MostrarTurno"></span>, captación compuertas 1 - 4 = <span id="C1C42MostrarTurno"></span> cm, compuertas 5 - 6 = <span id="C5C62MostrarTurno"></span> cm, 
       compuertas 7 - 8 - 9 = <span id="C7C82MostrarTurno"></span> cm, compuerta 10 = <span id="C102MostrarTurno"></span> cm
       </br>
       Azud: <span id="azud2MostrarTurno"></span> cm, Rebosadero: <span id="rebosadero2MostrarTurno"></span> cm, 
       filtro U1 = <span id="filtro2U1MostrarTurno"></span>, filtro U2 = <span id="filtro2U2MostrarTurno"></span>
       </br>
       Observaciones: <span id="observacion2MostrarTurno"></span>
    </p>
    -->
    <!--  eventos segundo turno -->

<!--
        <table>
          <tbody id="bodyTablaNoche">

          </tbody>
        </table>

    <p>
      <h3>Fin turno noche</h3>
      <br> Nombres: <span id=nombres3MostarTurno></span>
      <br> 
        Se entrega el turno con las unidades U1 = <span id="alabes3U1MostrarTurno"></span> %,

       U2 =  <span id="alabes3U2MostrarTurno"></span> %,
       potencia = <span id="potencia3MostrarTurno"></span> MW, reactivos = <span id="reactivos3MostrarTurno"></span> MVAR.
       </br>
       <span id="clima3MostrarTurno"></span> Captación compuertas 1 - 4 = <span id="C1C43MostrarTurno"></span> cm, compuertas 5 - 6 = <span id="C5C63MostrarTurno"></span> cm, 
       compuertas 7 - 8 - 9 = <span id="C7C83MostrarTurno"></span> cm, compuerta 10 = <span id="C103MostrarTurno"></span> cm
       </br>
       Azud: <span id="azud3MostrarTurno"></span> cm, Rebosadero: <span id="rebosadero3MostrarTurno"></span> cm, 
       filtro U1 = <span id="filtro3U1MostrarTurno"></span>, filtro U2 = <span id="filtro3U2MostrarTurno"></span>
       </br>
       Observaciones: <span id="observacion3MostrarTurno"></span>
    </p>

  </div>
</div>

<div id="Ingresar" class="tabcontent"> 


<form id='myForm' action="leerDatos.php" method='post'>
<div class="container">  
  <div class="row">    
    <div class="col-sm-8">
      <table class="table table-bordered thead-light">
        <tr>
                <th class="table-primary">
                  FECHA
                </th>
                
                <th class="table-primary">
                  DÍA
                </th>      

                <th class="table-primary">
                  
                  <input id='myRadio' type="checkbox" data-on="HORA_ON" data-off="HORA_OFF" onchange="handleChange(this);" checked data-toggle="toggle" data-height="25" data-width="110" >
                </th>  
          
          <th class="table-primary">
            N° Bitácora
          </th>
          
        </tr>
        
        <tr>
          <td>
            Incio turno
          </td>    
          
          <td>
            <input id="fechaInicioTurno" />
        
            <div class="input-group date" data-provide="fechaInicioTurno">
                <div class="input-group-addon">
                    <span class="glyphicon glyphicon-th"></span>
                </div>
            </div>
          </td>   
          
          <td>
            <input id="HoraInicioTurno"  type='time' name="fechaDatosCompuertas1" >
          </td>  
          
          <td rowspan='2' colspan="5">              
            <input placeHolder="N° de Bitacora 1 - 365" onchange="validarNumeroBitacora();" type="number" id="numBitacora"  min='1' max='366' step="1" style='width:150px height:60px' name="c1c4DatosCompuertas" >            
          </td> 
        </tr>

        <tr>    
          <td>
            Fin turno
          </td>
          
          <td>
            <input id="fechaFinTurno" />
        
            <div class="input-group date" data-provide="fechaFinTurno">
                <div class="input-group-addon">
                    <span class="glyphicon glyphicon-th"></span>
                </div>
            </div>
          </td> 
          
          <td>
            <input id="HoraFinTurno"  type='time' name="fechaDatosCompuertas" >
          </td>               
        </tr>
      </table>




<table class="table table-bordered thead-light">
  <tr>
    <tr class="table-primary">
      <th >Hora</th>
      <th >Horario</th>
      <th class="col-sm-4">Nombres</th>
    </tr>
  <tr>
      
      <td rowspan='3'>
        <input id="horaIngresoPersonal"  type='time' name="fechaDatosCompuertas" >
      </td>
      
      <td>
        <select id="horarioDeIngreso" name="ggg" id="hhh">
          <option value="Primer Turno">Primer Turno</option>
          <option value="Segundo Turno">Segundo Turno</option>
        </select>
      </td>
      
      <td>
        <textarea class="form-control rounded-0" id="nombresPersonal" onchange="validarNombre();" placeHolder="Ingrese nombres con el siguiente formato Persona1, Persona2, Persona3, etc." rows="2"></textarea>
      </td>
    </tr>
  </table>

    </div>

    <div class="col-sm-4">
    <table id = 'climaTabla' class="table table-bordered thead-light" >
              <tr>
                <th class="table-primary" colspan='4' > ESTADO DEL CLIMA</th>
              </tr>

              <tr class="table-warning">
                <th ></th>
                <th>DÍA</th>
                <th>TARDE</th>
                <th>NOCHE</th>
              </tr>

              <tr>
                <td>BUENO</td>
                <td><input type = 'radio' name='diaValor1' value="DIA BUENO"   ></td>
                <td><input type = 'radio' name='diaValor2' value="TARDE BUENO" ></td>
                <td><input type = 'radio' name='diaValor3' value="NOCHE BUENO" ></td>
              </tr>

              <tr>
                <td>NUBLADO</td>
                <td><input type = 'radio' name='diaValor1' value="DIA NUBLADO"   ></td>
                <td><input type = 'radio' name='diaValor2' value="TARDE NUBLADO" ></td>
                <td><input type = 'radio' name='diaValor3' value="NOCHE NUBLADO" ></td>
              </tr>	

              <tr>
                <td>LLUVIOSO</td>
                <td><input type = 'radio' name='diaValor1' value="DIA LLUVIOSO"   ></td>
                <td><input type = 'radio' name='diaValor2' value="TARDE LLUVIOSO" ></td>
                <td><input type = 'radio' name='diaValor3' value="NOCHE LLUVIOSO" ></td>
              </tr>

              <tr>
                <td>CRECIDA</td>
                <td><input type = 'radio' name='diaValor1' value="DIA CRECIDA"   ></td>
                <td><input type = 'radio' name='diaValor2' value="TARDE CRECIDA" ></td>
                <td><input type = 'radio' name='diaValor3' value="NOCHE CRECIDA" ></td>
              </tr>		
          </table>
    </div>
  </div>
</div>

  <hr>

  <table class="table table-bordered thead-light">
  
    <thead class="table-warning">      
      <th>Acción</th>      
      <th>Potencia MW</th>      
      <th>Reactivos MVAR</th>			
      <th>Alábes U1 %</th>
      <th>Alábes U2 %</th>
      <th>Filtros U1 #</th>
      <th>Filtros U2 #</th>      
    </thead>
  <tr>
      <td>
        <select name="aaa" id="entregaRecibeTurnos">
          <option value="Recibe">Recibe</option>
          <option value="Entrega">Entrega</option>          
        </select>
      </td>

			  <td>
				  <input class="numeros" placeHolder="0 - 10.2" type="number" id="potenciaCentral" onchange="validarPotencia(this);"  min='0' max='10.2' step="0.01">
			  </td>
			  
        <td>
				  <input class="numeros" placeHolder="-2.5 2.5" type="number" id="reactivosCentral" onchange="validarReactivos(this);"  min='-5' max='5' step="0.01">						
			  </td>

			  <td>
				  <input class="numeros" placeHolder="0 - 100" type="number" id="alabesCentralU1" onchange="validarAlabesU1(this);" min='0' max='100' step="0.1">						
			  </td>	

        <td>
				  <input class="numeros" placeHolder="0 - 100" type="number" id="alabesCentralU2" onchange="validarAlabesU2(this);" min='0' max='100' step="0.1">						
        </td>		  
        
        <td>
				  <input class="numeros" placeHolder="0 - 500" type="number" id="filtrosCentralU1" onchange="validarFiltrosU1(this);" min='0' max='500' step="1">						
        </td>	
        
        <td>
				  <input class="numeros" placeHolder="0-500" type="number" id="filtrosCentralU2" onchange="validarFiltrosU2(this);" min='0' max='500' step="1">						
			  </td>	
    </tr>    
  </table>
-->
  <!-- Separador de tabla -->  
  <!--
    <hr>
 
  <table class="table table-bordered thead-light">
        <tr>	
            <th class="table-primary" colspan='5'>ESTADO DE COMPUERTAS</th>    
            <th class="table-warning" colspan='3'>FLUSHING</th>
        </tr>

    <tr>
			<th>Hora</th>      
      <th>C1 - C4 cm</th>      
      <th>C5 - C6 cm</th>			
      <th>C7 - C8 - C9 cm</th>			
      <th>C10 cm</th>            
      <th>HORA</th>            
      <th>UNIDADES</th>            
      <th>AGUA</th>    
    </tr>

    <tr>
			<td>
				<input id="horaDatosCompuertas"  type='time' name="fechaDatosCompuertas" >
			</td>

			<td>
				<input class="numeros" type="number" placeHolder="0 - 150" id="c1c4DatosCompuertas" min="0" max="150" onchange="validarCompuertasC1C4(this);" name="c1c4DatosCompuertas" step="1">
			</td>
			
      <td>
				<input class="numeros" type="number" placeHolder="0 - 250" id="c5c6DatosCompuertas" min="0" max="250" onchange="validarCompuertasC5C6(this);" name="c5c6DatosCompuertas" step="1">						
			</td>
			
      <td>
				<input class="numeros" type="number" placeHolder="0 - 100" id="c7c8DatosCompuertas" min="0" max="100" onchange="validarCompuertasC7C8(this);" name="c7c8DatosCompuertas" step="1">						
			</td>

			<td>
				<input class="numeros" type="number" placeHolder="0 - 110" id="c10c11DatosCompuertas" min="0" max="110" onchange="validarCompuertasC10(this);" name="c10c11DatosCompuertas" step="1">						
			</td>

      <td>
        <input id="horaFlushingUnidades"  type='time' name="fechaDatosCompuertas" >
      </td>

      <td>
        <select name="flushing" id="flusingUnida1Unidad2">
          <option value="Unidad 1">U1</option>
          <option value="Unidad 2">U2</option>
          <option value="Unidad 1-2">U1 y U2</option>
        </select>
      </td>

      <td>
        <select name="tipoDeAgua" id="tipoDeAgua">
          <option value="Clara">Clara</option>
          <option value="Media clara">Media clara</option>
          <option value="Turbia">Turbia</option>
          <option value="Muy turbia">Muy turbia</option>
          <option value="Lodosa">Lodosa</option>
        </select>
      </td>

		</tr>

  </table>

  <table class="table table-bordered thead-light"  id="tablaEventos" class='tablaEstados'>	
   -->	
  <!--					
		<tr>
			<th colspan='6'> NOMBRE DE LA TABLA</th>
		</tr> -->

		<!--
    <thead class="table-primary">		
			<th>HORA</th>
      <th>ALARMAS</th>      
      <th class="table-warning">HORA</th>
      <th class="table-warning">DISPAROS EXTERNOS</th>      
      <th>HORA</th>
      <th>LIMPIEZA TANQUES</th>   
  </thead>

		<tr>	
      <td>
        <input id="horaAlarmas" onchange='funcionCambia();' type='time' name="fechaLimpiezaRejilas" >		
      </td>
      
      <td>
				<select id="opcionAlarmasPalmira" onchange='funcionCambia();' name='CondicionesAlarmasPalmira'> 						
						<option value='M1'>M1</option>
						<option value='M2'>M2</option>
						<option value='M4'>M4</option>	
						<option value='I/O'>I/O</option>
						<option value='WKV'>WKV</option>
						<option value='Sobre Tensión U1'>Sobre Tensión U1</option>
						<option value='Sobre Tensión U2'>Sobre Tensión U2</option>
						<option value='Baja Tensión U1'>Baja Tensión U1</option>
						<option value='Baja Tensión U2'>Baja Tensión U2</option>	
						<option value='Desconexión SCADA'>Desconexión SCADA</option>	
						<option value='Otros'>Otros</option>												
        </select>
      </td>                

      <td>
          <input id="horaDisparosExternos" onchange='funcionCambia();'  type='time' name="fechaLimpiezaRejilas" >		
      </td>

      <td>
          <select id="opcionDisparosExternosPalmira" onchange='funcionCambia();' name='CondicionesDisparosExternosPalmira'> 						
						
						<option value='Falla LT Sto. Domingo'>Falla LT Sto. Domingo</option>
						<option value='Falla LT Cotocollao'>Falla LT Cotocollao</option>	
						<option value='Falla SE Sto. Domingo'>Falla SE Sto. Domingo</option>
						<option value='Falla SE los Bancos'>Falla SE los Bancos</option>
						<option value='Salida de operación U1'>Salida de operación U1</option>
						<option value='Salida de operación U2'>Salida de operación U2</option>
            <option value='Salida de operación U1 - U2'>Salida de operación U1 - U2</option>							
            <option value='Ingreso a operación U1'>Ingreso a operación U1</option>
            <option value='Ingreso a operación U2'>Ingreso a operación U2</option>
            <option value='Ingreso a operación U1 - U2'>Ingreso a operación U1 - U2</option>
						<option value='Otros'>Otros</option>												
          </select>          
      </td>        

      <td>
          <input id="horaLimpiezaTanques"  type='time' name="fechaLimpiezaRejilas" >		
      </td>
        
      <td>
				<select id="opcionTanque"  name='limpiezaTanquesItems'> 						
						<option value='Embalse'>Embalse</option>
						<option value='Desripiador'>Desripiador</option>
						<option value='Desarenador C8'>Desarenador C8</option>		
						<option value='Desarenador C9'>Desarenador C9</option>		
						<option value='Desarenador C8 - C9'>Desarenador C8 - C9</option>		
						<option value='Canal'>Canal</option>		
						<option value='Tanque de Carga'>Tanque de Carga</option>		
						<option value='Tanque de Carga C10'>Tanque de Carga C10</option>												
				</select>
      </td>          
		</tr>
    </table>

    <table class="table table-bordered thead-light" >
    <tr>    
      <thead class="table-primary">
        <th>HORA</th>
        <th>LIMPIEZA REJILLAS</th>           
        <th class="table-warning">HORA</th>
        <th class="table-warning">DISPAROS INTERNOS</th>
        <th>HORA</th>
        <th>CONDICIONES DE RÍO</th>
      </thead>
    </tr>

		<tr>
      <td>
          <input id="horaLimpiezaRejillas"  type='time' name="fechaLimpiezaRejilas" >		
      </td>

      <td>
				<select id="opcionRejillas"  name='limpiezaRejillasItems'> 												
						<option value='Limpieza tanque de carga'>Limpieza tanque de carga</option>
						<option value='Limpieza captacion'>Limpieza captacion</option>
						<option value='Palizada'>Palizada</option>												
				</select>				
      </td>
        
      <td>
        <input id="horaDisparosInternos" onchange='funcionCambia();'  type='time' name="fechaLimpiezaRejilas" >		
      </td>
      
      <td>
				<select id="opcionDisparosInternosPalmira" onchange='funcionCambia();' name='CondicionesDisparosInternosPalmira'> 						
						<option value='Sistema de refrigeracion U1'>Sistema de refrigeracion U1</option>
						<option value='Sistema de refrigeracion U2'>Sistema de refrigeracion U2</option>
						<option value='Sensor de nivel TC'>Sensor de nivel TC</option>	
						<option value='Rtds Generador U1'>Rtds Generador U1</option>
						<option value='Rtds Generador U2'>Rtds Generador U2</option>	
            <option value='Rtds Generador U2'>Rtds Generador U2</option>
            <option value='Salida de operación U1'>Salida de operación U1</option>
						<option value='Salida de operación U2'>Salida de operación U2</option>
            <option value='Salida de operación U1 - U2'>Salida de operación U1 - U2</option>							
            <option value='Ingreso a operación U1'>Ingreso a operación U1</option>
            <option value='Ingreso a operación U2'>Ingreso a operación U2</option>
            <option value='Ingreso a operación U1 - U2'>Ingreso a operación U1 - U2</option>							
						<option value='Otros'>Otros</option>												
				</select>
      </td>

      <td>
        <input id="horaCondicionesRio"  type='time'  name="fechaLimpiezaRejilas" >		
      </td>
      
      <td>
				<select id="opcionRio"  name='CondicionesDelRio'> 						
						<option value='Normal'>Normal</option>
						<option value='Crecida'>Crecida</option>
						<option value='Clima seco'>Clima seco</option>												
				</select>
			</td>   
    </tr>
</table>
<hr>

<div class="row">
<div class="col">

<table class="table table-bordered thead-light"> 
  <thead class="table-primary">
      <th>HORA</th>
      <th class="col-sm-4">OBSERVACIONES</th> 
      <th class="table-warning">HORA</th>
      <th class="table-warning">AZUD</th>            
      <th class="table-warning">REBOSADERO</th>          
  </thead>

  <tr>
    <td>
      <input id="horaObservaciones"  type='time'>	  
    </td>
    <td>
      <textarea class="form-control rounded-0" id="observacionesCentral" onchange="validarObservaciones();" placeHolder="Ingrese observaciones: Eventos, Disparos, otros." rows="3"></textarea>        
    </td>
    <td>
      <input id="horaAzud"  type='time'>	  
    </td>
    <td>
      <input class="numeros" type="number" placeHolder="-110 - 120" id="azudValor" onchange="validarAzud();" min="-110" max="120" step="0.1">						
    </td>
    <td>
      <input class="numeros" type="number" placeHolder="-110 - 20" id="rebosaderoValor" onchange="validarRebosadero();" min="-110" max="20" step="0.1">						
    </td>
  </tr>
</table>
</div>
</div>
</form>
</div>

</div>

<div id='botonesAction' class="botonesInputs">
  <center>

  <?//php include ('guardarPrimerTurno.php');  ?>
  </center>
</div>
-->

<div class="container-fluid" >
  <div class="row">
    <div class="col"></div>
    <div class="col">
      <h3>BITÁCORA #</h3>  
    </div>
    <div class="col"></div>
  </div>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, in? Tempore id veritatis saepe mollitia molestias illo placeat itaque eum.
  </p>

  <div class="row">
    <div class="col-sm-1" style="background: blue;">Botones</div>
    <div class="col-sm-8" style="background: beige;">
    
      <table class="table table-bordered thead-light">
          <tr>
                  <th>
                    FECHA
                  </th>
                  
                  <th>
                    DÍA
                  </th>      

                  <th>
                    
                    <input id='myRadio' type="checkbox" data-on="HORA_ON" data-off="HORA_OFF" onchange="handleChange(this);" checked data-toggle="toggle" data-height="25" data-width="110" >
                  </th>  
            
            <th >
              N° Bitácora
            </th>
            
          </tr>
          
          <tr>
            <td>
              Incio turno
            </td>    
            
            <td>
              <input id="fechaInicioTurno" />
          
              <div class="input-group date" data-provide="fechaInicioTurno">
                  <div class="input-group-addon">
                      <span class="glyphicon glyphicon-th"></span>
                  </div>
              </div>
            </td>   
            
            <td>
              <input id="HoraInicioTurno"  type='time' name="fechaDatosCompuertas1" >
            </td>  
            
            <td rowspan='2' colspan="5">              
              <input placeHolder="N° de Bitacora 1 - 365" onchange="validarNumeroBitacora();" type="number" id="numBitacora"  min='1' max='366' step="1" style='width:150px height:60px' name="c1c4DatosCompuertas" >            
            </td> 
          </tr>

          <tr>    
            <td>
              Fin turno
            </td>
            
            <td>
              <input id="fechaFinTurno" />
          
              <div class="input-group date" data-provide="fechaFinTurno">
                  <div class="input-group-addon">
                      <span class="glyphicon glyphicon-th"></span>
                  </div>
              </div>
            </td> 
            
            <td>
              <input id="HoraFinTurno"  type='time' name="fechaDatosCompuertas" >
            </td>               
          </tr>
      </table>
      
    
      
      <table class="table table-bordered thead-light">
        
        <tr>
            <th >Hora</th>
            <th >Horario</th>
            <th >Nombres</th>
        </tr>

        <tr>    
          <td>
            <input id="horaIngresoPersonal"  type='time' name="fechaDatosCompuertas" >
          </td>
            
          <td>
            <select id="horarioDeIngreso" name="ggg" id="hhh">
              <option value="Primer Turno">Primer Turno</option>
              <option value="Segundo Turno">Segundo Turno</option>
            </select>
          </td>
            
          <td>
            <textarea id="nombresPersonal" onchange="validarNombre();" placeHolder="Ingrese nombres con el siguiente formato Persona1, Persona2, Persona3, etc."></textarea>
          </td>
        </tr>
      </table>
    
    
    </div>


    <div class="col-sm-3">
    <table id = 'climaTabla' class="table table-bordered thead-light" >
              <tr>
                <th colspan="4"> ESTADO DEL CLIMA</th>
              </tr>

              <tr>
                <th ></th>
                <th>DÍA</th>
                <th>TARDE</th>
                <th>NOCHE</th>
              </tr>

              <tr>
                <td>BUENO</td>
                <td><input type = 'radio' name='diaValor1' value="DIA BUENO"   ></td>
                <td><input type = 'radio' name='diaValor2' value="TARDE BUENO" ></td>
                <td><input type = 'radio' name='diaValor3' value="NOCHE BUENO" ></td>
              </tr>

              <tr>
                <td>NUBLADO</td>
                <td><input type = 'radio' name='diaValor1' value="DIA NUBLADO"   ></td>
                <td><input type = 'radio' name='diaValor2' value="TARDE NUBLADO" ></td>
                <td><input type = 'radio' name='diaValor3' value="NOCHE NUBLADO" ></td>
              </tr>	

              <tr>
                <td>LLUVIOSO</td>
                <td><input type = 'radio' name='diaValor1' value="DIA LLUVIOSO"   ></td>
                <td><input type = 'radio' name='diaValor2' value="TARDE LLUVIOSO" ></td>
                <td><input type = 'radio' name='diaValor3' value="NOCHE LLUVIOSO" ></td>
              </tr>

              <tr>
                <td>CRECIDA</td>
                <td><input type = 'radio' name='diaValor1' value="DIA CRECIDA"   ></td>
                <td><input type = 'radio' name='diaValor2' value="TARDE CRECIDA" ></td>
                <td><input type = 'radio' name='diaValor3' value="NOCHE CRECIDA" ></td>
              </tr>		
          </table></div>
  </div>
</div>

</body>
</html> 
