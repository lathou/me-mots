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
		MotCourant.reussite++;
		MotCourant.ok++;

		if(MotCourant.reussite >= repetition){
			mots.splice(mots.indexOf(MotCourant),1);
			motsValides.push(MotCourant);
		}
	},

	diminuer : function(){
		ko++;
		MotCourant.reussite = 0;
		MotCourant.ko++;
	}
}