//Setup require framework paths
(function(){

  var framework = 
    window.location.protocol === 'file:' || window.location.host === '127.0.0.1:8888' ?  
      '../../framework/' : 'http://framework.jpillora.com/';

  require.config({
    baseUrl: 'js/',
    paths: {
      //Library classes
      'jquery'            : framework + 'js/lib/jquery',
      'jquery.cookie'     : framework + 'js/lib/jquery.cookie',
      'jquery.color'      : framework + 'js/lib/jquery.color',
      'underscore'        : framework + 'js/lib/lodash',
      'backbone'          : framework + 'js/lib/backbone',
      'bootstrap'         : framework + 'js/lib/bootstrap',
      'json2'             : framework + 'js/lib/json2',
      'prettify'          : framework + 'js/lib/prettify/prettify',
      'paper'             : framework + 'js/lib/paper',
      'raphael'           : framework + 'js/lib/raphael-min',
      'ace'               : framework + 'js/lib/ace/ace',
      //Require Plugins
      'text'              : framework + 'js/lib/require.text',
      'css'               : framework + 'js/lib/require.css',
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
      'prettify': ['css!' + framework + 'js/lib/prettify/prettify']
    }
  });

  //Setup library customisations and Initialise the App
  require(['main'], function() {});

})();
