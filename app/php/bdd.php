<?php

	function connexionBdd(){
		try{	
			$bdd = new PDO('mysql:host=localhost;dbname=memots','root','');
		}catch(Exception $e){
			die('Erreur:'.$e->getMessage());
		}
		return($bdd);
	}

	function creerMembre($bdd, $pseudo, $mp, $mail, $langueOrigine){
		$req = $bdd->prepare('INSERT INTO membres (pseudo,mp,mail,langueOrigine, date_inscription) VALUES (:pseudo, :mp, :mail, :langue, NOW())');
		$success=$req->execute(array('pseudo'=>$pseudo, 
							'mp'=>sha1($mp), 
							'mail'=> $mail, 
							'langue' =>$langueOrigine));
		return($success);
	}

	function creerListe($bdd, $id_membre, $langue, $langueOrigine, $listName){
		$req = $bdd->prepare('INSERT INTO listes (id_membre, langue, langueOrigine, nom, date_creation) VALUES (:id_membre, :langue, :langueOrigine, :nom, NOW())');
		$req -> execute(array('id_membre' => $id_membre,
								'langue' => $langue,
								'langueOrigine' => $langueOrigine,
								'nom' => $listName));
		$req->closeCursor();
	}

	function creerTableListe($bdd, $id_liste){
		$sql='CREATE TABLE liste'.$id_liste.' (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,motLangueOrigine VARCHAR(100), motLangue2 VARCHAR(100), score DECIMAL)';
		$req =$bdd->query($sql);
		$req->closeCursor();
	}

	function creerMot($bdd, $id_liste, $mot){
		$req = $bdd->prepare('INSERT INTO liste'.$id_liste.'(motLangueOrigine, motLangue2) VALUES (:motLangueOrigine, :motLangue2)');	
		$req -> execute(array('motLangueOrigine' => htmlspecialchars(addslashes(trim($mot->motLangueOrigine))),
								'motLangue2' => htmlspecialchars(addslashes(trim($mot->motLangue2))) ));	
		$req->closeCursor();
	}

	function getSessionMembre($bdd, $mail, $mp){
		$req = $bdd->prepare('SELECT *, DATE_FORMAT(date_inscription, "%d/%m/%Y") AS date_inscription FROM membres WHERE mail=:mail AND mp=:mp');
		$req -> execute(array('mail' =>$mail,
								'mp'=>$mp));
		$session = $req-> fetch();
		$req->closeCursor();
		return($session);
	}

	function getListOfLangues($bdd, $id_membre){
		$req = $bdd->prepare('SELECT langues FROM membres WHERE id=?');
		$req -> execute(array($id_membre));
		$listeLangues = $req-> fetch();
		$req->closeCursor();

		return($listeLangues);
	}

	function getListOfList($bdd, $id_membre){
		$req = $bdd->prepare('SELECT * FROM listes WHERE id_membre =:id_membre');
		$req -> execute(array('id_membre' => $id_membre));
		$listOfList = $req-> fetchAll();
		$req->closeCursor();

		return($listOfList);
	}

	function updateListLangues($bdd, $id_membre, $listeLangues){
		$req = $bdd->prepare('UPDATE membres SET langues=:langues WHERE id=:id');
		$success = $req -> execute(array('langues' => $listeLangues,'id' => $id_membre));
		$req->closeCursor();

		return($success);
	}

	function updateListScore($bdd, $listScore, $listTime, $id_membre, $id_liste){
		$req = $bdd->prepare('UPDATE listes SET score = :score, temps = :temps  WHERE id_membre =:id_membre AND id_liste=:id_liste');
		$req -> execute(array('score' => $listScore,
								'temps' =>$listTime,
								'id_membre' => $id_membre,
								'id_liste' => $id_liste));
		$req->closeCursor();
	}

	function updateListName($bdd, $listName, $id_membre, $id_liste){
		$req = $bdd->prepare('UPDATE listes SET nom = :nom WHERE id_membre =:id_membre AND id_liste=:id_liste');
		$req -> execute(array('nom' => $listName,
								'id_membre' => $id_membre,
								'id_liste' => $id_liste));
		$req->closeCursor();
	}
	
	function updateListMots($bdd, $id_liste, $tableMots){
		$req = $bdd->query('TRUNCATE TABLE liste'.$id_liste);
		$req-> closeCursor();
	
		foreach(json_decode($tableMots) as $mot){
			$req = $bdd->prepare('INSERT INTO liste'.$id_liste.'(motLangueOrigine, motLangue2, score) VALUES (:motLangueOrigine, :motLangue2, :score)');	
			$req -> execute(array('motLangueOrigine' => htmlspecialchars(addslashes(trim($mot->motLangueOrigine))),
									'motLangue2' => htmlspecialchars(addslashes(trim($mot->motLangue2))),
									'score'=> $mot->score ));	
			$req->closeCursor();
		}
	}

	function deleteList($bdd, $id_liste, $id_membre){
		$req = $bdd->prepare('DELETE FROM listes WHERE id_liste =:id_liste AND id_membre=:id_membre');
		$delete = $req -> execute(array('id_liste' => $id_liste, 'id_membre'=> $id_membre));
		$req->closeCursor();

		if($delete){
			$req = $bdd->query('DROP TABLE liste'.$id_liste);
		}	
	}
?>



