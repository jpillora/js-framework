// http://stackoverflow.com/questions/5889901/requirejs-and-less
define({
  version: '0.1',
  load: function(name, req, onLoad, config) {
    req(['text!' + name + '.less', 'lib/less'], function(lessText) {
      var styleElem;
      var parser = new(less.Parser)({
        filename: name,
        paths: [name.split('/').slice(0,-1).join('/') + '/'],
      });
      parser.parse(lessText, function (err, css) {
        if (err) {
          if (typeof console !== 'undefined' && console.error) {
            console.error(err);
          }
        } else {
          styleElem = document.createElement('style');
          styleElem.type = 'text/css';

          if (styleElem.styleSheet)
            styleElem.styleSheet.cssText = css.toCSS();
          else
            styleElem.appendChild( document.createTextNode( css.toCSS() ) );

          document.getElementsByTagName("head")[0].appendChild( styleElem );
        }
        onLoad(styleElem);
      });
    });
  }
});