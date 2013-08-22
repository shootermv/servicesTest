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
                                        'defaultValue': $(param).attr('default') ,
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

                fetch: function (options) {
                    options = options || {};
                    options.dataType = "xml";

                    return Backbone.Collection.prototype.fetch.call(this, options);
                }
            });

            return ServicesList;

        });

}
else
{

    var ServicesList = Backbone.Collection.extend({
        url:   "services.xml",
        model: Service,
        parse: function (data) {

            var parsed = [];
            $(data).find('resource').each(function (index, serv) {
                parsed.push({
                    path: $(this).attr('path'),
                    method: $(this).find('method').attr('id'),
                    action: $(this).find('method').attr('action'),
                    description: $(this).find('method >description').text(),
                    params: function (serv) {
                        var parList = new ParamsList();
                        $(serv).find('param').each(function (index, param) {
                            var paramModel = new Param({ 
                                'name': $(param).attr('name'),
                                'defaultValue': $(param).attr('default') ,
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

        fetch: function (options) {
            options = options || {};
            options.dataType = "xml";

            return Backbone.Collection.prototype.fetch.call(this, options);
        }
    });
}    