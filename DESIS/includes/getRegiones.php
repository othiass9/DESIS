<?php
include_once 'db_connect.php';
error_reporting(0);
if ($_POST['accion']== 'ListaRegiones') {
	$post = $_POST;
	
	try {
		if ($mysqli -> multi_query("CALL GET_REGIONES()")) {
			$grupos = array();
			do {
				if ($result = $mysqli -> store_result()) {
					while ($fila = $result -> fetch_assoc()) {               
						$grupos[$fila['id']] = $fila['region'];
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