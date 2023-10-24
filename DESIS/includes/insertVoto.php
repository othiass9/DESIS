<?php
include_once 'db_connect.php';
error_reporting(0);
if ($_POST['accion']== 'guardaVoto') {



	$post = $_POST;
	$txtNombre =$post['txtNombre'];
	$txtAlias =$post['txtAlias'];
	$txtRut =$post['txtRut'];
	$txtEmail =$post['txtEmail'];
	$id_region =$post['txtRegion'];
	$id_comuna =$post['txtComuna'];
	$id_Candidato =$post['txtCandidato'];
	$opcion =$post['opcion'];



$sql="SELECT count(rut) as conteo FROM votos WHERE rut='$txtRut'";
$result = $mysqli->query($sql);

while($row = mysqli_fetch_array($result)) {
	$conteo = $row['conteo'];

 }

 if($conteo >= 1){

	$rawdata = '1';
	
	echo json_encode($rawdata);
 }else{
	$sql = "CALL INS_VOTO('$txtNombre','$txtAlias','$txtRut','$txtEmail',$id_region,$id_comuna,$id_Candidato,'$opcion')";

		$result = $mysqli->query($sql);      
		$row = $result->fetch_array(1);  
	
	$rawdata = '0';
	echo json_encode($rawdata);
 }


		
		

}

?>
