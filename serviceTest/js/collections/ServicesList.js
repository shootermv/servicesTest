if ( typeof define === "function" && define.amd  ) {

    define([
        'backbone',
        'models/Service',
        'models/Param',
        'collections/ParamList',
        'settings'
        ]
        , function (Backbone, Service, Param, ParamsList, settings) {

            var ServicesList = Backbone.Collection.extend({
                url:   settings.xmlURL,//"services.xml",
                model: Service,
                setSelectedModel: function (method) {
                    //console.log('trying to select') 
                    this.forEach(function(model, index) {
                        model.set({selected: model.get('method')==method ? true: false});                       
                    });
                    
                },
                fetchAll:function(servicesListView, method){



                    var _this =this; 
                    servicesListView.showLoading();
                    this.fetch({        
                        complete: function (xhr, textStatus) {
                            //console.log('fetching..')
                            servicesListView.hideLoading();
                            switch (xhr.status) {
                                case 404:
                                    textStatus = 'no xml file found at the path'
                                    break;
                                case 200:
                                   if(textStatus=='success')
                                    {                                        
                                        if(method)_this.setSelectedModel(method);
                                        return;  
                                    }                                                    
                                   break;
                            }
                            $('#main').html('<span style="color:red">Cannot load the XML - ' + textStatus + '</span>'); 

                                     
                        }
                    });


                },
                parse: function (data) {

                    var parsed = [];
                    $(data).find('resource').each(function (index, serv) {
                        parsed.push({
                            path: $(this).attr('path'),
                            method: $(this).find('method').attr('id'),
                            action: $(this).find('method').attr('action'),
                            description: $(this).find('method >description').text(),
                            datatype: $(this).find('method').attr('datatype') || 'json',
                            params: function (serv) {
                                var parList = new ParamsList();


                                $(serv).find('param').each(function (index, param) {
                                    var paramModel = new Param({ 
                                        'name': $(param).attr('name'),
                                        'defaultValue': function(){ 
                                            if(!$(param).attr('paramtype'))
                                                return $(param).attr('default');
                                            else if($(param).attr('paramtype')==='object')
                                                return JSON.parse($(param).attr('default'));
                                         }()  ,
                                        'paramtype':$(param).attr('paramtype') ?$(param).attr('paramtype'):'string',
                                        'placein': $(param).attr('placein')                             
                                    });
                                    parList.add(paramModel);
                                });


                                //get commmon headers from settings
                                $(settings.headers).each(function (index, param) {
                                    var paramModel = new Param({ 
                                        'name': $(param).attr('name'),
                                        'defaultValue': function(){ 
                                            if(!$(param).attr('paramtype'))
                                                return $(param).attr('default');
                                            else if($(param).attr('paramtype')==='object')
                                                return JSON.parse($(param).attr('default'));
                                         }()  ,
                                        'paramtype':$(param).attr('paramtype') ?$(param).attr('paramtype'):'string',
                                        'placein': $(param).attr('placein')                             
                                    });  
                                    parList.add(paramModel);                                  
                                });

                                return parList;
                            } (serv)
                        });
                    });
                    return parsed;
                },
                
                collectParams:function(collctn, parList){
                    
                    $(collctn).each(function (index, param) {
                        var paramModel = new Param({ 
                            'name': $(param).attr('name'),
                            'defaultValue': function(){ 
                                if(!$(param).attr('paramtype'))
                                    return $(param).attr('default');
                                else if($(param).attr('paramtype')==='object')
                                    return JSON.parse($(param).attr('default'));
                             }()  ,
                            'paramtype':$(param).attr('paramtype') ?$(param).attr('paramtype'):'string',
                            'placein': $(param).attr('placein')                             
                        });  
                        parList.add(paramModel);                                  
                    });
                },

                fetch: function (options) {
                    options = options || {};
                    options.dataType = "xml";

                    return Backbone.Collection.prototype.fetch.call(this, options);
                }
            });

            return ServicesList;

        });

}
   