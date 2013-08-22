define([

	 'views/ServicesListView',
	 'collections/ServicesList',
   'views/HeaderView'     
	 ],
 function (ServicesListView, ServicesList, HeaderView) {

  var app={};
  app.servicesLst = new ServicesList();   
  app.servicesListView =null;//not yet
  

  


  var Router = Backbone.Router.extend({
    routes: {
      "": "list",
      "services/:method":"serviceDetails"
    },

    list: function(){

        if(!app.servicesLst.models.length){
            
            app.servicesListView= new ServicesListView({ collection: app.servicesLst, router:this }); 
            app.headerView = new HeaderView({listview:app.servicesListView}).render();       
            //loading animation
            app.servicesListView.showLoading();
            
            

            //fetch the servvices from xml
            app.servicesLst.fetch({        
                complete: function (xhr, textStatus) {
                    console.log('fetching..')
                    app.servicesListView.hideLoading();
                    switch (xhr.status) {
                        case 404:
                            textStatus = 'no xml file found at the path'
                            break;
                        case 200:
                           if(textStatus=='success')
                              return;                  
                           break;
                    }
                    $('#main').html('<span style="color:red">Cannot load the XML - ' + textStatus + '</span>');            
                }
            });
        }
    },
    serviceDetails:function(method){

        alert(method);
        return false;
    }
  });



  app.router = new Router();
  Backbone.history.start();

  return app;
})