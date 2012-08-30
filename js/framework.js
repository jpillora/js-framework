//Setup require framework paths
(function(){

  require.config({
    baseUrl: 'js/',
    paths: {
      //Library classes
      'jquery'        : '../framework/js/lib/jquery',
      'jquery.cookie' : '../framework/js/lib/jquery.cookie',
      'jquery.color'  : '../framework/js/lib/jquery.color',
      'underscore'    : '../framework/js/lib/lodash',
      'backbone'      : '../framework/js/lib/backbone',
      'bootstrap'     : '../framework/js/lib/bootstrap',
      'text'          : '../framework/js/lib/require.text',
      'json2'         : '../framework/js/lib/json2',
      //Extensions
      'jquery-ext'    : '../framework/js/ext/jquery-extensions',
      'backbone-ext'  : '../framework/js/ext/backbone-extensions',
      //Utility classes
      'ga'            : '../framework/js/util/ga',
      'store'         : '../framework/js/util/store'
    },
    shim: {
      'backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      'bootstrap': ['jquery'],
      'jquery.cookie': ['jquery'],
      'jquery.color': ['jquery']
    }
  });

  //Setup library customisations and Initialise the Widget
  require(['main']);

})();
