var mots = [],
	MotCourant;

function Mot(motLangueOrigine,motLangue2,score){
	this.motLangueOrigine = motLangueOrigine;
	this.motLangue2 = motLangue2;
	this.ok = 0;
	this.ko = 0;
	this.score=0;
	if(sessionStorage.optionLangue === 'Anglais'){
		this.motAAfficher = this.motLangueOrigine;
		this.motADeviner = this.motLangue2;
	}else if(sessionStorage.optionLangue === 'Français'){
		this.motAAfficher = this.motLangue2;
		this.motADeviner = this.motLangueOrigine;
	}

	this.getPoids = function(){
		return sessionStorage.optionRepetition - this.ok;
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