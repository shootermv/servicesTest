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
                          if( _this.model.get('datatype')!='json') {
                            _this.$el.find('pre').html(data); //for datatype "TEXT"
                          }
                          else{
                            _this.displayJson(data); 
                          }
                          _this.model.set({'status':'succeeded'});
                                               
                    }).fail(function(data,status, error){
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
else
{



    var JsonView = Backbone.View.extend({

        template: _.template($('#json-view').html()),
        invokeService: function () {

            var _this = this;

            //loading animation
            $.mobile.loading('show', {
                text: 'request sended',
                textVisible: true,
                theme: 'e',
                textonly: false
            });


            _this.prepareParams();

            console.log('params-'+ _this.params);  // params-null
            console.log('url-'+ _this.url);   //  url-/api/wines

            $.ajax({
                type: _this.model.get('action'), //GET or POST or PUT or DELETE verb
                timeout: 2000,
               // cache: false,
                url: _this.url,
                data: _this.params,
                contentType: 'application/json; charset=utf-8', // content type sent to server
                dataType: 'json', //Expected data format from server
                processdata: _this.processdata, //True or False
                success: function (data) {//On Successfull service call
                    _this.displayJson(data);
                },
                error: function (data, status, error) {
                    _this.displayJson({ error: data });
                },
                complete: function (msg) {
                    $.mobile.loading('hide');
                    console.log('ui-loader is visible '+$('.ui-loader').is(':visible'))
                    _this.$el.trigger('expand');

                }
            })

        },
        prepareParams: function () {
            this.url = this.model.get('path');
            this.processdata = (this.model.get('action') == 'GET');
            
            //build data of the request from "params":
            
            this.params = {};
            
            var beforeparams=[],afterparams='';
            
            _.each(this.model.get('params').models, function (param) {
                
                if (param.get('placein')) {
                    switch(param.get('placein')){
                       case 'before':
                          beforeparams.push( param.get('defaultValue'));
                          break;
                       case 'after':                      
                          afterparams = afterparams + param.get('name')+'='+ param.get('defaultValue')+'&';                   
                          break;
                    }//end of switch                
                }
                else
                    this.params[param.get('name')] = param.get('defaultValue').replace(/\'/g, '\\"');
                
                
            }, this);//end of each
            
            
            
            
            //take care of before params:
            if(beforeparams.length>0)this.url =this.checkIfHasLast(this.url ,'/')+ beforeparams.join('/');
            
            
            
            
            //take care of after params:
            if(afterparams!=''){
              afterparams=afterparams.substring(0,afterparams.length-1);//remove last '&'
              this.url =this.checkIfHasLast(this.url ,'?') +afterparams;
            }
            
            //take care of usual params:
            
            //avoid stringify for get
            if((this.model.get('action') !== 'GET' )) this.params=JSON.stringify(this.params);
            //no params
            if(this.model.get('params').models.length==0){ this.params=null; }


            return this.url  ;
        },
        checkIfHasLast: function(url ,charMustBeLast){
            return (url[url.length-1]==charMustBeLast) ? url : url+charMustBeLast;
            
        },  
        displayJson: function (data) {
            var jsonstring = JSON.stringify(data, undefined, 2);
            var msg = this.syntaxHighlight(jsonstring);
            this.$el.find('pre').html(msg);
        },

        render: function () {

            this.$el.html(this.template());
            this.$el.attr("data-role", "collapsible").attr("data-theme", "c").attr("data-content-theme", "d");


            return this;
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
}