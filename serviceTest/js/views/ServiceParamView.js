if ( typeof define === "function" && define.amd  ) {


    define([
        'backbone',
        'text!templates/param-view.html'       
        ]
        , function (Backbone, param_view_tpl) {


            var ServiceParamView = Backbone.View.extend({
                tagName: "div",
                template: _.template(param_view_tpl),
                events: {
                    "change": "change"
                },
                change: function (event) {
                   

                    // Apply the change to the model
                    var targetval = event.target.value;
                    
                    //for receive object param: 
                    if(this.model.get('paramtype')=='object'){
                      targetval=JSON.parse(targetval);
                    }

                    var change = {};
                    change['defaultValue'] =targetval;
                    
                    this.model.set(change);
                },
                render: function () {
                    this.$el.attr('data-role', 'fieldcontain').html(this.template(this.model.toJSON()));                
                    return this;
                }
            });

            return ServiceParamView ;
        });

}
else
{

     var ServiceParamView = Backbone.View.extend({
        tagName: "div",
        template: _.template($('#param-input').html()),
        events: {
            "change": "change"
        },
        change: function (event) {
           

            // Apply the change to the model
            var target = event.target;
            var change = {};
            change['defaultValue'] = target.value;
            
            this.model.set(change);
        },
        render: function () {
            this.$el.attr('data-role', 'fieldcontain').html(this.template(this.model.toJSON()));
            return this;
        }
    });
}
