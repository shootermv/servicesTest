if ( typeof define === "function" && define.amd  ) {

    define([
        'backbone',
        'views/BaseView',
        'views/ServicesListItemView'        
        ]
        , function (Backbone, BaseView, ServicesListItemView) {

            var ServicesListView = BaseView.extend({
                el: '#list',
                initialize: function () {
                    _.bindAll(this, 'render');
                    this.listenTo(this.collection, "sync  reset remove", this.render);//add   

                    this.itemViews=[];
                },
                events: {
                    'click': 'select'
                },
                select: function (e) {

                    this.options.router.navigate($(e.target).attr('href'),true);
                    return false;
                },

                render: function (e) {
                    var _this = this;
                    _this.$el.empty();
               
                    //console.log('list rendering...')
                    $(_this.collection.models).each(function (i, servicemodel) {

                        var servLiv=new ServicesListItemView({ model: servicemodel });
                        _this.itemViews[servicemodel.get('method')]=servLiv;//
                        _this.$el.append(servLiv.render().el);
                    });
                    _this.$el.listview().listview('refresh');                                    
                    
                },
                runBatch:function(callback){
                    var _this = this;
                   
                    

                    //loading animation
                    _this.showLoading()

                    var intervalId,idx=0;
                    intervalId=setInterval(function () {

                          
                        var servicemodel =_this.collection.at(idx);
                        if(servicemodel ){
                            idx+=1;
                             //console.log(servicemodel.get('method'));
                            //mark the processing view
                            var current_item_view=_this.itemViews[servicemodel.get('method')];
                            current_item_view.setNewTheme('e',current_item_view.el);
                   
                            
                            servicemodel.invoke().done(function(){
                                servicemodel.set({'status':'succeeded'});
                            }).fail(function(){
                                //current_item_view.markFailing()
                                servicemodel.set({'status':'failed'});
                            }).always(function(){
                                current_item_view.setNewTheme('c',current_item_view.el);

                            });
                            
                        }
                        else
                        {
                            _this.hideLoading(); 
                            callback.call();
                            clearInterval(intervalId);
                        }
                      

                    },400);                    
                }
            });

            return ServicesListView;
    });
}
else
{    

    var ServicesListView = Backbone.View.extend({
        el: '#list',
        initialize: function () {

            _.bindAll(this, 'render');
            this.listenTo(this.collection, "reset sync remove", this.render);//add 
        },
        events: {
            'click': 'select'
        },
        select: function () {

            return false;
        },
        render: function () {
            console.log('list view rendering now')
            var _this = this;
            _this.$el.empty();


            
            $(this.collection.models).each(function (i, servicemodel) {
                _this.$el.append(new ServicesListItemView({ model: servicemodel }).render().el);
            });
            
            _this.$el.listview().listview('refresh');
            //$('#all-notes').page();
        }
    });

}