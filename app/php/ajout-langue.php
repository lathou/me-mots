<?php
if(isset($_POST['id']) && isset($_POST['langue'])){

	include_once('bdd.php');

	$newLangue = htmlspecialchars(addslashes(trim($_POST['langue'])));
	$bdd = connexionBdd();
	$listeLangues = getListOfLangues($bdd, $_POST['id']);

	if($listeLangues['langues'] == ''){
		$listeLangues = $newLangue;
	}else{
		$listeLangues = $listeLangues['langues'].';'.$newLangue;
	}
	
	updateListLangues($bdd, $_POST['id'], $listeLangues);

	echo json_encode($listeLangues);	
}
?>