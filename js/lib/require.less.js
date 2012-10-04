define(['css', 'require'], function(css, require) {

  var plugin = {};

  plugin.pluginBuilder = './require.less-builder';

  //copy api methods from the css plugin
  plugin.normalize = css.normalize;

  plugin.load = function(lessId, req, load, config) {
    var skipLoad = false;
    if (lessId.substr(lessId.length - 1, 1) == '!') {
      lessId = lessId.substr(0, lessId.length - 1);
      skipLoad = true;
    }

    if (lessId.substr(lessId.length - 5, 5) != '.less') lessId += '.less';

    //separately load the parser to avoid building it in
    if (plugin.parse == undefined && !css.defined[lessId]) {
      require(['./less'], function() {
        var parser = new less.Parser();
        plugin.parse = function(less) {
          var css;
          parser.parse(less, function(err, tree) {
            if (err) {
              throw "LESS Compliler Error: " + err.type + 
                            " (Line: " + err.line + ", " +
                            "Column: " + err.column + ")\n" +
                            "Extact: \n" + err.extract.join('\n') + "\n\n" +
                            "File: " + lessId;
            }
            css = tree.toCSS();
          });
          //instant callback luckily
          return css;
        }
        plugin.load(lessId, req, load, config);
      });
      return false;
    }

    css.load(lessId, req, skipLoad ?
    function() {} : load, config, plugin.parse);

    if (skipLoad) load();
  }

  return plugin;
});