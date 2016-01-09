var motsValides = [],
	ok = 0,
	ko = 0;

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
			console.log(mot.score);
		});

		var motsValidesTries = motsValides.sort(function (a, b) {
		    if (a.score> b.score)
		      return 1;
		    if (a.score < b.score)
		      return -1;
		    // a doit être égale à b
		    return 0;
		});

		return motsValidesTries;
	}
}