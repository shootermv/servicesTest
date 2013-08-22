if ( typeof define === "function" && define.amd  ) {

    define([
        'backbone'      
        ]
        , function (Backbone) {

			var BaseView = Backbone.View.extend({
			  showLoading: function( ) {
			    //loading animation
			    $.mobile.loading('show', {
			        text: 'request sended',
			        textVisible: true,
			        theme: 'e',
			        textonly: false
			    });
			  },
			  hideLoading: function( ) {
			  	$.mobile.loading('hide');  
			  } 
			});

		return  BaseView;
	});

}