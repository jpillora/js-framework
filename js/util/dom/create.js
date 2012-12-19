define(["jquery"], function() {
  return function(tagName) {
    return $(document.createElement(tagName));
  };
});