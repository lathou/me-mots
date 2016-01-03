var repetition,
	ok = 0,
	ko = 0;

var form = document.getElementById('test');
var motTest = document.getElementById('motTest');
var inputReponse = document.getElementById('inputReponse');
var btnValider = document.getElementById('valider');
var btnPasse = document.getElementById('passe');
var correction = document.getElementById('correction');
var compteurOk = document.getElementById('compteurOk');
var compteurKo = document.getElementById('compteurKo');
var progressBar = document.getElementById('progressBar');
document.addEventListener('keydown', function(e){
	if(e.keyCode === 13){
		e.preventDefault();
	}
}, false);

//Options
var btnOption = document.getElementById('btnOption'),
	fenetreOption = document.getElementById('options-window'),
	fenetreTest = document.getElementById('test-window'),
	inputRepetition = document.getElementById('repetition'),
	langue = document.getElementById('langues'),
	langueChoisie = document.getElementById('langueChoisie');

btnOption.addEventListener('click', function(){
	if(inputRepetition.value.length && inputRepetition.value > 0 && inputRepetition.value <= 10){
		repetition = inputRepetition.value;

		//Initialisation des mots
		function Mot(fr,en,score){
			this.fr = fr;
			this.en = en;
			this.reussite = 0;
			this.ok = 0;
			this.ko = 0;
			if(langue.value === 'en'){
				this.motAAfficher = this.fr;
				this.motADeviner = this.en;
			}else if(langue.value === 'fr'){
				this.motAAfficher = this.en;
				this.motADeviner = this.fr;
			}
		}

		var mot1 = new Mot('soleil', 'sun');
		var mot2 = new Mot('chocolat', 'chocolate');
		var mot3 = new Mot('singe', 'monkey');
		/*var mot4 = new Mot('fauteuil', 'sofa');
		var mot5 = new Mot('stylo', 'pen');
		var mot6 = new Mot('lit', 'bed');
		var mot7 = new Mot('porte', 'door');*/
		mots.push(mot1, mot2, mot3/*, mot4, mot5, mot6, mot7*/);


		//Départ
		fenetreTest.style.display = 'block';
		fenetreOption.style.display = 'none';
		if(langue.value === 'en'){
			langueChoisie.innerHTML = 'Anglais';
		}else if(langue.value === 'fr'){
			langueChoisie.innerHTML = 'Français';
		}

		afficherNouveauMot();
		Score.afficher();				
		init();
	}
}, false);

/*******************-Fonctions-***************************/


function init(){
	inputReponse.addEventListener('keyup', griserBoutonValider, false);
	btnValider.addEventListener('click', afficherCorrection, false);
	btnPasse.addEventListener('click', afficherFaux, false);
	document.addEventListener('keydown', validerParEntree, false);

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
		motTest.innerHTML = ' ';
		desactiverBoutonEtInput();
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