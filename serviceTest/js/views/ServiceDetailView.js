

if ( typeof define === "function" && define.amd  ) {


    define([
        'backbone',
        'views/ParamsListView',
        'views/JsonView',
        'views/MoreDetailsView',
        'text!templates/service-detail.html'
        ]
        , function (Backbone, ServiceParamsListView, JsonView, MoreDetailsView, service_detail_tpl) {


            var ServiceDetailView = Backbone.View.extend({
                template: _.template(service_detail_tpl),
                initialize: function () {
                    this.render();

                    //this.listenTo(this.model, 'change', this.render);
                },
                events: {
                    'click #invokebutton': 'invokeService'
                },
                invokeService: function () {
                    
                    this.json_view.invokeService();
                    return false;
                },
                render: function () {

                    this.$el.html(this.template(this.model.toJSON()));
                    var collapseset = this.$el.find('[data-role="collapsible-set"]');
                    //params view
                    this.params_view = new ServiceParamsListView({ collection: this.model.get('params') });
                    collapseset.append(this.params_view.render().el);

                    //json view            		
                    this.json_view = new JsonView({ model: this.model });		
                    collapseset.append(this.json_view.render().el);
                    
                    //more view		
                    this.more_view = new MoreDetailsView({ model: this.model, modified_url:this.model.prepareParams() });
                    collapseset.append(this.more_view.render().el);

                    $('#main').trigger('create')
                    
                    return this;
                },
                destroy_view: function () {

                    this.remove();
                    this.unbind();
                }

            });


            return ServiceDetailView;

        });
}
else
{
    var ServiceDetailView = Backbone.View.extend({
        template: _.template($('#service-detail').html()),
        initialize: function () {
            this.render();
        },
        events: {
            'click #invokebutton': 'invokeService'
        },
        invokeService: function () {

            this.json_view.invokeService();
            return false;
        },
        render: function () {

            this.$el.html(this.template(this.model.toJSON()));
            var collapseset = this.$el.find('[data-role="collapsible-set"]');
            //params view
            this.params_view = new ServiceParamsListView({ collection: this.model.get('params') });
            collapseset.append(this.params_view.render().el);

            //json view
            
            this.json_view = new JsonView({ model: this.model });       
            collapseset.append(this.json_view.render().el);

            //more view     
            this.more_view = new MoreDetailsView({ model: this.model, modified_url:this.json_view.prepareParams() });
            collapseset.append(this.more_view.render().el);

            return this;
        },
        destroy_view: function () {

            this.remove();
            this.unbind();
        }

    });

}