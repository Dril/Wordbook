define([
  'jquery',
  'jqueryMobile',
  'underscore'
  'backbone',      
], function($, jqueryMobile, _, Backbone) {
    return {     

       getCurrentHtmlClass: function(words, key){
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
      },

      getEmptyTranslateHtmlClass: function(words) {
          var word_from = words.get("word_from");
          var word_to   = words.get("word_to");      
          if(_.isEmpty(word_from) || _.isEmpty(word_to))  {              
              return "empty-translate";
          }
          return '';
      }

    }
});