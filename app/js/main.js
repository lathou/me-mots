var mots = [],
	MotCourant,
	repetition,
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


document.addEventListener('keydown',function(e){
	if(e.keyCode === 13){
		e.preventDefault();
		affichageCorrection();
	}
}, false);

//Initialisation des mots
function Mot(fr,en,score){
	this.fr = fr;
	this.en = en;
	this.score = 0;
}

var mot1 = new Mot('soleil', 'sun');
var mot2 = new Mot('chocolat', 'chocolate');
var mot3 = new Mot('singe', 'monkey');
/*var mot4 = new Mot('fauteuil', 'sofa');
var mot5 = new Mot('stylo', 'pen');
var mot6 = new Mot('lit', 'bed');
var mot7 = new Mot('porte', 'door');*/
mots.push(mot1, mot2, mot3/*, mot4, mot5, mot6, mot7*/);

//Options
var btnOption = document.getElementById('btnOption'),
	fenetreOption = document.getElementById('options-window'),
	fenetreTest = document.getElementById('test-window'),
	inputRepetition = document.getElementById('repetition');
	
btnOption.addEventListener('click', function(){
	if(inputRepetition.value.length && inputRepetition.value > 0 && inputRepetition.value <= 10){
		repetition = inputRepetition.value;	
		fenetreTest.style.display = 'block';
		fenetreOption.style.display = 'none';
		miseAJourResultats();
		genererMot();
	}
}, false);

/*******************-Fonctions-***************************/


function init(){
	inputReponse.addEventListener('keyup', griserBoutonValider, false);
	btnValider.addEventListener('click', affichageCorrection, false);
	btnPasse.addEventListener('click', afficheFaux, false);

	form.className = 'jumbotron text-center';
	correction.className='col-md-1';
	inputReponse.value = '';	
	inputReponse.style.color = '#555555';
	inputReponse.disabled = false;
	inputReponse.focus();
	btnValider.disabled = true;
	btnPasse.disabled = false;	
}

function griserBoutonValider(){
	if(inputReponse.value.length){
		btnValider.disabled = false;
	}else{
		btnValider.disabled = true;
	}
}

function genererMot(){	
	init();
	if(mots.length>1){
		var ancienMot = MotCourant;
		while(MotCourant === ancienMot || !MotCourant){
			MotCourant = mots[Math.floor(Math.random()*mots.length)];
		}

	} else if(mots.length === 1){
		MotCourant = mots[0];		

	}else if(mots.length === 0){
		desactiverBoutonEtInput();
		MotCourant.fr = ' ';
	}

	motTest.innerHTML = MotCourant.fr;
}

function affichageCorrection(){
		if(inputReponse.value.toLowerCase() === MotCourant.en.toLowerCase()){		
			afficheVrai();			
		}else{
			afficheFaux();
		}	
}

function afficheVrai(){
	desactiverBoutonEtInput();
	correction.className='col-md-1 glyphicon glyphicon-ok';
	form.className = 'jumbotron text-center has-success';
	ok++;
	MotCourant.score ++;
	console.log(MotCourant.fr + ' ' + MotCourant.score);
	if(MotCourant.score >= repetition){
		mots.splice(mots.indexOf(MotCourant),1);
	}

	setTimeout(genererMot, 1000);
	miseAJourResultats();
}

function afficheFaux(){
	desactiverBoutonEtInput();	
	correction.className='col-md-1 glyphicon glyphicon-remove';
	inputReponse.value = MotCourant.en;
	inputReponse.style.color = 'red';
	form.className = 'jumbotron text-center has-error';
	ko++;
	MotCourant.score = 0;
	setTimeout(genererMot, 1000);
	miseAJourResultats();	
}
		
function desactiverBoutonEtInput(){
	btnValider.removeEventListener('click', affichageCorrection, false);
	btnPasse.removeEventListener('click', affichageCorrection, false);
	inputReponse.disabled = true;
	btnValider.disabled = true;
	btnPasse.disabled = true;
}

function miseAJourResultats(){
	compteurOk.innerHTML = ok + ' <span class="glyphicon glyphicon-ok"></span>';
	compteurKo.innerHTML = ko + ' <span class="glyphicon glyphicon-remove"></span>';
	if(ok===0){
		progressBar.setAttribute('aria-valuenow', 0);
		progressBar.style.width = '0%';
	}else{
		progressBar.setAttribute('aria-valuenow', ok*100/(ok+ko));
		progressBar.style.width = ok*100/(ok+ko) +'%';
	}
}

