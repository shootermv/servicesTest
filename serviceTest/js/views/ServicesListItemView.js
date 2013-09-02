
if ( typeof define === "function" && define.amd  ) {
    define([
        'backbone',
        'views/ServiceDetailView',
        'text!templates/service-list-item.html'
        ]
        , function (Backbone, ServiceDetailView, service_list_item_tpl) {


           

               
            var ServicesListItemView = Backbone.View.extend({
                tagName: "li",
                template: _.template(service_list_item_tpl),
                initialize:function(){
                
                    this.listenTo(this.model, 'change:status', this.statuschanged);
                    this.listenTo(this.model, 'change:selected', this.select);

                },
                statuschanged:function () {
                   if(this.model.get('status')=='failed') this.markFailing();
                   if(this.model.get('status')=='succeeded') this.markSuccess();
                },
                events: {
                    //'click .ui-btn-text': 'select'
                },
                select: function () {
                    
                    if(!this.model.get('selected'))return;//if false

                    if (this.detailView) this.detailView.destroy_view();
                    $('#main').empty();
                    this.setNewTheme('c', this.$el.siblings());
                    this.setNewTheme('b', this.$el);


                    this.detailView = new ServiceDetailView({ model: this.model });
                    $('#main').html(this.detailView.render().el);
                  
               


                    $('#main').trigger('create');
                    

                    return false;

                },
                markFailing:function () {
                     this.$el.find('.ui-icon').addClass('error');                   
                },
                markSuccess:function (){
                    this.$el.find('.ui-icon').addClass('success');
                },
                setNewTheme: function (newTheme, object) {
                    $.mobile.activePage.find(object).removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e').addClass('ui-btn-up-' + newTheme).attr('data-theme', newTheme);                    
                },

                render: function () {
                    //console.log('listitem rendering...')
                    this.$el.html(this.template(this.model.toJSON()));
                    return this;
                }
            });

            return ServicesListItemView;

        });


}
else
{

    var ServicesListItemView = Backbone.View.extend({
        tagName: "li",
        template: _.template($('#service-list-item').html()),
        events: {
            'click .ui-btn-text': 'select'
        },
        select: function () {

            if (this.detailView) this.detailView.destroy_view();
            $('#main').empty();
            this.setNewTheme('c', this.$el.siblings());
            this.setNewTheme('b', this.$el);


            this.detailView = new ServiceDetailView({ model: this.model });
            $('#main').html(this.detailView.render().el);
          
       


            $('#main').trigger('create');
            return false;
        },

        setNewTheme: function (newTheme, object) {
            $.mobile.activePage.find(object).removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e').addClass('ui-btn-up-' + newTheme).attr('data-theme', newTheme);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

}