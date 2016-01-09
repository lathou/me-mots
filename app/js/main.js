var repetition, dateDebut, dateFin;

//Pages
var fenetreOption = document.getElementById('options-window'),
	fenetreTest = document.getElementById('test-window'),
	fenetreResultat = document.getElementById('resultat-window'),
	bon = document.getElementById('bon'),
	moyen = document.getElementById('moyen'),
	mauvais = document.getElementById('mauvais'),
	temps = document.getElementById('temps');

var form = document.getElementById('test'),
	motTest = document.getElementById('motTest'),
	inputReponse = document.getElementById('inputReponse'),
	btnValider = document.getElementById('valider'),
	btnPasse = document.getElementById('passe'),
	correction = document.getElementById('correction');

document.addEventListener('keydown', function(e){
	if(e.keyCode === 13){
		e.preventDefault();
	}
}, false);

//Options
var btnOption = document.getElementById('btnOption'),
	inputRepetition = document.getElementById('repetition'),
	langue = document.getElementById('langues'),
	langueChoisie = document.getElementById('langueChoisie');

btnOption.addEventListener('click', function(){
	if(inputRepetition.value.length && inputRepetition.value > 0 && inputRepetition.value <= 10){
		repetition = inputRepetition.value;

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
		fenetreTest.style.display = 'block';
		fenetreOption.style.display = 'none';
		if(langue.value === 'en'){
			langueChoisie.innerHTML = 'Anglais';
		}else if(langue.value === 'fr'){
			langueChoisie.innerHTML = 'Français';
		}
		dateDebut = new Date();
		afficherNouveauMot();
		Score.afficher();				
	}
}, false);

/*******************-Fonctions-***************************/

//Test

function init(){
	inputReponse.addEventListener('keyup', griserBoutonValider, false);
	btnValider.addEventListener('click', afficherCorrection, false);
	document.addEventListener('keydown', validerParEntree, false);
	btnPasse.addEventListener('click', afficherFaux, false);

	form.className = 'jumbotron text-center';
	correction.className='col-md-1';
	inputReponse.value = '';	
	inputReponse.style.color = '#555555';
	inputReponse.disabled = false;
	inputReponse.focus();
	btnValider.disabled = true;
	btnPasse.disabled = false;	
}

function validerParEntree(e){
	if(e.keyCode === 13){
		afficherCorrection();
	}
}

function griserBoutonValider(){
	if(inputReponse.value.length){
		btnValider.disabled = false;
	}else{
		btnValider.disabled = true;
	}
}

function desactiverBoutonEtInput(){
	btnValider.removeEventListener('click', afficherCorrection, false);
	btnPasse.removeEventListener('click', afficherFaux, false);
	document.removeEventListener('keydown',validerParEntree, false);
	inputReponse.disabled = true;
	btnValider.disabled = true;
	btnPasse.disabled = true;
}

function afficherNouveauMot(){	
	init();
	if(mots.length >= 1){
		motTest.innerHTML = Dictionnaire.genererMot().motAAfficher;
	}else{
		afficherResultats();
	}	
}

function afficherCorrection(){
	var saisie = inputReponse.value;

	if (Dictionnaire.isCorrect(saisie)){		
		afficherVrai();		
	}else{		
		afficherFaux();		
	}	
}

function afficherVrai(){	
	desactiverBoutonEtInput();
	correction.className='col-md-1 glyphicon glyphicon-ok';
	form.className = 'jumbotron text-center has-success';
	
	Score.augmenter();
	Score.afficher();
	setTimeout(afficherNouveauMot, 1000);
}

function afficherFaux(){	
	desactiverBoutonEtInput();	
	correction.className='col-md-1 glyphicon glyphicon-remove';
	inputReponse.value = MotCourant.motADeviner;
	inputReponse.style.color = 'red';
	form.className = 'jumbotron text-center has-error';
	
	Score.diminuer();
	Score.afficher();
	setTimeout(afficherNouveauMot, 1000);
}

//Resultats
function afficherResultats(){
	dateFin = new Date();
	fenetreTest.style.display = 'none';
	fenetreResultat.style.display = 'block';

	Score.classerResultats().forEach(function(mot){
		if(mot.score>=0.8){
			bon.innerHTML += '<p>' + mot.motAAfficher + ' : '+ mot.motADeviner + '</p>';
		}else if (mot.score<0.7 && mot.score>=0.5){
			moyen.innerHTML += '<p>' + mot.motAAfficher + ' : '+ mot.motADeviner + '</p>';
		}else if(mot.score < 0.5){
			mauvais.innerHTML += '<p>' + mot.motAAfficher + ' : '+ mot.motADeviner + '</p>';
		}
	});
	console.log(dateFin-dateDebut);
	temps.innerHTML += '<p>'+ Score.getTemps(dateFin, dateDebut)+ '</p>';
	

}

