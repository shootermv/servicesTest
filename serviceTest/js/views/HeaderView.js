    define([
        'backbone',
        'text!templates/header.html'
        ]
        , function (Backbone, header_tpl) {

            var HeaderView = Backbone.View.extend({
                el: '#header',
                template: _.template(header_tpl),
                initialize: function () {

                },
                events: {
                    'click a.runall': 'runBatch'
                },
                runBatch: function () {

                  var _this=this;
                  var oldtext=_this.$el.find('h1').text();
                  _this.$el.find('h1').text('Batch running...');

                  _this.options.listview.runBatch(function(){

                    _this.$el.find('h1').text(oldtext);
                  });
                  return false;
                },
                render: function () {

                    this.$el.html(this.template());
                    this.$el.trigger('create')
                }
            });

            return HeaderView;
    });