//Setup require framework paths
(function(){

  //auto set framework path based on framework script tag
  var framework = '', realMain = null, scripts = document.getElementsByTagName('script');
  for(var i = 0; i < scripts.length; ++i) {
    var script = scripts[i], 
        main = script.getAttribute('data-main'),
        m = script.src.match(/^(\w+):\/\/([^\/]+)\//);
    realMain = script.getAttribute('data-real-main');
    if(m &&main && main.match(/framework$/)) {
      var protocol = m[1], host = m[2];
      framework = 'http://'+host+'/' + (host.match(/8888$/) ?  'framework/' : '');
      break;
    }
  }

  require.config({

    baseUrl: 'js/',
    
    //framework paths
    paths: {
      'framework': framework,
      'lib'      : framework + 'js/lib',
      'ext'      : framework + 'js/ext',
      'util'     : framework + 'js/util'

    },

    //shortcuts
    map: {
      '*': {
        'backbone'      : 'ext/backbone',
        'lib/backbone'  : 'lib/backbone',
        'bootstrap'     : 'lib/bootstrap.min',
        'bootstrap.js'  : 'framework/js/lib/bootstrap.min',
        'bootstrap-combined.css' : 'lib/require/css!framework/css/bootstrap-combined.min',
        'bootstrap.css'          : 'lib/require/css!framework/css/bootstrap.min',
        'underscore'    : 'lib/lodash.min',
        'is'            : 'lib/require/is',
        'css'           : 'lib/require/css',
        'cs'            : 'lib/require.cs',
        'less'          : 'lib/require/less',
        'text'          : 'lib/require.text',
        'jquery'        : 'lib/require/is!jQuery?lib/jquery',
        'ace'           : 'lib/require/is!local?lib/ace/ace:http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js'
      }
    },

    //non-modularised libraries with deps
    shim: {
      'lib/backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      'framework/js/lib/bootstrap.min': ['jquery'],
      'lib/bootstrap.min': ['css!framework/css/bootstrap-combined.min', 'jquery'],
      'lib/bootstrap-datepicker': ['css!framework/css/bootstrap-datepicker', 'jquery', 'bootstrap'],
      //jquery plugins
      'lib/jquery.cookie': ['jquery'],
      'lib/jquery.color': ['jquery'],
      'lib/jquery.autogrow': ['jquery'],
      'lib/jquery.timeago': ['jquery']
    },

    //options
    waitSeconds: 10,

    //extra config
    config: {
      'lib/require/is': {
        local: !!window.location.host.match(/^localhost/),
        jQuery: !window.jQuery || !window.jQuery.isReady
      }
    }

  });

  //Setup library customisations and Initialise the App
  require([realMain || 'main']);

})();
