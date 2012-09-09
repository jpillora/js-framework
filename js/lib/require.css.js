define({
  load: function (name, require, onLoad, config) {

    var extension = name.match(/\.(\w+)$/);

    if(extension && extension[1] !== 'css')
      throw "Cannot load non-css files: "+ name;

    if(!extension)
      name += ".css";

    var path = name.match(/^\w+/);

    if(!path)
      throw "Invalid path";

    if(config.paths) {
      var p = config.paths[path];
      if(p) name = name.replace(/^\w+/,p);
    }

    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = name;

    document.getElementsByTagName('head')[0].appendChild(link);

    onLoad(name);
  }
});
