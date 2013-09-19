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

                }]
             }

        });

}
