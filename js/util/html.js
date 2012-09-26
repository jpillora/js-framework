define(['jquery'], function() {
  return {
    encode: function(value){
      return $('<div/>').text(value).html();
    },
    decode: function(value){
      return $('<div/>').html(value).text();
    }
  }

})