	/*************************************-GENERAL-**************************************/
	afficherAccesProfil();

	/*************************************-ACCUEIL-**************************************/
	if(window.location.pathname === '/memots/index.html' || window.location.pathname === '/memots/' ){
		/*--Changement--*/
		$('.go-inscription').on('click', function(){
			$('.connexion').hide();
			$('.inscription').show('slow');
		});

		$('.go-connexion').on('click', function(){
			$('.inscription').hide();
			$('.connexion').show('slow');
		});

		/*--Connexion--*/
		$('.connexion form').submit(function(e){
			e.preventDefault();
			$('.error-message').remove();
			var postdata = $('.connexion form').serialize();
			Bdd.connecter(postdata, function successCallback() {
				document.location.href="profil.html";
			}, function technicalErrorCallback() {
				afficherErreur($('.connexion .btn '));
			}, function errorCallback() {
				afficherErreur($('.connexion .btn '), 'Vos identifiants sont incorrects');
			});
		});

		/*--Inscription--*/
		$('.inscription form').submit(function(e) {
			e.preventDefault();
			$('.error-message').remove();
			$('#inscription-pseudo, #inscription-mail, #inscription-mp').removeClass('has-error');
			var postdata = $('.inscription form').serialize();
			Bdd.inscrire(postdata, function successCallback(){
				$('#inscription-pseudo, #inscription-mail, #inscription-mp, #langue-origine').val('');
				$('.inscription').hide();
				$('.connexion').show('slow');
				$('.connexion h2').after('<p class="yellow">Vous êtes inscrit, vous pouvez à présent vous connecter</p>');
			}, function technicalErrorCallback(){
				afficherErreur($('.inscription .btn '));
			}, function errorCallback(element, message){
				element.addClass('has-error').after('<p class="error-message">' + message + '</p>');
			});
		}); 

		/*Deconnexion*/
		$('.deconnexion').on('click', function(){
			sessionStorage.clear();
			afficherAccesProfil();
		});
	} 

	/*************************************-PROFIL-***************************************/
	
	if(sessionStorage.id){
		if(window.location.pathname === '/memots/profil.html'){

			//Chargement
			$('.badges span').tooltip();
			 $('.infos-profil h1').html(sessionStorage.pseudo);
			 $('.infos-profil h1').after('<p class="small"> Membre depuis le ' + sessionStorage.dateInscription + '</p>');
			afficherLangues();

			//Gestion du champs "Autre"
			$('.ajouter-langue').on('change', function(){
				if($('.ajouter-langue').val()==='autre'){
					$('.ajouter-langue').after('<div class="form-group text-left" id="autre-langue"><label for="autre">Précisez</label><input id="autre" name="autre" type="text" class="form-control" maxlength="50" required ></div>');
					$('#autre-langue').hide().fadeIn('slow');
				}else{
					$('#autre-langue').fadeOut('slow', function(){
						$(this).remove();
					});
				}
			 });

			//Ajout langue
			$('.ajout-langue-btn').on('click', function(e){
				e.preventDefault();
				$('.error-message').remove();

				if($('.ajouter-langue').val()!=='' && $('.ajouter-langue').val()!=='autre'){
					var newLangue = $('.ajouter-langue').val();
				}else if($('.ajouter-langue').val()==='autre' && $('#autre').val()!==''){
					var newLangue = 'autre=' + $('#autre').val();
				}

				if (newLangue){
					Bdd.ajouterLangue(newLangue, sessionStorage.id, function technicalErrorCallback(){
						$('.profil .page-content .btn').after('<p class="error-message">Une erreur est survenue, veuillez réessayer ultérieurement</p>');
					}, function successCallback(){
						$('.no-langue').hide();
						$('.ajouter-langue').val('');
						$('#autre-langue').remove();
						afficherLangues();
					});
				}
			}); 

			//suppression langue  
			$('body').on('click', '.panel-heading .glyphicon-trash', function(){
				sessionStorage.setItem('currentLangue', $(this).parent().parent().attr('id'));  
			 });

			$('.supprimer-langue-btn').on('click', function(){
				$('.error-message').remove();
				var listeLangues = sessionStorage.langues.split(';');
				listeLangues.splice(listeLangues.indexOf(sessionStorage.currentLangue), 1);
				sessionStorage.langues = listeLangues.join(';');
					
				Bdd.supprimerLangue(sessionStorage.langues, sessionStorage.id, sessionStorage.currentLangue, function technicalErrorCallback(){
					$('.profil .page-content>.btn').after('<p class="error-message">Une erreur est survenue, veuillez réessayer ultérieurement</p>');
				}, afficherLangues);
			})

			//Bouton créer un liste
			$('body').on('click', '.panel-heading .glyphicon-edit', function(){
				sessionStorage.setItem('currentLangue', $(this).parent().parent().attr('id'));
				sessionStorage.setItem('mode', 'creer');
				document.location.href="liste.html";
			});

			//accès à la liste
			$('body').on('click','.go-list', function(){
				sessionStorage.currentList = $(this).attr('id');
				sessionStorage.currentLangue = $(this).data('liste').langue;
				sessionStorage.setItem('mode', 'update');
				document.location.href="liste.html";
			});

		/******************************************-LISTE-*****************************************/
		}else if(window.location.pathname === '/memots/liste.html'){
			$(window).on('keypress', function(e){
				if(e.keyCode === 13){
					e.preventDefault();
				}
			})
			//chargement
			$('.list-langue1').html(sessionStorage.langueOrigine);
			$('.list-langue2').html(sessionStorage.currentLangue);
			$('#options select option[value="option-langue1"]').html(sessionStorage.langueOrigine + ' → ' + sessionStorage.currentLangue);
			$('#options select option[value="option-langue2"]').html( sessionStorage.currentLangue+ ' → ' + sessionStorage.langueOrigine);
			apparitionLignes();
			creationOuModification();

			//annulation modifications
			$('.btn-annuler').on('click', function(e){
				e.preventDefault();
				if(sessionStorage.mode ==='creer'){
					window.location.pathname = '/memots/profil.html'; 
				}else if(sessionStorage.mode === 'update'){
					afficherModeLecture();
				}	
			});

			// supression liste
			$('.list .glyphicon-trash').on('click', function(){
				$('#supprimer-liste').modal('toggle');
				$('#supprimer-liste .modal-body').show();
			});

			$('.supprimer-liste-btn').on('click', function(){
				Bdd.supprimerListe(sessionStorage.id, sessionStorage.currentList, function technicalErrorCallback(){
					afficherErreur($('.list .page-content .btn:first'));
				}, function successCallback(){
					window.location.pathname = '/memots/profil.html';  
				});
			});

			//Go test
			$('.btn-test').on('click', function(e){
				e.preventDefault();
				$('#lancer-test').modal('toggle');
				$('#lancer-test .modal-body').show();
			})
			$('#options').on('submit', function(e){
				e.preventDefault();
				sessionStorage.optionRepetition = $('#repetition').val();
				sessionStorage.optionLangue = $('#langues').val();

				if(sessionStorage.optionRepetition>0 && sessionStorage.optionRepetition<=10){           
					window.location.pathname = '/memots/test.html';                         
				}
			});


		/******************************************-TEST-********************************************/
		}else if(window.location.pathname === '/memots/test.html'){
			var dateDebut, dateFin;
			lancerTest();       
		}
		
	}else if(window.location.pathname === '/memots/profil.html'|| window.location.pathname === '/memots/liste.html' || window.location.pathname === '/memots/test.html'){
		document.location.href="index.html";
	}


	/***************************************FONCTIONS**********************************/

	function zero(nb){
		if(nb<10){
			nb = '0'+nb;
		}else{
			nb=nb;
		}
		return nb;
	 }

	 function afficherAccesProfil(){
		if(sessionStorage.id){
			$('.connexion').hide();
			$('.deconnexion').show();
			$('.compte').show();
		}else{
			$('.connexion').show();
			$('.deconnexion').hide();
			$('.compte').hide();
		}
	}

	function afficherLangues(){
		desactiverLangues(sessionStorage.langues)
		$('.language-list').html('');
		if (sessionStorage.langues ===''){
			$('.language-list').append('<p class="no-langue">Vous n\'avez pas de langue pour le moment</p>');
		}else{
			var listeLangues = sessionStorage.langues.split(';');
			listeLangues.forEach(function(langue, id){
				if(langue.split('=')[0]==='autre'){
					langue = langue.split('=').slice(1);
					$('.language-list').append('<div class="panel-heading"><a class="accordion-link" data-toggle="collapse" data-parent="#accordion" href="#collapse'+id+' "><img class="flag" src="img/flag/none.ico" alt="Langue"/>'+langue+'</a> <span class="buttons" id="'+langue +'"><a title="Créer une liste"><span class="glyphicon glyphicon-edit"></span></a><a title="Supprimer"><span class="glyphicon glyphicon-trash" data-toggle="modal" data-target="#supprimer-langue"></span></a></span></div><div id ="collapse'+id+'" class="collapse"><div class="panel-body ' +langue +'"><p class="no-list">Pas encore de liste<p></div></div>');
				}else{
					$('.language-list').append('<div class="panel-heading"><a class="accordion-link" data-toggle="collapse" data-parent="#accordion" href="#collapse'+id+' "><img class="flag" src="img/flag/'+langue+'.ico" alt="Langue"/>'+langue+'</a> <span class="buttons" id="'+langue +'"><a title="Créer une liste"><span class="glyphicon glyphicon-edit"></span></a><a title="Supprimer"><span class="glyphicon glyphicon-trash" data-toggle="modal" data-target="#supprimer-langue"></span></a></span></div><div id ="collapse'+id+'" class="collapse"><div class="panel-body ' +langue +'"><p class="no-list">Pas encore de liste<p></div></div>');     
				}
			});
			afficherListes();
		}
	}

	function afficherListes(){
		var tableListes = JSON.parse(sessionStorage.listOfList);
			
		tableListes.forEach(function(objet){
			$('.'+ objet.langue + ' .no-list').remove();
			$('.'+ objet.langue).append('<div><a id="'+ objet.id_liste +'" class="go-list">♦ '+ objet.nom +'</a><div class="progress list-progress"><div class="progress-bar" id="progressBar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: '+objet.score+'%;"></div></div><span class="small"> '+objet.score+'%</span></div>')
			$('#'+ objet.id_liste).data('liste', {'langue' : objet.langue});
		});
	}

	function desactiverLangues(){
		$('.ajouter-langue option').removeAttr('disabled').css('color','black');
		$('.ajouter-langue option').each(function(){
			var listeLangues = sessionStorage.langues.split(';');
			for(i=0 ; i<listeLangues.length ; i++){
				if(listeLangues[i] === $(this).val()){
					$(this).attr('disabled', 'disabled').css('color', '#d2d2d2');
				}
			}
		});
	}

	function creationOuModification(){
		if(sessionStorage.mode ==='creer'){
			modeCreation();
		}else if(sessionStorage.mode === 'update'){
			modeModification();
		}
	}

	function modeCreation(){
		afficherModeEdit();
		$('.list .page-header input').attr({placeholder:'Nom de liste', required : true}).focus();
		$('#options').hide();
		$('.score-list').hide();
		
		$('.sauvegarde-liste').on('submit', function(e){
			e.preventDefault();
			$('.error-message').remove();

			Bdd.ajouterListe($('.list-name').children().val(), sessionStorage.id , sessionStorage.currentLangue, sessionStorage.langueOrigine, JSON.stringify(getTableMots()),
			function technicalErrorCallback(){
				afficherErreur($('.list .page-content .btn:first'));
			}, function successCallback(){
				$('.sauvegarde-liste').off('submit');
				creationOuModification();
			})
		});
	}

	function modeModification(){
		afficherModeLecture();

		$('.sauvegarde-liste').on('submit', function(e){
			e.preventDefault();
			$('.error-message').remove();

			Bdd.modifierListe($('.list-name').children().val(), sessionStorage.id, sessionStorage.currentList, JSON.stringify(getTableMots()),
			function technicalErrorCallback(){
				afficherErreur($('.list .page-content .btn:first'));
			}, afficherModeLecture);
		});
	}

	function afficherModeLecture(){
		$('.btn-test').show();
		$('.glyphicon-print').show();
		$('.glyphicon-pencil').on('click', afficherModeEdit);

		Bdd.recupererListe(sessionStorage.id, sessionStorage.currentList, function technicalErrorCallback(){
			afficherErreur($('.list .page-content .btn:first'));
		}, function successCallback(listName, listeScore, listeTime){
			$('.btn-sauvegarde').hide();
			$('.btn-annuler').hide();  
			$('.list .page-header .modifiable').html('<span>' + listName + '</span>');
			$('.list .page-content tbody').html('');
			$('.content-score').html(listeScore + '%');
			$('.content-time').html(listeTime);

			var tableMots =  JSON.parse(sessionStorage.currentMots);                    
			tableMots.forEach(function(mot, index){
				$('.list .page-content tbody').append('<tr class="ligne'+ (index+1) +'"><td class="modifiable mot1"><p>'+mot.motLangueOrigine + '</p></td><td class="modifiable mot2"><p>' + mot.motLangue2 +'</p></td></tr>');
				$('.ligne' + (index+1)).data("mot", {'motLangueOrigine' : mot.motLangueOrigine, 'motLangue2' : mot.motLangue2, 'score': mot.score});
				
				if(mot.score>=80){
					$('.ligne'+ (index+1)).css('border-left', '2px solid green');
				}else if (mot.score<70 && mot.score>=50){
					$('.ligne'+ (index+1)).css('border-left', '2px solid #FCD751');
				}else if(mot.score < 50 && mot.score > 0){
					$('.ligne'+ (index+1)).css('border-left', '2px solid #D9534F');
				}else if(mot.score === 0){
					$('.ligne'+ (index+1)).css('border', 'none');
				}
			});
		});
	}

	function afficherModeEdit(){
		$('.btn-test').hide();
		$('.glyphicon-print').hide();
		$('.modifiable').each(function(){
			var modifiable = $(this).children().html();
			$(this).html('<input type="text" class="form-control input-modifiable" maxlength="200"/>');
			$(this).children('.input-modifiable').val(modifiable);      
		});
		$('.btn-annuler').fadeIn();
		$('.btn-sauvegarde').fadeIn();
		$('.list-name input').addClass('input-lg').css({opacity:'0.9'}).attr("required", true);
		$('.glyphicon-pencil').off('click');
		
		afficherLigneSuivante();
	}

	function afficherLigneSuivante(){
		if($('tbody tr:last').length){
			var ligne = parseInt($('tbody tr:last').attr('class').replace(/ligne/, ''));
		}else{
			var ligne = 0;
		}
		$('.tr-remove').remove();
		$('tbody tr').append('<td class="tr-remove"><span class="glyphicon glyphicon-remove"></span></td>')
		$('tbody').append('<tr class="ligne'+ (ligne+1) +'"><td class=".modifiable mot1"><input type="text" class="form-control" maxlength="200"/></td><td class="modifiable mot2"><input type="text" class="form-control maxlength="200""/></td></tr>');
	}

	function apparitionLignes(){
		$('body').on('focus', '.list .page-content input', function(){
			$(this).parent().parent().fadeTo(500, 1);

		});
		
		$('body').on('focus','.mot2', function(){
			if(!$(this).parent().next().is('tr')){
				afficherLigneSuivante();
				$('tr:last-child').hide().fadeIn();
			}
		});

		$('body').on('click', '.glyphicon-remove', function(){
			$(this).parent().parent().fadeOut('fast');
			$(this).parent().parent().find('input').val('');
		});
	}

	function afficherErreur(element, message){
		message = message || 'Une erreur est survenue, veuillez réessayer ultérieurement';
		element.before('<p class="error-message">' + message + '</p>');
	}

	function getTableMots(){
		var tableMots=[];
		for(i=1; i<$('tr').length; i++){
			if($('.ligne' +i).css('display')!=='none'){
				if($('.ligne' +i).data("mot")){
					var mot1 = $('.ligne' +i).data("mot").motLangueOrigine;
					var mot2 = $('.ligne'+i).data("mot").motLangue2;
					var score = $('.ligne'+i).data("mot").score;

				}else{
					var mot1 = $('.ligne'+i).children('.mot1').children().val();
					var mot2 = $('.ligne'+i).children('.mot2').children().val();
					var score = '';
				}			

				//verification pas de doublon
				if(mot1!=='' && mot2!==''){
					var motDouble = 0;
					tableMots.forEach(function(mot){
						if(mot.motLangueOrigine === mot1 && mot.motLangue2 === mot2){
							motDouble++;
						}
					})

					if(motDouble === 0){
						tableMots.push(new Mot(mot1.toLowerCase(), mot2.toLowerCase(), score));
					}			
				}
			}
		}
		return tableMots;
	}