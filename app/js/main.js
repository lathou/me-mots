var repetition, langue, dateDebut, dateFin;

$(document).on('keydown', function(e){
	if(e.keyCode === 13){
		e.preventDefault();
	}
});

$('#btnOption').on('click', function(){
	repetition = $('#repetition').val();
	langue = $('#langues').val();

	if(repetition.length && repetition > 0 && repetition <= 10){		

		//Initialisation des mots
		var mot1 = new Mot('soleil', 'sun');
		var mot2 = new Mot('chocolat', 'chocolate');
		var mot3 = new Mot('singe', 'monkey');
		var mot4 = new Mot('fauteuil', 'sofa');
		/*var mot5 = new Mot('stylo', 'pen');
		var mot6 = new Mot('lit', 'bed');
		var mot7 = new Mot('porte', 'door');*/
		mots.push(mot1, mot2, mot3, mot4/*, mot5, mot6, mot7*/);

		//Départ
		$('#test-window').css('display', 'block');
		$('#options-window').css('display', 'none');
		
		if( langue === 'en'){
			$('#langueChoisie').html('Anglais');
		}else if(langue === 'fr'){
			$('#langueChoisie').html('Français');
		}

		$('#inputReponse').on('keyup', griserBoutonValider);
		$('#valider').on('click', afficherCorrection);
		$('#inputReponse').on('keydown', validerParEntree);
		$('#passe').on('click', afficherFaux);

		dateDebut = new Date();
		afficherNouveauMot();
		Score.afficher();				
	}
});

/*******************-Fonctions-***************************/

//Test

function init(){
	$('#test').removeClass('has-success').removeClass('has-error');
	$('#correction').removeClass('glyphicon glyphicon-ok').removeClass('glyphicon glyphicon-remove');
	$('#inputReponse').val('').css('color','#555555').removeAttr('disabled').focus();	
	$('#valider').attr('disabled','disabled');
	$('#passe').removeAttr('disabled');
}

function validerParEntree(e){
	if(e.keyCode === 13){
		afficherCorrection();
	}
}

function griserBoutonValider(){
	if($('#inputReponse').val()){
		$('#valider').removeAttr('disabled');
	}else{
		$('#valider').attr('disabled','disabled');
	}
}

function desactiverBoutonEtInput(){
	$(document).off('keydown',validerParEntree);
	$('#inputReponse').attr('disabled','disabled');
	$('#valider').attr('disabled','disabled');
	$('#passe').attr('disabled','disabled');
}

function afficherNouveauMot(){	
	init();
	if(mots.length >= 1){
		$('#motTest').html(Dictionnaire.genererMot().motAAfficher);
	}else{
		afficherResultats();
	}	
}

function afficherCorrection(){
	var saisie = $('#inputReponse').val();

	if (Dictionnaire.isCorrect(saisie)){		
		afficherVrai();		
	}else{		
		afficherFaux();		
	}	
}

function afficherVrai(){	
	desactiverBoutonEtInput();
	$('#correction').addClass('glyphicon glyphicon-ok');
	$('#test').addClass('has-success');
	
	Score.augmenter();
	Score.afficher();
	setTimeout(afficherNouveauMot, 1000);
}

function afficherFaux(){	
	desactiverBoutonEtInput();	
	$('#correction').addClass('glyphicon glyphicon-remove');
	$('#inputReponse').val(MotCourant.motADeviner).css('color','red');
	$('#test').addClass('has-error');
	
	Score.diminuer();
	Score.afficher();
	setTimeout(afficherNouveauMot, 1000);
}

//Resultats
function afficherResultats(){
	var bon = document.getElementById('bon'),
		moyen = document.getElementById('moyen'),
		mauvais = document.getElementById('mauvais'),
		temps = document.getElementById('temps');
	dateFin = new Date();
	$('#test-window').css('display', 'none');
	$('#resultat-window').css('display','block');

	Score.classerResultats().forEach(function(mot){
		if(mot.score>=0.8){
			bon.innerHTML += '<p>' + mot.motAAfficher + ' : '+ mot.motADeviner + '</p>';
		}else if (mot.score<0.7 && mot.score>=0.5){
			moyen.innerHTML += '<p>' + mot.motAAfficher + ' : '+ mot.motADeviner + '</p>';
		}else if(mot.score < 0.5){
			mauvais.innerHTML += '<p>' + mot.motAAfficher + ' : '+ mot.motADeviner + '</p>';
		}
	});
	temps.innerHTML += '<p>'+ Score.getTemps(dateFin, dateDebut)+ '</p>';
}

