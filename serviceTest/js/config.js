require.config({
  baseUrl: "js",
 // urlArgs: 'cb=' + Math.random(),
  deps:["config","app-amd"],
  paths: {
    'jquery'    : 'jquery/jquery',        
    'jquerymobile.config' : 'mobile/jquerymobile.config',
    'jquerymobile': 'mobile/jquery.mobile-1.3.1.min' ,
    'underscore': 'underscore-amd/underscore-min',
    'backbone'  : 'backbone-amd/backbone-min',
    text: 'plugins/text'
  },
  shim: {
    underscore: {
      exports: "_"
    },
    'jquery'    : 'jquery',
    'jquerymobile.config' : ['jquery'],
     jquerymobile : {
          deps : ["jquery", 'jquerymobile.config']
     },
     backbone: {
          deps: ['underscore', 'jquery', 'jquerymobile'],
          exports: 'Backbone'
     }
 }
});
