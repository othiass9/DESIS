<?php
include_once 'db_connect.php';
error_reporting(0);
if ($_POST['accion']== 'ListaComunas') {
	$post = $_POST;
	$id_comuna =$post['idComuna'];

	try {
		if ($mysqli -> multi_query("CALL GET_COMUNAS('$id_comuna')")) {
			$grupos = array();
			do {
				if ($result = $mysqli -> store_result()) {
					while ($fila = $result -> fetch_assoc()) {               
						$grupos[$fila['id']] = $fila['comuna'];
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