var mots = [],
	MotCourant;

function Mot(fr,en,score){
	this.fr = fr;
	this.en = en;
	this.ok = 0;
	this.ko = 0;
	this.score=0;
	if(langue === 'en'){
		this.motAAfficher = this.fr;
		this.motADeviner = this.en;
	}else if(langue === 'fr'){
		this.motAAfficher = this.en;
		this.motADeviner = this.fr;
	}

	this.getPoids = function(){
		return repetition - this.ok;
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

			var motsAvecPoids = [];
			mots.forEach(function(mot){
				for (var i = 0; i<mot.getPoids(); i++){
					motsAvecPoids.push(mot);
				}
			});

			while(MotCourant === ancienMot || !MotCourant){
				MotCourant = motsAvecPoids[Math.floor(Math.random()*motsAvecPoids.length)];
			}
		} else if(mots.length === 1){
			MotCourant = mots[0];	
		}

		return MotCourant;
	}
}