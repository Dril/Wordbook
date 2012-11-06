define([
  'jquery',
  'jqueryMobile',
  'underscore',
  'backbone',
  'text!src/templates/mainPage.html'
], function($, jqueryMobile, _, Backbone, mainPageTemplate) {    
   var MainHomeView = Backbone.View.extend({ 
   	 el: $("#wordList"),
   	 render: function() {
   	  	  var data = {};          
          var compiledTemplate = _.template(mainPageTemplate, data);          
          this.$el.html( compiledTemplate );
      }
   });
   return MainHomeView;
});