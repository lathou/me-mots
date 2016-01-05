var mots = [],
	MotCourant;

function Mot(fr,en,score){
	this.fr = fr;
	this.en = en;
	this.reussite = 0;
	this.ok = 0;
	this.ko = 0;
	if(langue.value === 'en'){
		this.motAAfficher = this.fr;
		this.motADeviner = this.en;
	}else if(langue.value === 'fr'){
		this.motAAfficher = this.en;
		this.motADeviner = this.fr;
	}
}

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