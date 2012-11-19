define([
  'jquery',
  'jqueryMobile',
  'underscore',
  'backbone',  
  'src/models/BaseModel',
  'src/models/WordsModel',  
  'src/collections/WordsCollection',
  'src/helpers/MainPageHelper',
  'text!src/templates/MainPageTemplate.html'
], function($, $m, _, Backbone, BaseModel, WordsModel, WordsCollection, MainPageHelper, MainPageTemplate) {
   var MainHomeView = Backbone.View.extend({
     initialize: function() {
        WordsModel.selectAllWords(this.addWordActionHandler, this);
     },     

     el: $("#main-page"),
     wordListContainer: this.$("#main-page").find("#wordList"),

     events: {
       'keypress #addword': 'addWordAction',
       'taphold #editwords': 'changePageAction',
       'hover .list-last-word': 'showDeleteAction'       
     },

     renderList: function(_words, view) {
         var compiledTemplate = this.prepareTemplate(_words);         
         view.wordListContainer.html(_.template( compiledTemplate ));      
     },

     prepareTemplate: function(_words) {
        var data = { words: _words, _: _ };        
        _.extend(data, MainPageHelper);
        return _.template(MainPageTemplate, data);        
     },

     addWordAction: function(event) {
        if (event.keyCode != 13) return;
        var word = $(event.target).val();
        WordsModel.addWords(word, this.addWordActionHandler, this);
     },
      
     addWordActionHandler: function(data, view) {
        this.words = new WordsCollection();
        _.each(data, function(val) {
            this.words = this.words.add({word_from: val.en_name , word_to: val.ru_name});
        });
        view.renderList(this.words.models, view);
      }, 

      showDeleteAction: function(event) {
         $(".hide-button").each(function() {
            $(this).hide();
         });
         $(event.target).find(".hide-button").show();
      },
     changePageAction: function()  {
     }
  });

  return MainHomeView;
});
