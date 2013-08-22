require.config({
  baseUrl: "../serviceTest/js/",
 // urlArgs: 'cb=' + Math.random(),
  paths: {
    'jquery': 'jquery/jquery',        
    'underscore': 'underscore-amd/underscore-min',
    'jquery.mobile': 'mobile/jquery.mobile-1.3.1.min' ,
    'backbone': 'backbone-amd/backbone-min',
    'jasmine': '../../../jasmine/lib/jasmine-1.3.1/jasmine',
    'jasmine-html': '../../../jasmine/lib/jasmine-1.3.1/jasmine-html',
    'sinon': '../../../jasmine/lib/sinon/sinon',
    'spec': '../../../jasmine/spec/',
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
     },
    'jquery.mobile':['jquery'],

    sinon:{        
      exports: 'sinon'
    },
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    }
  }
});




require(['underscore', 'backbone', 'jasmine-html', 'sinon'], function (_, Backbone , jasmine, sinon) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];
   
    specs.push('spec/views/JsonViewSpec');


    $(function () {
        require(specs, function () {
            jasmineEnv.execute();
        });
    });

});
