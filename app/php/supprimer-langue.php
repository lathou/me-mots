<?php
if(isset($_POST['id']) && isset($_POST['langues']) && isset($_POST['langue'])){

	include_once('bdd.php');
	$bdd = connexionBdd();
	$array = array('success'=> updateListLangues($bdd, $_POST['id'], $_POST['langues']));

	$req = $bdd->prepare('SELECT id_liste FROM listes WHERE id_membre=:id_membre AND langue=:langue');
	$req -> execute(array('langue' => $_POST['langue'],'id_membre' => $_POST['id']));
	$listes = $req-> fetchAll();
	$req->closeCursor();

	if($listes){	
		foreach( $listes as $liste){
			deleteList($bdd, $liste['id_liste'], $_POST['id']);
		}			
	}

	$array['listOfList'] = getListOfList($bdd, $_POST['id']);	
	echo json_encode($array);		
}
?>