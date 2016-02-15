<?php

	if(isset($_POST['idUser']) && isset($_POST['id_liste'])){

		include_once('bdd.php');
		$bdd= connexionBdd();

		if(isset($_POST['listName']) && $_POST['listName']!=''){
			$listName = htmlspecialchars(addslashes(trim($_POST['listName'])));
			updateListName($bdd, $listName, $_POST['idUser'],$_POST['id_liste']);
		}else if(isset($_POST['score']) && isset($_POST['temps'])){
			updateListScore($bdd, $_POST['score'], $_POST['temps'], $_POST['idUser'],$_POST['id_liste']);
		}

		updateListMots($bdd, $_POST['id_liste'], $_POST['tableMots']);
		echo json_encode(getListOfList($bdd, $_POST['idUser']));
	}
?>



