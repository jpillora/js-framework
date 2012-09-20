define(['jquery'], function() {

  //extra jquery methods
  $.fn.flash = function(color) {
    var tmp = $(this).css('background-color');
    $(this)
      .animate({'background-color':color}, '100')
      .animate({'background-color':tmp}, '50');
  };

  $.fn.filterByName = function(name) {
    return this.filter(function(i,e) {
      return $(e).nameContains(name); 
    });
  }

  $.fn.nameContains = function(name) {
    return this.attr("name") && this.attr("name").match("[^\\w]"+name+"[^\\w]"); 
  }

  $.fn.equals = function(that) {
    if($(this).length !== that.length)
      return false;
    for(var i=0,l=$(this).length;i<l;++i)
      if($(this)[i] !== that[i])
        return false;
    return true;
  }

  $.titlise = function(str) {
    var splitChar = str.indexOf(' ') > 0 ? ' ' : '_';
    var parts = str.split(splitChar);
    for(var p = 0; p < parts.length; ++p)
      parts[p] = parts[p].charAt(0).toUpperCase() + parts[p].substr(1).toLowerCase();
    return parts.join(' ');
  }

  $.scrollTo = function(y) {
    $('html, body').animate({
      scrollTop: y
    }, 100);
  }

  $.fn.scrollTo = function() {
    if(this && this.length > 0)
      $.scrollTo(this.is(':hidden') ? 0 : this.offset().top-100);
  }

  return $;

});