if ( typeof define === "function" && define.amd  ) {

    define([
        'backbone',
        'settings'
        ]
        , function (Backbone, settings) {

			var Service = Backbone.Model.extend({    
			    defaults:{
                      
			            path: '',
			            method: '',
			            action: '',
                        datatype:'json',
			            params:[],
                        status:''
			    },

			    invoke:function(){

			    	    this.prepareParams();
                        return $.ajax({
                            type: this.get('action'), //GET or POST or PUT or DELETE verb
                            timeout: 2000,
                           // cache: false,
                            url: this.url,
                            data: this.dataparams,
                            contentType:'application/json', // content type sent to server
                            dataType:this.get('datatype') ,//'json', //Expected data format from server  //text
                            processdata: this.processdata //True or False                      
                        })
			    },	

                prepareParams: function () {
                   //this.url
                   //this.params  
                   //this.processdata


                    this.url = this.get('path');
                    this.processdata = (this.get('action') == 'GET');
                    
                    //build data of the request from "params":
            		
                    this.dataparams = {};
            		
            		var beforeparams=[],afterparams='';
            		
                    _.each(this.get('params').models, function (param) {
            		    
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
                            this.dataparams[param.get('name')] = param.get('defaultValue').replace(/\'/g, '\\"');
                        
            			
                    }, this);//end of each
            		
            		
            		
            		
            		//take care of before params:
            		if(beforeparams.length>0)this.url =this.checkIfHasLast(this.url ,'/')+ beforeparams.join('/');
            		
            		
            		
            		
            		//take care of after params:
            		if(afterparams!=''){
                      afterparams=afterparams.substring(0,afterparams.length-1);//remove last '&'
            		  this.url = this.checkIfHasLast(this.url ,'?') +afterparams;
            		}
                    //serverUrL from settings
            		this.url =settings.serverURL + this.url;
            		//take care of usual params:
            		
            		//avoid stringify for get
                    if(this.get('action') !== 'GET' ) this.dataparams=JSON.stringify(this.dataparams);
            		//no params
            		if(!(this.get('params').models || {}).length){ this.dataparams=null; }


                    return this.url  ;
                },

            	checkIfHasLast: function(url ,charMustBeLast){
            		return (url[url.length-1]==charMustBeLast) ? url : url+charMustBeLast;            		
            	}			    
			});


			return Service;

        });
}
else
{
	var Service = Backbone.Model.extend({    
	    defaults:{
	            path: '',
	            method: '',
	            action: '',
	            params:[]
	    }
	});

}

