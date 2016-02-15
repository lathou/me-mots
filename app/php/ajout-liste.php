<?php
	
	if(isset($_POST['listName']) && $_POST['listName']!='' && isset($_POST['idUser']) && isset($_POST['langue']) && isset($_POST['langueOrigine'])){
		
		include_once('bdd.php');

		$id_membre = htmlspecialchars(addslashes(trim($_POST['idUser'])));
		$langue = htmlspecialchars(addslashes(trim($_POST['langue'])));
		$langueOrigine = htmlspecialchars(addslashes(trim($_POST['langueOrigine'])));
		$listName = htmlspecialchars(addslashes(trim($_POST['listName'])));
		$bdd = connexionBdd();
		
		creerListe($bdd, $id_membre, $langue, $langueOrigine, $listName);
		$listes = getListOfList($bdd, $id_membre);
		creerTableListe($bdd, end($listes)['id_liste']);

		$array = array("currentList" => end($listes)['id_liste'], "listes" => $listes);

		echo json_encode($array);
		
		foreach(json_decode($_POST['tableMots']) as $mot) {
			creerMot($bdd, end($listes)['id_liste'] , $mot);
		}		
	}
?>



