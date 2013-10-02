if ( typeof define === "function" && define.amd  ) {

    define([      
        ]
        , function () {


             return {
             	serverURL:'',
             	xmlURL:'services.xml',
                headers:[{
                    "name"   :"headerFromSett",
                    "default":"somevalue",
                    "placein":"header"

                }],
                getDependencyParam:function(){
                     
                     $.post('/login',function(data){
                        console.log('loading dependancy param')
                        window.dependencyParam=data.token;
                     });
                     
                     //window.dependencyParam="tokeeen";
                }()
             }

        });

}
