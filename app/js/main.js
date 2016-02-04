

	/********************ACCUEIL*******************/

	$('.go-inscription').on('click', function(){
		$('.connexion').hide();
		$('.inscription').show('slow');
	});

	$('.go-connexion').on('click', function(){
		$('.inscription').hide();
		$('.connexion').show('slow');
	});

	$('.inscription form').submit(function(e) {
		e.preventDefault();
	    $('.error-message').remove();
	    $('#inscription-pseudo, #inscription-mail, #inscription-mp').removeClass('has-error');
	    var postdata = $('.inscription form').serialize();
	    $.ajax({
	        type: 'POST',
	        url: 'php/inscription.php',
	        data: postdata,
	        dataType: 'json',
	        success: function(json) {	
	        console.log(json);        	
	            if(json.pseudoMessage != '') {
	                $('#inscription-pseudo').addClass('has-error').after('<p class="error-message">' + json.pseudoMessage + '</p>');
	            }
	            if(json.mailMessage != '') {
	                $('#inscription-mail').addClass('has-error').after('<p class="error-message">' + json.mailMessage + '</p>');
	            }
	            if(json.mpMessage != ''){
	                $('#inscription-mp').addClass('has-error').after('<p class="error-message">' + json.mpMessage + '</p>');
	            }
	            if(json.langueMessage != ''){
	                $('#langue-origine').addClass('has-error').after('<p class="error-message">' + json.langueMessage + '</p>');
	            }
	            if(json.succes=='ok'){
	            	$('#inscription-pseudo, #inscription-mail, #inscription-mp, #langue-origine').val('');
	            	$('.inscription').hide();
	            	$('.connexion').show('slow');
	            	$('.connexion h2').after('<p class="yellow">Vous êtes inscrit, vous pouvez à présent vous connecter</p>');
	            }
	        }
	    });
	});  

	/********************TEST*********************/
	var repetition,langue, dateDebut, dateFin;

	$(document).on('keydown', function(e){
		if(e.keyCode === 13){
			e.preventDefault();
		}
	});

	$('#btnOption').on('click', function(){
		repetition = $('#repetition').val();
		langue = $('#langues').val();

		if(repetition.length && repetition > 0 && repetition <= 10){		

			//Initialisation des mots
			var mot1 = new Mot('soleil', 'sun');
			var mot2 = new Mot('chocolat', 'chocolate');
			var mot3 = new Mot('singe', 'monkey');
			var mot4 = new Mot('fauteuil', 'sofa');
			/*var mot5 = new Mot('stylo', 'pen');
			var mot6 = new Mot('lit', 'bed');
			var mot7 = new Mot('porte', 'door');*/
			mots.push(mot1, mot2, mot3, mot4/*, mot5, mot6, mot7*/);

			//Départ
			$('#test-window').css('display', 'block');
			$('#options-window').css('display', 'none');
			
			if( langue === 'en'){
				$('#langueChoisie').html('Anglais');
			}else if(langue === 'fr'){
				$('#langueChoisie').html('Français');
			}

			$('#inputReponse').on('keyup', griserBoutonValider);
			$('#valider').on('click', afficherCorrection);
			$('#inputReponse').on('keydown', validerParEntree);
			$('#passe').on('click', afficherFaux);

			dateDebut = new Date();
			afficherNouveauMot();
			Score.afficher();				
		}
	});

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
			afficherResultats();
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

	//Resultats
	function afficherResultats(){
		var bon = document.getElementById('bon'),
			moyen = document.getElementById('moyen'),
			mauvais = document.getElementById('mauvais'),
			temps = document.getElementById('temps');
		dateFin = new Date();
		$('#test-window').css('display', 'none');
		$('#resultat-window').css('display','block');

		Score.classerResultats().forEach(function(mot){
			if(mot.score>=0.8){
				bon.innerHTML += '<p>' + mot.motAAfficher + ' : '+ mot.motADeviner + '</p>';
			}else if (mot.score<0.7 && mot.score>=0.5){
				moyen.innerHTML += '<p>' + mot.motAAfficher + ' : '+ mot.motADeviner + '</p>';
			}else if(mot.score < 0.5){
				mauvais.innerHTML += '<p>' + mot.motAAfficher + ' : '+ mot.motADeviner + '</p>';
			}
		});
		temps.innerHTML += '<p>'+ Score.getTemps(dateFin, dateDebut)+ '</p>';
	}







