//Setup require framework paths
(function(){

  //auto set framework path based on framework script tag
  var framework = '', scripts = document.getElementsByTagName("script");
  for(var i = 0; i < scripts.length; ++i) {
    var script = scripts[i], main = script.getAttribute('data-main'),
        m = script.src.match(/^(\w+):\/\/([^\/]+)\//);
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
        'bootstrap'     : 'lib/bootstrap',
        'underscore'    : 'lib/lodash.min',
        'css'           : 'lib/require.css',
        'text'          : 'lib/require.text'
      }
    },

    //non-modularised libraries with deps
    shim: {
      'lib/backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      'lib/bootstrap': ['jquery'],
      //jquery plugins
      'lib/jquery.cookie': ['jquery'],
      'lib/jquery.color': ['jquery'],
      'lib/jquery.autogrow': ['jquery'],
      'lib/jquery.timeago': ['jquery'],
      'lib/prettify': ['css!framework/css/prettify']
    }
  });

  //Setup library customisations and Initialise the App
  require(['main']);

})();
