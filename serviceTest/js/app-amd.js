

// Includes File Dependencies
require([ "jquery", "backbone", "routers/Router" ], function( $, Backbone, Router ) {
 
  /*
  $( document ).on( "mobileinit",
    // Set up the "mobileinit" handler before requiring jQuery Mobile's module
    function() {
      // Prevents all anchor click handling including the addition of active button state and alternate link bluring.
      $.mobile.linkBindingEnabled = false;

      // Disabling this will prevent jQuery Mobile from handling hash changes
      $.mobile.hashListeningEnabled = false;
      console.log('mobile router disabled!')
    }
  );
  */

  require( [ "jquerymobile" ], function() {
    // Instantiates a new Backbone.js Mobile Router
   // this.router = new Mobile();
     var router = new Router();
     Backbone.history.start();     
  });
});