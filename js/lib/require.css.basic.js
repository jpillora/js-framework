define({
  load: function (name, require, onLoad, config) {

    if (config.isBuild) {
      onLoad(null);
      return;
    }

    name += ".css";

    var path = name.match(/^\w+\b/);

    if(path && config.paths) {
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
