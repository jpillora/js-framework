define({
  load: function (name, require, onLoad, config) {

    var newName = name + ".css";

    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = newName;

    document.getElementsByTagName('head')[0].appendChild(link);

    onLoad(newName);
    /*
    if(onLoad !==undefined) {
      var img = document.createElement('img');
      img.onerror = function(){
        console.log("load framework value: " + newName);
        onLoad(newName);
      }
      img.src = newName;
    }
    */
  }
});
