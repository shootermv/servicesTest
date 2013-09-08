
if ( typeof define === "function" && define.amd  ) {


    define([
        'backbone',
        'views/DataTypeView',
        'text!templates/more-details-view.html',
        'text!templates/properties-view.html'
        ]
        , function (Backbone, DataTypeView, more_details_tpl, properties_tpl) {


            var MoreDetailsView = Backbone.View.extend({
                template: _.template(more_details_tpl),
                events: {
                    'click [data-role=button]': 'buttonclick'
                },
                buttonclick: function (e) {
                    e.preventDefault();
                    
                    if ($(e.target).hasClass('ui-btn-active')) {  return false; }

                    this.$el.find('.ui-controlgroup-controls a').toggleClass('ui-btn-active');
                

                   

                    switch ($(e.target).text()) {
                        case 'Description':

                            this.$el.find('#details-container').html(this.model.get('description'));
                            
                            break;
                        case 'Properties':
                            


                            var prop_templ = _.template(properties_tpl);
                            this.$el.find('#details-container').html(prop_templ({model:this.model.toJSON(),modified_url:this.options.modified_url}));

                            //attach datadypte view
                            this.$el.find('#details-container').prepend(new DataTypeView({ model: this.model}).render().el);
                            break;
                    };
                    $('#details-container').trigger('create');
                    return false;
                },
                render: function () {

                    this.$el.html(this.template());
                    this.$el.attr("data-role", "collapsible").attr("data-theme", "c").attr("data-content-theme", "d");
                    //by default the description is shown
                    this.$el.find('#details-container').html(this.model.get('description'));
                    return this;
                }
            });
            return MoreDetailsView;
        });
}
else
{

    var MoreDetailsView = Backbone.View.extend({
        template: _.template($('#more-view').html()),
        events: {
            'click [data-role=button]': 'buttonclick'
        },
        buttonclick: function (e) {
            e.preventDefault();
            
            if ($(e.target).hasClass('ui-btn-active')) {  return false; }

            this.$el.find('.ui-controlgroup-controls a').toggleClass('ui-btn-active');
            console.log('allready-'+$(e.target).text());
            switch ($(e.target).text()) {
                case 'Description':
                    this.$el.find('#details-container').html(this.model.get('description'));
                    break;
                case 'Properties':
                    var prop_templ = _.template($('#properties').html());
                    this.$el.find('#details-container').html(prop_templ({model:this.model.toJSON(),modified_url:this.options.modified_url}));
                    break;
            };
            $('#details-container').trigger('create');
            return false;
        },
        render: function () {

            this.$el.html(this.template());
            this.$el.attr("data-role", "collapsible").attr("data-theme", "c").attr("data-content-theme", "d");
            //by default the description is shown
            this.$el.find('#details-container').html(this.model.get('description'));
            return this;
        }
    });


}