	function lancerTest(){
		$(document).on('keydown', function(e){
			if(e.keyCode === 13){
				e.preventDefault();
			}
		});

		//Initialisation des mots
		JSON.parse(sessionStorage.currentMots).forEach(function(mot){
			var mot = new Mot(mot.motLangueOrigine, mot.motLangue2);
			mots.push(mot);
		})

		//Départ
		if(sessionStorage.optionLangue === 'option-langue1'){
			$('#langueChoisie').html(sessionStorage.currentLangue);
		}else if(sessionStorage.optionLangue === 'option-langue2'){
			$('#langueChoisie').html(sessionStorage.langueOrigine);
		}
		

		$('#inputReponse').on('keyup', griserBoutonValider);
		$('#valider').on('click', afficherCorrection);
		$('#inputReponse').on('keydown', validerParEntree);
		$('#passe').on('click', afficherFaux);

		dateDebut = new Date();
		afficherNouveauMot();
		Score.afficher();	
	}

	/*******************-Fonctions-***************************/

	//Test
	function init(){
		$('#correction').removeClass('glyphicon glyphicon-ok').removeClass('glyphicon glyphicon-remove');
		$('#inputReponse').val('').css('color','#555555').removeAttr('disabled').removeClass('has-success').removeClass('has-error').focus();	
		$('#valider').attr('disabled','disabled');
		$('#passe').removeAttr('disabled');
	}

	function validerParEntree(e){
		if(e.keyCode === 13){
			afficherCorrection();
		}
	}

	function griserBoutonValider(){
		if($('#inputReponse').val()){
			$('#valider').removeAttr('disabled');
		}else{
			$('#valider').attr('disabled','disabled');
		}
	}

	function desactiverBoutonEtInput(){
		$(document).off('keydown',validerParEntree);
		$('#inputReponse').attr('disabled','disabled');
		$('#valider').attr('disabled','disabled');
		$('#passe').attr('disabled','disabled');
	}

	function afficherNouveauMot(){	
		init();
		if(mots.length >= 1){
			$('#motTest').html(Dictionnaire.genererMot().motAAfficher);
		}else{
			desactiverBoutonEtInput();
			enregistrerScore();
		}	
	}

	function afficherCorrection(){
		var saisie = $('#inputReponse').val();

		if (Dictionnaire.isCorrect(saisie)){		
			afficherVrai();		
		}else{		
			afficherFaux();		
		}	
	}

	function afficherVrai(){	
		desactiverBoutonEtInput();
		$('#correction').addClass('glyphicon glyphicon-ok');
		$('#inputReponse').addClass('has-success');
		
		Score.augmenter();
		Score.afficher();
		setTimeout(afficherNouveauMot, 1000);
	}

	function afficherFaux(){	
		desactiverBoutonEtInput();	
		$('#correction').addClass('glyphicon glyphicon-remove');
		$('#inputReponse').val(MotCourant.motADeviner).css('color','#D9534F').addClass('has-error');
		
		Score.diminuer();
		Score.afficher();
		setTimeout(afficherNouveauMot, 1000);
	}

	function enregistrerScore(){
		dateFin = new Date();

		Bdd.enregistrerScoreListe(Score.getScore(), Score.getTemps(dateFin, dateDebut), sessionStorage.id, sessionStorage.currentList,JSON.stringify(Score.classerResultats()),
		function technicalErrorCallback(){
			afficherErreur($('.list .page-content .btn:first'));
		}, function successCallback(){
			document.location.href='liste.html';
		})
	}

