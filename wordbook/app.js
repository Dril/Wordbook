// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'jqueryMobile'
], function($, _, Backbone, Router, jqueryMobile){
  var initialize = function(){
    Router.initialize();
  };

  return {
    initialize: initialize
  };
});