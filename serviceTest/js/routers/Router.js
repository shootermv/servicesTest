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
            app.headerView = new HeaderView({listview:app.servicesListView}).render();//   
            


            //fetch the servvices from xml
            app.servicesLst.fetchAll(app.servicesListView);
            
        }  //end of if
    },
    serviceDetails:function(method){
          if(!app.servicesLst.models.length){//takig service method from url
            app.servicesListView= new ServicesListView({ collection: app.servicesLst, router:this }); 
            //fetch the servvices from xml
            app.servicesLst.fetchAll(app.servicesListView, method);
            app.headerView = new HeaderView({listview:app.servicesListView}).render();// 

          }
          else{

            app.servicesLst.setSelectedModel(method);

          }
          
          return false;
    }
  });

return Router;


})