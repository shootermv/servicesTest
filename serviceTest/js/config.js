require.config({
  baseUrl: "js",
 // urlArgs: 'cb=' + Math.random(),
  deps:["config","app-amd"],
  paths: {
    'jquery'    : 'jquery/jquery',        
    'jquery.mobile': 'mobile/jquery.mobile-1.3.1.min' ,
    'underscore': 'underscore-amd/underscore-min',
    'backbone'  : 'backbone-amd/backbone-min',
    text: 'plugins/text'
  },
  shim: {
    underscore: {
      exports: "_"
    },
    'jquery'    : 'jquery',
     backbone: {
          deps: ['underscore', 'jquery', 'jquery.mobile'],
          exports: 'Backbone'
     }
 }
});
