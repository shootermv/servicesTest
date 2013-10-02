if ( typeof define === "function" && define.amd  ) {


    define([
        'backbone',
        'views/BaseView',
        'text!templates/json-view.html'
        ]
        , function (Backbone, BaseView, json_view_tpl) {



            var JsonView = BaseView.extend({

                template: _.template(json_view_tpl),
                initialize: function () {                   

                    this.listenTo(this.model, 'change', this.changeDataType);
                },
                
                invokeService: function () {

                    var _this = this;

                    
                    //loading animation
                    this.showLoading();            
                    _this.model.invoke().done(function(data){  

                          switch(_this.model.get('datatype')){
                            case 'json' : 
                                _this.displayJson(data);                             
                                break;
                            case 'text' :                                 
                                _this.$el.find('pre').html(_this.formatXml(data));                             
                                break;  

                                
                          }

                          _this.model.set({'status':'succeeded'});
                                               
                    }).fail(function(data,status, error){
                            console.log('y',error)
                            _this.displayJson({ error: data });
                            _this.model.set({'status':'failed'});

                    }).always(function(){
                            $.mobile.loading('hide');                           
                            _this.$el.trigger('expand');  
                    })


                },
                
                changeDataType:function (data) {

                        this.$el.find('#jsonheader .ui-btn-text').text(this.model.get('datatype'));
                },
                	
                displayJson: function (data) {
                    var jsonstring = JSON.stringify(data, undefined, 2);
                    var msg = this.syntaxHighlight(jsonstring);
                    this.$el.find('pre').html(msg);
                },

                render: function () {
                    //moshe
                    
                    this.$el.html(this.template(this.model.toJSON()));
                    this.$el.attr("data-role", "collapsible").attr("data-theme", "c").attr("data-content-theme", "d");
                     

                    return this;
                },
                formatXml: function (xml) {
 
                    var formatted = '';
                    var reg = /(>)(<)(\/*)/g;
                    xml = xml.replace(reg, '$1\r\n$2$3');
                    var pad = 0;
     
                    jQuery.each(xml.split('\r\n'), function(index, node)
                    {
                        var indent = 0;
                        if (node.match( /.+<\/\w[^>]*>$/ ))
                        {
                            indent = 0;
                        }
                        else if (node.match( /^<\/\w/ ))
                        {
                            if (pad != 0)
                            {
                                pad -= 1;
                            }
                        }
                        else if (node.match( /^<\w[^>]*[^\/]>.*$/ ))
                        {
                            indent = 1;
                        }
                        else
                        {
                            indent = 0;
                        }
                        var padding = '';
                        for (var i = 0; i < pad; i++)
                        {
                            padding += '  ';
                        }
                        formatted += padding + node + '\r\n';
                        pad += indent;
                    });
     
                    return formatted.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/ /g, '&nbsp;').replace(/\n/g,'<br />');;
                },                
                syntaxHighlight: function (json) {

                    if (typeof json != 'string') {
                        json = JSON.stringify(json, undefined, 2);
                    }
                    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                        var cls = 'number';
                        if (/^"/.test(match)) {
                            if (/:$/.test(match)) {
                                cls = 'key';
                            } else {
                                cls = 'string';
                            }
                        } else if (/true|false/.test(match)) {
                            cls = 'boolean';
                        } else if (/null/.test(match)) {
                            cls = 'null';
                        }
                        return '<span class="' + cls + '">' + match + '</span>';
                    });
                },
                destroy_view: function () {

                    this.remove();
                    this.unbind();
                }
            });
            return JsonView;

        });
}