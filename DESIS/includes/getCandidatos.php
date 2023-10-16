<?php
include_once 'db_connect.php';
error_reporting(0);
if ($_POST['accion']== 'ListaCandidato') {
	$post = $_POST;
	
	try {
		if ($mysqli -> multi_query("CALL GET_CANDIDATO()")) {
			$grupos = array();
			do {
				if ($result = $mysqli -> store_result()) {
					while ($fila = $result -> fetch_assoc()) {               
						$grupos[$fila['id']] = $fila['nombre_candidato'];
					}
				}
			} while($mysqli->next_result());
			print_r(json_encode($grupos));
		}
		
	} catch (Exeption $e) {
		echo json_encode($e->getMessage());
	}
}
?>