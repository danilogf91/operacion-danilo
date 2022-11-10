<?php
function nombresFormato($aux){
  $aux = trim($aux);
  $variable ="";  
  if(substr_count($aux, ',') != 0)
  {
    for($i = 0; $i<substr_count($aux, ','); $i++)
    {
      $variable = str_replace(",",", ",$aux);
      $aux = $variable ;  
    }
    return textCorrect($variable);
  }
  else
  {
    $ultimaLetra = substr($aux, -1);

      if($ultimaLetra === ",")
      {
        return substr($aux, 0, -1).".";
      }
      else
      {
        return $aux.".";     
      }    
  }
}


function textCorrect($text){
    $textTim = trim($text);
    $ultimaLetra = substr($textTim, -1);
    
    if($ultimaLetra === ",")
    {
      return substr($textTim,0, -1).".";
    }
    else
    {
      return $textTim.".";
    }
}

function getDateFun($condicion,$sumarDias){

  $validarDia = intval(date('d')+$sumarDias);

  if($validarDia <= 9){
    $dia = "0".$validarDia;
  }
  else
  {
    $dia = $validarDia;
  }

    if($condicion)
    {
      $fechaComparar  = $dia ."-".date('m')."-".date('Y');
    }
    else
    {
      $fechaComparar  = intval(date('d')) ."-".date('m')."-".date('Y');    
    }
    return $fechaComparar;
}
/*
function validarTabla($dataBase, $itemComparar){
$count = 0;

while($dataBase)
{	      
  if(!($row['$itemComparar'] >= "06:00" && $row['$itemComparar'] <= "18:00"))
  { 						
    $count++;    
  } 
  return $count; 															      
} 
}*/
?>