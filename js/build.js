({
  appDir: "../../qa-widget",
  baseUrl: "js/",
  dir: "../../qa-widget-built",
  modules: [
      {
          name: "framework/js/framework"
      }
  ],

  //framework paths
  paths: {
    'framework': '../../framework/',
    'lib'      : '../../framework/js/lib',
    'ext'      : '../../framework/js/ext',
    'util'     : '../../framework/js/util'
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
    'lib/prettify': ['css!framework/css/prettify']
  }
})