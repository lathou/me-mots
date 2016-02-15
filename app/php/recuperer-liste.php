<?php
	
	if(isset($_POST['idUser']) && isset($_POST['idListe'])){
		include_once('bdd.php');
		$bdd = connexionBdd();
		
		$req = $bdd->prepare('SELECT nom, langue, score, temps FROM listes WHERE id_liste=:id_liste AND id_membre=:id_membre');
		$req -> execute(array('id_liste'=> $_POST['idListe'],
							 'id_membre' => $_POST['idUser']));
		$infos = $req-> fetch();
		$req->closeCursor();
		
		if($infos){
			$req = $bdd->query('SELECT * FROM liste'.$_POST['idListe']); 
			$mots = $req-> fetchAll();

			$array = array('infos'=>$infos, 'mots'=>$mots);
			echo json_encode($array);
		}		
	}
?>