//Setup require framework paths
(function(){

  //framework plugins - assist in loading js/css
  //inline framework helper function to load 
  define('fw',{
    load: function (name, req, onLoad, config) {

      if(config.framework.baseUrl === undefined)
        throw "Please define: config.framework.baseUrl";

      //no extension, assume js
      if(!name.match(/\.\w+$/)) name += ".js";

      var extension = name.match(/\.(\w+)$/)[1];

      if(extension == 'js') {

        var url = config.framework.baseUrl + "js/" + name;
        req([url], function (value) {
          onLoad(value);
        });

      } else if (extension == 'css') {

        var url = config.framework.baseUrl + "css/" + name;
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;

        document.getElementsByTagName('head')[0].appendChild(link);

        onLoad(url);

      } else {
        console.log("unknown extension: " + extension);
      }

    }
  });

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

    framework: {
      baseUrl: framework
    },

    baseUrl: 'js/',
    map: {
      //shortcuts. not using paths to maintain use relative paths
      '*': {
        'jquery'            : 'fw!lib/jquery',
        'backbone'          : 'fw!lib/backbone',
        'underscore'        : 'fw!lib/lodash.min'
      }
    },

    shim: {
      'backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      'bootstrap': ['jquery'],
      'jquery.cookie': ['jquery'],
      'jquery.color': ['jquery'],
      'fw!lib/prettify/prettify': ['fw!prettify.css']
    }
  });

  //Setup library customisations and Initialise the App
  require(['main']);

})();
