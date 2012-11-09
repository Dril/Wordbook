// Filename: app.js
define([
  'jquery',
  'jqmConfig',
  'underscore',
  'backbone',
  'router',
  'jqueryMobile',
  'src/models/BaseModel'  
], function($, jqmConfig, _, Backbone, Router, $m, BaseModel){  
    var initialize = function(){

    $m.linkBindingEnabled = false;   
    $m.hashListeningEnabled = false;    

    Router.initialize();
    BaseModel.initDatabase();    
  };

  return {
    initialize: initialize
  };
});