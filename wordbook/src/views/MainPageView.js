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
         this.words = new WordsCollection();
         
         //TODO: get to Sync model create 
         this.words = this.words.add({word_from: "Occasionally", word_to: "Иногда"});
         this.words = this.words.add({word_from: "Car", word_to: "Машина"});
         this.words = this.words.add({word_from: "Rely", word_to: "Полагаься/Надеяться"}); 
         this.words = this.words.add({word_from: "Recognize", word_to: "Признавать/распозновать"});
         this.words = this.words.add({word_from: "Best", word_to: "Лучший"});                                 
     },

     el: $("#main-page"),
     wordListContainer: this.$("#main-page").find("#wordList"),

     events: {
       'keypress #addword': 'addWordAction'
     },
     urls: {
        add_word: '/add-word'
     },

   	 render: function() {
        var compiledTemplate = this.prepareTemplate();
        this.wordListContainer.html(compiledTemplate);
     },
     prepareTemplate: function() {
        var data = { words: this.words.models, _: _ };
        _.extend(data, MainPageHelper);
        return _.template(MainPageTemplate, data);        
     }, 
     addWordAction: function(event) {
        if (event.keyCode != 13) return;       
        BaseModel.initDatabase();
        BaseModel.sendData(this.urls.add_word, this.appendWordAction);
     },
     appendWordAction: function() {
        console.log('handler!');
     }
  });
  return MainHomeView;
});
