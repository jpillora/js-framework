//Setup require framework paths
(function(){

  //auto set framework path based on framework script tag
  var framework = '', realMain = null, scripts = document.getElementsByTagName("script");
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
        'jquery'        : 'lib/jquery',
        'backbone'      : 'lib/backbone',
        'bootstrap'     : 'lib/bootstrap.min',
        'underscore'    : 'lib/lodash.min',
        'css'           : 'lib/require/css',
        'cs'            : 'lib/require.cs',
        'less'          : 'lib/require/less',
        'text'          : 'lib/require.text'
      }
    },

    //non-modularised libraries with deps
    shim: {
      'lib/backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      'lib/bootstrap.min': ['css!framework/css/bootstrap-combined.min', 'jquery'],
      'lib/prettify': ['css!framework/css/prettify'],
      //jquery plugins
      'lib/jquery.cookie': ['jquery'],
      'lib/jquery.color': ['jquery'],
      'lib/jquery.autogrow': ['jquery'],
      'lib/jquery.timeago': ['jquery']
    },

    //options
    waitSeconds: 10
  });

  //Setup library customisations and Initialise the App
  require(['main']);

})();
