<?php
if(isset($_POST['inscription-pseudo']) AND isset($_POST['inscription-mail']) AND isset($_POST['langue-origine']) AND isset($_POST['inscription-mp'])){
	include_once('bdd.php');

    $pseudo = htmlspecialchars(addslashes(trim($_POST['inscription-pseudo'])));
    $mail = htmlspecialchars(addslashes(trim($_POST['inscription-mail'])));
    $langueOrigine = htmlspecialchars(addslashes(trim($_POST['langue-origine'])));
    $mp = htmlspecialchars(addslashes(trim($_POST['inscription-mp'])));
    $array = array('pseudoMessage' => '', 'mailMessage' => '', 'mpMessage' => '', 'langueMessage'=>'', 'succes'=>'');
    $bdd = connexionBdd();

    verifierPseudo($bdd,$pseudo);
    verifierMail($bdd,$mail);
    verifierMp($bdd,$mp);
    verifierLangue($bdd, $langueOrigine);

    if(verifierPseudo($bdd,$pseudo) && verifierMail($bdd,$mail) && verifierMp($bdd,$mp)){
		$array['success'] = creerMembre($bdd, $pseudo, $mp, $mail, $langueOrigine);
    }

    echo json_encode($array);
}

function verifierPseudo($bdd, $pseudo){
    $req = $bdd->query('SELECT pseudo FROM membres');
    $pseudos_bdd = $req-> fetchAll();
	$req->closeCursor();
	$presencePseudo = 0;
	foreach($pseudos_bdd as $entree=>$user){
		if($user['pseudo'] == $pseudo){
			$presencePseudo++;
		}
	}

	if($presencePseudo>0){
		global $array;
		$array['pseudoMessage'] = 'Ce pseudo existe déjà, veuillez en choisir un autre';
		return false;
	}else{
		return true;
	}
}

function verifierMail($bdd, $mail){
	if(!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
		global $array;
        $array['mailMessage'] = 'Email invalide!';
        return false;
    }else{
	  	$req = $bdd->query('SELECT mail FROM membres');
	    $mails_bdd = $req-> fetchAll();
		$req->closeCursor();
		$presenceMail = 0;
		foreach($mails_bdd as $entree=>$user){	
			if($user['mail'] == $mail){
				$presenceMail++;
			}
		}
		if($presenceMail>0){
			global $array;
			$array['mailMessage']= 'Vous avez déjà un compte';
			return false;
		}else{
		    return true;
		}
	}
}

function verifierMp($bdd, $mp){
	if (strlen($mp)<5){
		global $array;
    	$array['mpMessage']= 'Veuillez entrer au moins 5 caractères';
    	return false;
    }else{
    	return true;
    }
}

function verifierLangue($bdd, $langue){
	if($langue==''){
		global $array;
    	$array['langueMessage']= 'Veuillez choisir votre langue d\'origine';
    	return false;
	}else{
		return true;
	}
}
?>