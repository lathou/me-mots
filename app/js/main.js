var mot,
	bonneReponse,
	ok = 0,
	ko = 0;
var inputReponse = document.getElementById('inputReponse');
var btnValider = document.getElementById('valider');
var btnPasse = document.getElementById('passe');
var correction = document.getElementById('correction');
var form = document.getElementById('test');
var compteurOk = document.getElementById('compteurOk');
var compteurKo = document.getElementById('compteurKo');
var progressBar = document.getElementById('progressBar');

miseAJourResultats();
genererMot();


/*******************-Fonctions-***************************/


function init(){
	inputReponse.addEventListener('keyup', griserBoutonValider, false);
	btnValider.addEventListener('click', affichageCorrection, false);
	btnPasse.addEventListener('click', affichageCorrection, false);

	correction.className='col-md-1';
	inputReponse.value = '';
	inputReponse.autofocus = true;
	inputReponse.style.color = 'rgb(85, 85, 85)';
	btnValider.disabled = true;
	form.className = 'jumbotron text-center';
}

function griserBoutonValider(){
	if(inputReponse.value.length){
		btnValider.className = 'btn btn-default';
		btnValider.disabled = false;
	}else{
		btnValider.className = 'btn btn-default disabled';
		btnValider.disabled = true;
	}
}

function genererMot(){	
	init();

	var mots = [{mot: 'soleil', traduction: 'sun'}, {mot: 'chocolat', traduction: 'chocolate'}, 
	{mot: 'singe', traduction: 'monkey'}, {mot: 'fauteuil', traduction: 'sofa'}];
	var ancienMot = mot;
	while(mot === ancienMot || !mot){
		mot = mots[Math.floor(Math.random()*mots.length)].mot;

		var motTest = document.getElementById('motTest');
		motTest.innerHTML = mot;
	}
}

function verifierMot(mot, saisie){
	var mots = [{mot: 'soleil', traduction: 'sun'}, {mot: 'chocolat', traduction: 'chocolate'}, 
	{mot: 'singe', traduction: 'monkey'}, {mot: 'fauteuil', traduction: 'sofa'}];
	var verifie = false;

	mots.forEach(function(value, id, array){
		if (mot === mots[id].mot){
			if(saisie.toLowerCase() === mots[id].traduction.toLowerCase()){
				verifie = true;
			}else{
				bonneReponse = mots[id].traduction;
			}
		}
	});
	return verifie;	
}

function affichageCorrection(){
		if(verifierMot(mot, inputReponse.value)){		
			correction.className='col-md-1 glyphicon glyphicon-ok';
			form.className = 'jumbotron text-center has-success';
			ok++;
			setTimeout(genererMot, 1000);
			
		}else{
			correction.className='col-md-1 glyphicon glyphicon-remove';
			inputReponse.value = bonneReponse;
			inputReponse.style.color = 'red';
			btnValider.className = 'btn btn-default disabled';
			btnValider.removeEventListener('click', affichageCorrection, false);
			inputReponse.removeEventListener('keyup', griserBoutonValider, false);
			form.className = 'jumbotron text-center has-error';
			ko++;
			setTimeout(genererMot, 1000);			
		}
	miseAJourResultats();
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

