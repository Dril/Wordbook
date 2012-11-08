define(['underscore', 
	     'backbone',
	     'src/models/BaseModel', 
	     'src/config/DatabaseConfig'], function(_, Backbone, BaseModel, DatabaseConfig) {

   var WordsModel =  Backbone.Model.extend({
   	    url: "/addword",
		initialize: function() {
			WordsModel.__super__.initialize.apply(this, arguments);
		},
   },
   {   	 
     _result: null,

     getResult: function() {
     	 return this._result;
     },
     setResult: function(result) {
     	 this._result = result;
     },

     addWords: function(word, resultHandler, objectView) {
         var obj = this;
	     BaseModel.database.transaction(
              function (transaction) {            
                 transaction.executeSql(DatabaseConfig.queries.insertEnWordQuery, [word]);                 
            });
         return this; 
     },

     selectAllWords: function(resultHandler, objectView) {
         var obj = this;         
	     BaseModel.database.readTransaction(
             function (transaction) {
                 BaseModel.executeQuery(DatabaseConfig.queries.getAllWordsQuery, function(t, data) {                 	                    
                                        obj.setResult(obj.getAllWordsResultHandler(data));
                                        resultHandler(obj.getResult(), objectView);
                                       });
            });
         return this;
     },

     getAllWordsResultHandler: function(data) {
     	 var name_en, name_ru, name_en_ru = [];
         _.each(data.rows, function(key, num) {
             name_en_ru.push({en_name: data.rows.item(num).en_name,
             	              ru_name: data.rows.item(num).ru_name});
         });
        return name_en_ru;
     }
   });

   return WordsModel;
});