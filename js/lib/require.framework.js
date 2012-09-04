
define({
  load: function (name, req, load, config) {

    if(config.framework.baseUrl === undefined)
      throw "Please define: config.framework.baseUrl";

    var newName = config.framework.baseUrl + name + ".js";

    console.log("load framework name: " + newName);
    //req has the same API as require().
    req([newName], function (value) {
      console.log("load framework value: " + name);
      load(value);
    });
  }
});
