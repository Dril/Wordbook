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
     
     addValues: function(a, b) {
    	  return a + b; 
     },

     addWords: function(word, resultHandler, objectView) {
         var obj = this;
         BaseModel.database.transaction(
              function (transaction) {            
                 transaction.executeSql(DatabaseConfig.queries.insertEnWordQuery, [word], function(t, data) {
                     var lastEnWordrId= data.insertId;
                      transaction.executeSql(DatabaseConfig.queries.insertRuWordQuery, [''], function(t, data) {
                         var lastRuWordrId= data.insertId;
                           transaction.executeSql(DatabaseConfig.queries.insertEnRuWordQuery, [lastEnWordrId, lastRuWordrId], function(t, data) {                              
                              obj.selectAllWords(resultHandler, objectView);
                           });
                      });
                 });
            });
         return this; 
     },
   
   updateWords: function(ru_id, word, resultHandler, objectView) {       
         var obj = this;     
         BaseModel.database.transaction(
              function (transaction) {
                 transaction.executeSql(DatabaseConfig.queries.updateRuWordQuery, [word, ru_id], function(t, data) {
                              obj.selectAllWords(resultHandler, objectView);
                 });
            });
         return this; 
     },    
   
     selectEnWordsWithRu: function(resultHandler, objectView) {
         var obj = this;     
         BaseModel.database.readTransaction(
             function (transaction) {
                 BaseModel.executeQuery(DatabaseConfig.queries.getEnWordsWithRuQuery, function(t, data) {
                                        obj.setResult(obj.getAllWordsResultHandler(data));
                                        resultHandler(obj.getResult(), objectView);
                                       });     
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
                            ru_name: data.rows.item(num).ru_name,
                ru_id: data.rows.item(num).ru_id,
                en_id: data.rows.item(num).en_id});
         });
        return name_en_ru;
     }
   });

   return WordsModel;
});