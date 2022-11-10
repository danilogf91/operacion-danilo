<?php

$usuario = "root";

$contrasena = "";
// $contrasena = "1991@";

$servidor = "localhost";

$nombre_base_datos = "operacion";

$conexionTurnoDia = new mysqLi($servidor, $usuario, $contrasena, $nombre_base_datos);
