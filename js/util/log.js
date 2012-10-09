define([], function() {

  return function() {
    if(window.console !== undefined)
      console.log(arguments);
  }
  
});