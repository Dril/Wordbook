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
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;  
    app_router.on('route:defaultAction route:addWordAction', function (actions) {
      require(['src/views/MainPageView'], function(MainHomeView) {
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