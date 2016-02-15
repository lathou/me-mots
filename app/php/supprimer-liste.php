<?php
	if(isset($_POST['idUser']) && isset($_POST['id_liste'])){

		include_once('bdd.php');
		$bdd = connexionBdd();
		deleteList($bdd, $_POST['id_liste'], $_POST['idUser']);

		$listOfList = getListOfList($bdd, $_POST['idUser']);
		echo json_encode($listOfList);
	}
?>



