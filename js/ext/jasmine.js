define([
  'require',
  'module',
  'lib/jasmine',
  'lib/jasmine-html',
  'css!framework/css/jasmine'
  ], function(require,module) {

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  return jasmineEnv;
});