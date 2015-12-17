var mot;
genererMot();





var btnPasse = document.getElementById('passe');
btnPasse.addEventListener('click', function(){
	var ancienMot = mot;
	while(mot === ancienMot){
		genererMot();
	}
} , false);




function genererMot(){
	var mots = ['soleil', 'chocolat', 'singe', 'fauteuil'];	
	mot = mots[Math.floor(Math.random()*mots.length)];

	var motTest = document.getElementById('motTest');
	motTest.innerHTML = mot;
}

