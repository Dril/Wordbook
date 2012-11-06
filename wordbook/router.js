// Filename: router.js
define([
  'jquery',
  'jqueryMobile',  
  'underscore',
  'backbone'  
], function($, jqueryMobile, _, Backbone){    
  var AppRouter = Backbone.Router.extend({
    routes: {      
      'add-word': 'addWordAction',
      'remove-word': 'removeWordAction',
      
      '*actions': 'defaultAction'
    }
  });

  //Enter point for handle all routes
  var initialize = function(){
    var app_router = new AppRouter;

    app_router.on('route:addWordAction', function(){
      require(['src/views/wordsList'], function(ProjectListView) {
        var projectListView = new WordsListView();
        WordsListView.render();
      });
    });
    app_router.on('route:defaultAction', function (actions) {
      require(['src/views/mainPage'], function(MainHomeView) {
        var mainHomeViewInstance = new MainHomeView();
        mainHomeViewInstance.render();
      });
    });
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});