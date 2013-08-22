
if ( typeof define === "function" && define.amd  ) {

    define([
        'backbone',
        'models/Param'
        ]
        , function (Backbone, Param) {

			var ParamsList = Backbone.Collection.extend({
			    model: Param
			});


			return ParamsList;

        });
}
else
{

	var ParamsList = Backbone.Collection.extend({
	    model: Param
	});

}