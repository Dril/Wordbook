define([
  'jquery',
  'jqueryMobile',
  'underscore',
  'backbone',      
], function($, jqueryMobile, _, Backbone) {
    return {

       getCurrentClass: function(words, key){
       var _class;       
        switch (key) {
           case 0:
             _class = 'ui-corner-top';
           break;
            case (words.length - 1):
               _class = 'ui-corner-bottom ui-li-last';
            break;
            default:
                _class = '';
           break;
          }
       return _class;
      }

    } 
});