var mots = [],
	MotCourant;

var Dictionnaire = {
	isCorrect : function(saisie){
		var motADeviner = MotCourant.motADeviner;

		if(saisie.toLowerCase().trim() === motADeviner.toLowerCase().trim()){		
			return true;			
		}else{
			return false;
		}
	},

	genererMot : function(){
		if(mots.length>1){
			var ancienMot = MotCourant;
			while(MotCourant === ancienMot || !MotCourant){
				MotCourant = mots[Math.floor(Math.random()*mots.length)];
			}
		} else if(mots.length === 1){
			MotCourant = mots[0];	
		}

		return MotCourant;
	}
}