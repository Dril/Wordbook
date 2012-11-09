define(['jquery'], function($){      
    $(document).on("mobileinit", function () {          
          
          $.mobile.ajaxEnabled = false;
          $.mobile.linkBindingEnabled = false;
          $.mobile.hashListeningEnabled = false;
          $.mobile.pushStateEnabled = false;          
          $.mobile.page.prototype.options.addBackBtn= true;

          $('div[data-role="page"]').live('pagehide', function (event, ui) {
              $(event.currentTarget).remove();
          });
    });       
});