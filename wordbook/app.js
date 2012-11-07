// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'jqueryMobile',
  'src/models/BaseModel'
], function($, _, Backbone, Router, jqueryMobile, BaseModel){
  var initialize = function(){
    Router.initialize();
    BaseModel.initDatabase();
  };

  return {
    initialize: initialize
  };
});