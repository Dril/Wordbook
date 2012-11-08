require.config({
  paths: {
      'jquery': 'libs/js/jquery/jquery',
      'jqueryMobile': 'libs/js/jquery.mobile/jqueryMobile',
      'underscore': 'libs/js/underscore/underscore',
      'backbone': 'libs/js/backbone/backbone',
      'templates': 'libs/js/templates'
  },
  'shim': {
       underscore: {
          'exports': '_'
       },
       backbone: {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
       }
    }
});
require(['app'], function(App){	  
       App.initialize();
});