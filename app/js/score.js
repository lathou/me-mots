var motsValides = [],
	ok = 0,
	ko = 0;

var compteurOk = document.getElementById('compteurOk'),
	compteurKo = document.getElementById('compteurKo'),
	progressBar = document.getElementById('progressBar');


var Score = {
	afficher : function(){
		compteurOk.innerHTML = ok + ' <span class="glyphicon glyphicon-ok"></span>';
		compteurKo.innerHTML = ko + ' <span class="glyphicon glyphicon-remove"></span>';
		if(ok===0){
			progressBar.setAttribute('aria-valuenow', 0);
			progressBar.style.width = '0%';
		}else{
			progressBar.setAttribute('aria-valuenow', ok*100/(ok+ko));
			progressBar.style.width = ok*100/(ok+ko) +'%';
		}	
	},

	augmenter : function(){
		ok++;
		MotCourant.ok++;

		if(MotCourant.ok >= repetition){
			mots.splice(mots.indexOf(MotCourant),1);
			motsValides.push(MotCourant);
		}
	},

	diminuer : function(){
		ko++;
		MotCourant.ko++;
	},

	classerResultats : function(){
		motsValides.forEach(function(mot){
			mot.score = mot.ok/(mot.ko+mot.ok);
		});

		var motsValidesTries = motsValides.sort(function (a, b) {
		    if (a.score> b.score){
		    	return 1;
		    }else if (a.score < b.score){
		    	return -1;
		    }else{
		    	return 0;
		    }   
		});

		return motsValidesTries;
	},

	getTemps : function(dateFin, dateDebut){
		var secondes = Math.floor((dateFin-dateDebut)/1000);
		var minutes = Math.floor(secondes/60);
		secondes = secondes - minutes*60;
		var temps = minutes + 'min ' + secondes + 's ';
		return temps;
	}
}