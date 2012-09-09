//Setup require framework paths
(function(){

  //auto set framework path based on framework script tag
  var framework = '', scripts = document.getElementsByTagName("script");
  for(var i = 0; i < scripts.length; ++i){
    var script = scripts[i], main = script.getAttribute('data-main'),
        m = script.src.match(/^(\w+):\/\/([^\/]+)\//);
    if(m &&main && main.match(/framework$/)) {
      var protocol = m[1], host = m[2];
      framework = host === 'localframework:8888' ?  'http://localframework:8888/framework/' : 'http://'+host+'/';
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
        'underscore'    : 'lib/lodash.min',
        'css'           : 'lib/require.css'
      }
    },

    //non-modularised libraries with deps
    shim: {
      'backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      'bootstrap': ['jquery'],
      'jquery.cookie': ['jquery'],
      'jquery.color': ['jquery'],
      'lib/prettify': ['css!framework/css/prettify']
    }
  });

  //Setup library customisations and Initialise the App
  require(['main']);

})();
