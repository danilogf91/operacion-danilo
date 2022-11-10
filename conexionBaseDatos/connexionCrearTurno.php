<?php

$usuario = "root";

$contrasena = "";
// $contrasena = "1991@";

$servidor = "localhost";

$nombre_base_datos = "operacion";

$conexionCrearTurno = new mysqLi($servidor, $usuario, $contrasena, $nombre_base_datos);
