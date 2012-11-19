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
       WordsModel.selectEnWordsWithRu(this.allEnWordActionHandler, this); 
     },     

     el: $("#testPage"),
     wordListContainer: this.$("#testPage").find("#home"),

     events: {
       'keypress  #editword': 'editWordAction',
       'taphold .delete-word-button': 'deleteWordAction'
     },        

     render: function(_words, view) {        
         var compiledTemplate = this.prepareTemplate(_words);
         this.wordListContainer.html(_.template( compiledTemplate ));
     
     $('body').append($(this.el));
     $m.changePage($(this.el), {changeHash:false, transition: 'flow'});
     },   

     allEnWordActionHandler: function(data, view) {
        this.words = new WordsCollection();
        _.each(data, function(val) {
            this.words = this.words.add({word_from: val.en_name , word_to: val.ru_name,
                                         en_id: val.en_id , ru_id: val.ru_id});
       });
       view.render(this.words.models, view);
    },
   
    editWordAction: function(event) {
        if (event.keyCode != 13) return;
        var word = $(event.target).val();
        var ru_id = $(event.target).attr('rel');
        if(ru_id && ru_id != undefined) {                 
             WordsModel.updateWords(ru_id, word, this.allEnWordActionHandler, this);   
        }
    },

    deleteWordAction: function() {
        var ru_id = $(event.target).attr('rel');
        var en_id = $(event.target).parent().parent().attr('rel');
        // WordsModel.deleteWords(ru_id, en_id, this.allEnWordActionHandler, this);           
    },

    prepareTemplate: function(_words) {
        var data = { words: _words, _: _ };
        _.extend(data, MainPageHelper);
        return _.template(EditWordsPageTemplate, data);
     }
  });

  return EditWordsView;
});
