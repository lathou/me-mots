var Bdd={
	connecter : function(postdata, successCallback, technicalErrorCallback, errorCallback) {
		$.ajax({
			type: 'POST',
			url: 'php/connexion.php',
			data: postdata,
			dataType: 'json',
			error: function(){
				technicalErrorCallback();
			},
			success: function(session) {
				if (session ==='ko'){
					errorCallback();
					return;
				}

				sessionStorage.setItem('pseudo',session.pseudo);
				sessionStorage.setItem('id', session.id);
				sessionStorage.setItem('langueOrigine', session.langueOrigine);
				sessionStorage.setItem('langues', session.langues);
				sessionStorage.setItem('dateInscription', session.date_inscription);
				sessionStorage.setItem('listOfList', JSON.stringify(session.listes));
				successCallback();
			}
		});
	},

	inscrire : function(postdata, successCallback, technicalErrorCallback, errorCallback){
		$.ajax({
			type: 'POST',
			url: 'php/inscription.php',
			data: postdata,
			dataType: 'json',
			error : function(){
				technicalErrorCallback();
			},
			success: function(json) {         
				if(json.pseudoMessage != '') {
					errorCallback($('#inscription-pseudo'), json.pseudoMessage);
				}
				if(json.mailMessage != '') {
					errorCallback($('#inscription-mail'), json.mailMessage);
				}
				if(json.mpMessage != ''){
					errorCallback($('#inscription-mp'),json.mpMessage);
				}
				if(json.langueMessage != ''){
					errorCallback($('#langue-origine'),json.langueMessage);
				}
				if(json.success===true){
					successCallback();
				}else{
					technicalErrorCallback();
				}
			}
		});
	},

	ajouterLangue : function(newLangue, idMembre, technicalErrorCallback, successCallback){
		$.ajax({
			type: 'POST',
			url: 'php/ajout-langue.php',
			data: 'langue=' + newLangue + '&id=' + idMembre,
			dataType: 'json',
			error : function(){
				technicalErrorCallback();
			},
			success: function(listeLangues) {    
				sessionStorage.langues = listeLangues;
				successCallback();	
			}
		});
	},

	supprimerLangue : function(langues, idMembre, currentLangue, technicalErrorCallback, successCallback){
		$.ajax({
			type: 'POST',
			url: 'php/supprimer-langue.php',
			data: 'langues=' + langues + '&id=' + idMembre + '&langue='+ currentLangue,
			dataType: 'json',
			error : function(){
				technicalErrorCallback();
			},
			success: function(json) {
				if(json.success){       
					if(json.listOfList){
						sessionStorage.listOfList = JSON.stringify(json.listOfList);
					}
					successCallback();
				}
			}
		});
	},

	recupererListe : function(idMembre, idListe, technicalErrorCallback, successCallback){
		$.ajax({
			type: 'POST',
			url: 'php/recuperer-liste.php',
			data: 'idUser=' + idMembre +
				  '&idListe='+ idListe,
			dataType: 'json',
			error : function(){
				technicalErrorCallback();
			},
			success: function(liste) {
				sessionStorage.currentLangue = liste.infos.langue;
				sessionStorage.currentMots = JSON.stringify(liste.mots);            
				successCallback(liste.infos.nom, liste.infos.score, liste.infos.temps);
			}
		});				
	},

	ajouterListe : function(listName, idMembre, currentLangue, langueOrigine, tableMots, technicalErrorCallback, successCallback){
		$.ajax({
			type: 'POST',
			url: 'php/ajout-liste.php',
			data: 'listName=' + listName  + 
				  '&idUser=' + idMembre +
				  '&langue='+ currentLangue +
				  '&langueOrigine=' + langueOrigine +
				  '&tableMots=' + tableMots,
			dataType: 'json',
			error : function(){
				technicalErrorCallback();
			},
			success: function(json) {
				sessionStorage.setItem('listOfList', JSON.stringify(json.listes));
				sessionStorage.setItem('currentList', json.currentList);
				sessionStorage.setItem('mode', 'update');
				successCallback();
			}
		});
	},

	supprimerListe : function(idMembre, idListe, technicalErrorCallback, successCallback){
		$.ajax({
			type: 'POST',
			url: 'php/supprimer-liste.php',
			data:'idUser=' + idMembre + '&id_liste='+ idListe,
			dataType: 'json',
			error : function(){
				technicalErrorCallback();
			},
			success: function(listOfList){
				sessionStorage.listOfList = JSON.stringify(listOfList);
				successCallback();
			}
		});
	},

	modifierListe : function(listName, idMembre, idListe, tableMots, technicalErrorCallback, successCallback){
		$.ajax({
			type: 'POST',
			url: 'php/update-liste.php',
			data: 'listName=' + listName + 
				  '&idUser=' + idMembre +
				  '&id_liste='+ idListe +
				  '&tableMots=' + tableMots,
			dataType: 'json',
			error : function(){
				technicalErrorCallback();
			},
			success: function(listOfList){
				sessionStorage.listOfList = JSON.stringify(listOfList);
				successCallback();
			}
		});	
	},

	enregistrerScoreListe : function( score, temps, idMembre, currentList, tableMots, technicalErrorCallback, successCallback){
		$.ajax({
	        type: 'POST',
	        url: 'php/update-liste.php',
	        data: 'score=' + score + 
	        	  '&temps=' + temps +
	        	  '&idUser=' + idMembre +
	        	  '&id_liste='+ currentList +
	        	  '&tableMots=' + tableMots,
	        dataType: 'json',
	        error : function(){
	        	technicalErrorCallback();
	        },
	        success: function(json){
	        	successCallback();
	        }
	    });
	}
}