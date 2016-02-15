<?php
if(isset($_POST['mail']) && isset($_POST['mp'])){
	include_once('bdd.php');
	
	$mail = htmlspecialchars(addslashes(trim($_POST['mail'])));
	$mp = sha1(htmlspecialchars(addslashes(trim($_POST['mp']))));
	$bdd = connexionBdd();
	$session = getSessionMembre($bdd, $mail, $mp);

	if(!$session['id']){
		echo json_encode('ko');
	}else{	
		$session['listes'] = getListOfList($bdd, $session['id']);
		echo json_encode($session);
	}
}

?>