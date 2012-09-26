define(['jquery'], function() {

  return {
    idle:function(element, event, millis, fn) {
      var t;
      element.on(event, function(e) {
        if(t) clearTimeout(t);
        t = setTimeout(fn, 1000);
      });
    }
  };

});