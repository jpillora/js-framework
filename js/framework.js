//Setup require framework paths
(function(){

  var framework = 
    window.location.protocol === 'file:' || window.location.host === '127.0.0.1:8888' ?  
      '../../framework/' : 'http://framework.jpillora.com/';

  require.config({

    framework: {
      baseUrl: 'http://framework.jpillora.com/js/'
    },

    baseUrl: 'js/',
    paths: {
      //Library classes
      'jquery'            : framework + 'js/lib/jquery',
      'jquery.cookie'     : framework + 'js/lib/jquery.cookie',
      'jquery.color'      : framework + 'js/lib/jquery.color',
      'underscore'        : framework + 'js/lib/lodash',
      'backbone'          : framework + 'js/lib/backbone',
      'bootstrap'         : framework + 'js/lib/bootstrap',
      'fw'                : framework + 'js/lib/require.framework',
      'text'              : framework + 'js/lib/require.text',
      'css'               : framework + 'js/lib/require.css',
      'css.api'           : framework + 'js/lib/require.css.api',
      'json2'             : framework + 'js/lib/json2',
      'prettify'          : framework + 'js/lib/prettify/prettify',
      //Custom Extensions
      'jquery-ext'        : framework + 'js/ext/jquery-extensions',
      'backbone-ext'      : framework + 'js/ext/backbone-extensions',
      //Utility classes
      'ga'                : framework + 'js/util/ga',
      'log'               : framework + 'js/util/logger',
      'store'             : framework + 'js/util/store'
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
  require(['main','fw!lib/jquery'], function() {

  });

})();
