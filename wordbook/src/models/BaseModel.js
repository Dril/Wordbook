define(['jquery', 'jqueryMobile', 'underscore', 'backbone'], function($, $m, _, Backbone) {
	var BaseModel = Backbone.Model.extend({
		initialize: function() {},				
	},
	{
	 self: this,		
     sendData: function(_url, _handler, _data) {
	    $m.showPageLoadingMsg();
        $.ajax({
            url:  _url,
            data: _data || {},
            type: "POST",
            success: function(data) {
               _handler();
            },
            error: function( jqXHR, textStatus, errorThrown ) {
            }            
            }).done(function() {            
                $m.hidePageLoadingMsg();
            });
      },

      //TODO: 1. add to config database file
      configDatabase: {
          shortName:   'Wordbook',
          version:     '0.1',
          displayName: 'Wordbook Database',
          maxSize:     100000
      },

      //TODO: 2. add to config database file, merge with (1)
      queriesDatabase: {     
         createWordsFromTable:     'CREATE TABLE IF NOT EXISTS word_en(id INTEGER NOT NULL PRIMARY KEY, name TEXT NULL);',
         createWordsToTable:       'CREATE TABLE IF NOT EXISTS word_ru(id INTEGER NOT NULL PRIMARY KEY, name TEXT NULL);',        
         createWordsRelationTable: 'CREATE TABLE IF NOT EXISTS translate_en_ru(id INTEGER NOT NULL PRIMARY KEY, id_from INTEGER NOT NULL, id_to INTEGER NOT NULL);'         
      }, 

      initDatabase: function() {
		   try {
			   if (!window.openDatabase) {
			       alert('Databases are not supported in this browser.');
			   } else {	   
				  WordbookDB = openDatabase(this.configDatabase.shortName,
				                            this.configDatabase.version, 
				                            this.configDatabase.displayName, 
				                            this.configDatabase.maxSize);				  			
				  this.createTables(WordbookDB, this);
			   }
			} catch(e) {
			  this.initErrorHandlerDatabase(e);
			  return;
  		    }
      },

      errorHandlerInitDatabase: function() {
          if (e == 2) {			   
		      console.log("Invalid database version.");
		  } else {
			  console.log("Unknown error " + e + ".");
		  }
      }, 

      createTables: function(database, obj)  {      	
      	var self = obj;
	    database.transaction(
          function (transaction) {          	
        	transaction.executeSql(self.queriesDatabase.createWordsFromTable, [], self.nullDataHandlerCreateTable, self.errorHandlerCreateTable);
        	transaction.executeSql(self.queriesDatabase.createWordsToTable, [], self.nullDataHandlerCreateTable, self.errorHandlerCreateTable);
        	transaction.executeSql(self.queriesDatabase.createWordsRelationTable, [], self.nullDataHandlerCreateTable, self.errorHandlerCreateTable);
          });	    
       }, 
      
      nullDataHandlerCreateTable: function() {

      }, 

      errorHandlerCreateTable: function() {

      }

	});

	return BaseModel;
});