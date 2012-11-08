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
        var transition = $m.defaultPageTransition;
        $m.changePage($(EditWordsViewInstance.el), {changeHash:false, transition: transition});
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