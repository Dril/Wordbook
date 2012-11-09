define([
  'jquery',
  'jqueryMobile',
  'underscore',
  'backbone',  
  'src/models/BaseModel',
  'src/models/WordsModel',  
  'src/collections/WordsCollection',
  'src/helpers/MainPageHelper',
  'text!src/templates/EditWordsPageTemplate.html'
], function($, $m, _, Backbone, BaseModel, WordsModel, WordsCollection, MainPageHelper, EditWordsPageTemplate) {
   var EditWordsView = Backbone.View.extend({
     initialize: function() {        
     },     

     el: $("#testPage"),
     wordListContainer: this.$("#testPage").find("#home"),

     events: {
       //'keypress #addword': 'addWordAction'
     },

     render: function() {
         var compiledTemplate = this.prepareTemplate();
         this.wordListContainer.html(_.template( compiledTemplate ));      
     },

     prepareTemplate: function(_words) {
        var data = { words: {}, _: _ };        
        _.extend(data, MainPageHelper);
        return _.template(EditWordsPageTemplate, data);        
     }    
  });

  return EditWordsView;
});
