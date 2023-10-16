<?php
include_once 'psl-config.php';
$mysqli = new mysqli(HOST, USER, PASSWORD, DATABASE);
mysqli_set_charset($mysqli,"utf8");

function limpiaDB()
{
  $retorno = new mysqli(HOST, USER, PASSWORD, DATABASE);
  mysqli_set_charset($retorno,"utf8");
  
  return $retorno;
}
?>