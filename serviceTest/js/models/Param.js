
if ( typeof define === "function" && define.amd  ) {

    define([
        'backbone'
        ]
        , function (Backbone) {

			var Param = Backbone.Model.extend({
			    defaults: {
			        name: '',
			        defaultValue: '',
			        placein:''
			    }
			});


			return Param;

        });
}
else
{


	var Param = Backbone.Model.extend({
	    defaults: {
	        name: '',
	        defaultValue: '',
			placein:''
	    }
	});
}