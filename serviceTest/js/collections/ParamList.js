
if ( typeof define === "function" && define.amd  ) {

    define([
        'backbone',
        'models/Param'
        ]
        , function (Backbone, Param) {

			var ParamsList = Backbone.Collection.extend({
			    model: Param,
                nonHeaders:function() {
				    filtered = this.filter(function(param) {
				       return param.get("placein") !== 'header';
				     });
				    return new ParamsList(filtered);
                },
                Headers:function() {
				    filtered = this.filter(function(param) {
				       return param.get("placein") === 'header';
				     });
				    return new ParamsList(filtered);
                }

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