var mot,
	bonneReponse;
var inputReponse = document.getElementById('inputReponse');
var btnValider = document.getElementById('valider');
var btnPasse = document.getElementById('passe');
var validation = document.getElementById('validation');
var form = document.getElementById('test');

genererMot();


/*******************-Fonctions-***************************/

function griserBoutonValider(){
	if(inputReponse.value.length){
		btnValider.className = 'btn btn-default';
	}else{
		btnValider.className = 'btn btn-default disabled';
	}
}

function init(){
	inputReponse.addEventListener('keyup', griserBoutonValider, false);
	btnValider.addEventListener('click', affichageCorrection, false);
	btnPasse.addEventListener('click', genererMot, false);

	validation.className='col-md-1';
	inputReponse.value = '';
	inputReponse.autofocus = true;
	inputReponse.style.color = 'rgb(85, 85, 85)';
	form.className = 'jumbotron text-center';
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
	if(!/disabled/.test(btnValider.className)){
		if(verifierMot(mot, inputReponse.value)){		
			validation.className='col-md-1 glyphicon glyphicon-ok';
			form.className = 'jumbotron text-center has-success';
			setTimeout(genererMot, 1000);
		}else{
			validation.className='col-md-1 glyphicon glyphicon-remove';
			inputReponse.value = bonneReponse;
			inputReponse.style.color = 'red';
			btnValider.className = 'btn btn-default disabled';
			btnValider.removeEventListener('click', affichageCorrection, false);
			inputReponse.removeEventListener('keyup', griserBoutonValider, false);
			form.className = 'jumbotron text-center has-error';
			setTimeout(genererMot, 1000);
		}
	}
}

