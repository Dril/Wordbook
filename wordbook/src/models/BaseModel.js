define(['jquery', 'jqueryMobile', 'underscore', 'backbone', 'src/config/DatabaseConfig'], function($, $m, _, Backbone, DatabaseConfig) {
	var BaseModel = Backbone.Model.extend({
		initialize: function() {},				
	},
	{  
     database: null,
	   self: this,     

      initDatabase: function() {
		   try {
			   if (!window.openDatabase) {
			       alert('Databases are not supported in this browser.');
			   } else {	   
				  this.database = WordbookDB = openDatabase(DatabaseConfig.shortName,
				                                            DatabaseConfig.version, 
				                                            DatabaseConfig.displayName, 
				                                            DatabaseConfig.maxSize);				  			

				  this.createTables(WordbookDB, this);			  
			   }
			} catch(e) {
			  this.initErrorHandlerDatabase(e);
			  return;
  		  }
      },

      initErrorHandlerDatabase: function(e) {
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
        	  transaction.executeSql(DatabaseConfig.queries.createWordsFromTable, [], self.nullDataHandler, self.errorHandler);
        	  transaction.executeSql(DatabaseConfig.queries.createWordsToTable, [], self.nullDataHandler, self.errorHandler);
        	  transaction.executeSql(DatabaseConfig.queries.createWordsRelationTable, [], self.nullDataHandler, self.errorHandler);
          });
       },     

      executeQuery: function(query, handler) {      
          this.database.transaction(
              function (transaction) {
                  transaction.executeSql(query, [], handler, self.errorHandlerCreateTable);
          });
      },       
      
      nullDataHandler: function() {
      }, 

      errorHandler: function() {
      },

      sendData: function(_url, _handler, _context, _data) {
      $m.showPageLoadingMsg();
        $.ajax({
            url:  _url,
            data: _data || {},
            type: "POST",
            context: _context,
            success: function(data) {
               _handler(data, _context);
            },
            error: function( jqXHR, textStatus, errorThrown ) {
            }            
            }).done(function() {            
                $m.hidePageLoadingMsg();
            });
      }        
	});

	return BaseModel;
});