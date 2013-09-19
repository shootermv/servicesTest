

// Includes File Dependencies

  require([ "jquery", "backbone", "routers/Router","jquerymobile.config"], function( $, Backbone, Router,l ) {
  
	  require( [ "jquerymobile" ], function() {

	     var router = new Router();
	     Backbone.history.start();     
	  });  
  });
