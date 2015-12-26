var mot,
	bonneReponse,
	ok = 0,
	ko = 0;

var mots = [{mot: 'soleil', traduction: 'sun'}, {mot: 'chocolat', traduction: 'chocolate'}, 
	{mot: 'singe', traduction: 'monkey'}, {mot: 'fauteuil', traduction: 'sofa'}, {mot: 'stylo', traduction: 'pen'}, 
	{mot: 'lit', traduction: 'bed'}, {mot: 'porte', traduction: 'door'}];

var form = document.getElementById('test');
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

miseAJourResultats();
genererMot();


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
	var ancienMot = mot;
	while(mot === ancienMot || !mot){
		mot = mots[Math.floor(Math.random()*mots.length)].mot;

		var motTest = document.getElementById('motTest');
		motTest.innerHTML = mot;
	}
}

function affichageCorrection(){
		bonneReponse = reponseExact();
		if(bonneReponse.toLowerCase() === inputReponse.value.toLowerCase()){		
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
	setTimeout(genererMot, 1000);
	miseAJourResultats();
}

function afficheFaux(){
	desactiverBoutonEtInput();	
	correction.className='col-md-1 glyphicon glyphicon-remove';
	inputReponse.value = reponseExact();
	inputReponse.style.color = 'red';
	form.className = 'jumbotron text-center has-error';
	ko++;
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


function reponseExact(){
	mots.forEach(function(value, id, array){
		if (mot === mots[id].mot){
			bonneReponse = mots[id].traduction;
		}
	});
	return bonneReponse;	
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

