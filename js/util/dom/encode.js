define(["jquery"], function() {
  return function(value) {
    return $('<div/>').text(value).html();
  };
});