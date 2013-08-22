if ( typeof define === "function" && define.amd  ) {


    define([
        'backbone',
        'text!templates/datatype.html'       
        ]
        , function (Backbone, datatype_tpl) {


            var DataTypeView = Backbone.View.extend({
                tagName: "div",
                template: _.template(datatype_tpl),
                initialize:function(){
                 // this.listenTo(this.model,'change',this.render);
                },
                events: {
                    "change": "change"
                },
                change: function (event) {
                   //console.log(this.model.get('datatype'));

                    // Apply the change to the model
                    var target = event.target;
                    var change = {};
                    change['datatype'] = target.value;
                    console.log('changing type to '+target.value)
                    this.model.set(change);
                },
                render: function () {
                    // console.log(this.model.get('datatype'));
                    this.$el.attr('data-role', 'fieldcontain').html(this.template(this.model.toJSON()));                

                    return this;
                }
            });

            return DataTypeView;
        });

}