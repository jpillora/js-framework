define({
  load: function (name, require, onLoad, config) {

    if(config.framework.baseUrl === undefined)
      throw "Please define: config.framework.baseUrl";

    var newName = config.framework.baseUrl + name + ".js";

    console.log("load framework name: " + newName);

    require([newName], function (value) {
      console.log("load framework value: " + name);
      onLoad(value);
    });
  }
});
