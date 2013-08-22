if ( typeof define === "function" && define.amd  ) {

    define([
        'backbone',
        'models/Service',
        'models/Param',
        'collections/ParamList',
        'views/ServiceParamView',        
        'text!templates/params-list-view.html'
        ]
        , function (Backbone, Service, Param, ParamsList, ServiceParamView, params_list_view_tpl) {


            var ServiceParamsListView = Backbone.View.extend({
             
                template: _.template(params_list_view_tpl),

                render: function () {

                    this.$el.html(this.template());
                    this.$el.attr("data-role", "collapsible").attr("data-theme", "c").attr("data-content-theme", "d").attr('data-collapsed', "false");
    

                    _.each(this.collection.models, function (param_model) {
                        this.$el.append(new ServiceParamView({ model: param_model }).render().el);
                    }, this);
                    //no params
                    if(this.collection.models.length==0)this.$el.append('<span>This servise has no parameters</span>')
                    return this;
                }
            });

            return ServiceParamsListView;
    });

    
}
else  
{

    var ServiceParamsListView = Backbone.View.extend({
     
        template: _.template($('#params-view').html()),

        render: function () {

            this.$el.html(this.template());
            this.$el.attr("data-role", "collapsible").attr("data-theme", "c").attr("data-content-theme", "d").attr('data-collapsed', "false");

            _.each(this.collection.models, function (param_model) {
                this.$el.append(new ServiceParamView({ model: param_model }).render().el);
            }, this);
            //no params
            if(this.collection.models.length==0)this.$el.append('<span>This servise has no parameters</span>')
            return this;
        }
    });

}  