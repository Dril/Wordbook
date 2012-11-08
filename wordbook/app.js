// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'jqueryMobile',
  'src/models/BaseModel'
], function($, _, Backbone, Router, $m, BaseModel){
  var initialize = function(){
     $m.linkBindingEnabled = false;     
     $m.hashListeningEnabled = false;

    // $(document).live("mobileinit", function () {      
    // console.log('in Mobile Init');
    // // $.extend($m , {
    // //     autoInitializePage: false,
    // //     loadingMessage: false
    // // });
    // $m.ajaxEnabled = false;
    // $m.linkBindingEnabled = false;
    // $m.hashListeningEnabled = false;
    // $m.pushStateEnabled = false;
    // // Remove page from DOM when it's being replaced
    //   $('div[data-role="page"]').live('pagehide', function (event, ui) {
    //       $(event.currentTarget).remove();
    //    });
    // });    

    Router.initialize();
    BaseModel.initDatabase();    
  };

  return {
    initialize: initialize
  };
});