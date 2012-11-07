define(['jquery', 'jqueryMobile', 'underscore', 'backbone'], function($, $m, _, Backbone) {
	var BaseModel = Backbone.Model.extend({
		initialize: function() {},				
	},
	{		
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

      initDatabase: function() {
		   try {
			   if (!window.openDatabase) {
			       alert('Databases are not supported in this browser.');
			   } else {
			   // Get to database constants
			      var shortName   = 'Wordbook';
			      var version     = '0.1';
			      var displayName = 'Wordbook Database';
			      var maxSize     = 100000; 

				  WordbookDB = openDatabase(shortName, version, displayName, maxSize);
				  createTables();
				  selectAll();
			   }
			} catch(e) {			
			  if (e == 2) {			   
			   console.log("Invalid database version.");
			} else {
			   console.log("Unknown error " + e + ".");
			}
				return;
  		    }	   
       } 
	});

	return BaseModel;
});