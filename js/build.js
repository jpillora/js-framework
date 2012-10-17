({

  baseUrl: '../../qa-widget/js/',
  out:     "qa-widget.js",
  //entry
  name: '../../framework/js/framework',
  // name: 'lib/require/almond',
  // include: ['../../framework/js/framework'],
  // insertRequire: ['../../framework/js/framework'],

  separateCSS: false,
  preserveLicenseComments: false,
  wrap: true,
  optimize: 'uglify',
  
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
      'backbone'      : 'ext/backbone',
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
  }
})