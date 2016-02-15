var motsValides = [],
	ok = 0,
	ko = 0;

var Score = {
	afficher : function(){
		$('#compteurOk').html( ok + ' <span class="glyphicon glyphicon-ok"></span>');
		$('#compteurKo').html(ko + ' <span class="glyphicon glyphicon-remove"></span>');
		if(ok===0){
			$('#progressBar').attr('aria-valuenow', '0');
			$('#progressBar').css('width','0%');
		}else{
			$('#progressBar').attr('aria-valuenow', ok*100/(ok+ko));
			$('#progressBar').css('width', (ok*100/(ok+ko))+'%');
		}	
	},

	augmenter : function(){
		ok++;
		MotCourant.ok++;

		if(MotCourant.ok >= sessionStorage.optionRepetition){
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
			mot.score = mot.ok*100/(mot.ko+mot.ok);
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
		var temps = zero(minutes) + 'min ' + zero(secondes) + 's ';
		return temps;
	},

	getScore : function(){
		return(Math.floor(ok*100/(ok+ko)));
	}
}