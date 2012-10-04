({
  //change these two...
  baseUrl: "../../qa-widget/js/",
  out:     "../../qa-widget/js/qa-widget.js",

  //entry
  name: '../../framework/js/framework',

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
      'bootstrap'     : 'lib/bootstrap.min',
      'underscore'    : 'lib/lodash.min',
      'css'           : 'lib/require.css',
      'cs'            : 'lib/require.cs',
      'less'          : 'lib/require.less',
      'text'          : 'lib/require.text'
    }
  },

  //non-modularised libraries with deps
  shim: {
    'lib/backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'lib/bootstrap.min': ['css!framework/css/bootstrap-combined.min!', 'jquery'],
    'lib/prettify': ['css!framework/css/prettify'],
    //jquery plugins
    'lib/jquery.cookie': ['jquery'],
    'lib/jquery.color': ['jquery'],
    'lib/jquery.autogrow': ['jquery'],
    'lib/jquery.timeago': ['jquery']
  }
})