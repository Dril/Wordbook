// Filename: router.js
define([
  'jquery',
  'jqueryMobile',
  'underscore',
  'backbone'
], function($, $m, _, Backbone){
  var AppRouter = Backbone.Router.extend({
    routes: {                
      'editwords': 'editWordsAction',
      'home':      'homeAction',
      '*actions':  'defaultAction'
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;  

    app_router.on('route:editWordsAction', function (actions) {
      require(['src/views/EditWordsPageView'], function(EditWordsView) {
        var EditWordsViewInstance = new EditWordsView();
       $(EditWordsViewInstance.el).attr('data-role', 'page');        
         EditWordsViewInstance.render();
        $('body').append($(EditWordsViewInstance.el));        

        var transition = $m.defaultPageTransitison;
        $m.changePage($(EditWordsViewInstance.el), {changeHash:false, transition: 'flow'});
      });
    });

    app_router.on('route:homeAction', function (actions) {
      require(['src/views/MainPageView'], function(MainHomeView) {
        var mainHomeViewInstance = new MainHomeView();
        mainHomeViewInstance.render();

        $(mainHomeViewInstance.el).attr('data-role', 'page');

        $('body').append($(mainHomeViewInstance.el));        

        var transition = $m.defaultPageTransitison;
        $m.changePage($(mainHomeViewInstance.el), {changeHash:false, transition: 'flow'});        
      });
    });

    app_router.on('route:defaultAction', function (actions) {
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