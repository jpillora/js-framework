//Setup require framework paths
(function(){


  //inline framework helper function - allows a second base URL
  define('fw',{
    load: function (name, req, load, config) {

      if(config.framework.baseUrl === undefined)
        throw "Please define: config.framework.baseUrl";

      var newName = config.framework.baseUrl + name;

      if(!newName.match(/\.\w+$/))
        newName += ".js";

      //console.log("load framework name: " + newName);
      //req has the same API as require().
      req([newName], function (value) {
        //console.log("load framework value: " + name);
        load(value);
      });
    }
  });

  define('fwcss',{
    load: function (name, req, load, config) {

      if(config.framework.baseUrl === undefined)
        throw "Please define: config.framework.baseUrl";

      var newName = config.framework.baseUrl + name;

      if(!newName.match(/\.\w+$/))
        newName += ".js";

      //console.log("load framework name: " + newName);
      //req has the same API as require().
      req([newName], function (value) {
        //console.log("load framework value: " + name);
        load(value);
      });
    }
  });

  //auto set framework path based on script tag
  var framework = '', scripts = document.getElementsByTagName("script");
  for(var i = 0; i < scripts.length; ++i){
    var script = scripts[i], main = script.getAttribute('data-main'),
        m = script.src.match(/^(\w+):\/\/([^\/]+)\//);
    if(m &&main && main.match(/framework$/)) {
      var protocol = m[1], host = m[2];
      framework = protocol === 'file' || host === '127.0.0.1:8888' ?  '../../framework/' : 
                                         host === 'localhost:8888' ?  'http://localframework:8888/JavaScript/framework/' :
                                            'http://framework.jpillora.com/';
      break;
    }
  }

  require.config({

    framework: {
      baseUrl: framework + 'js/'
    },

    baseUrl: 'js/',
    map: {
      //shortcuts. not using paths to maintain relative addresses
      '*': {
        'jquery'            : 'fw!lib/jquery',
        'backbone'          : 'fw!lib/backbone',
        'underscore'        : 'fw!lib/lodash.min',
        'prettify'          : 'fw!lib/prettify/prettify'
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
       //'prettify': ['css!' + framework + 'js/lib/prettify/prettify']
    }
  });

  //Setup library customisations and Initialise the App
  require(['main','fw!css!lib/jquery'], function() {

  });

})();
