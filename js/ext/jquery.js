define(['jquery'], function() {

  //extra jquery methods
  $.fn.flash = function(color) {
    var tmp = $(this).css('background-color');
    return $(this)
      .animate({'background-color':color}, '100')
      .animate({'background-color':tmp}, '50');
  };

  $.fn.filterByName = function(name) {
    return this.filter(function(i,e) {
      return $(e).nameContains(name); 
    });
  };

  $.fn.nameContains = function(name) {
    return this.attr("name") && this.attr("name").match("[^\\w]"+name+"[^\\w]"); 
  };

  $.fn.equals = function(that) {
    if($(this).length !== that.length)
      return false;
    for(var i=0,l=$(this).length;i<l;++i)
      if($(this)[i] !== that[i])
        return false;
    return true;
  };

  $.fn.visible = function(bool){
    var hidden = $(this).parents(":hidden").length > 0;
    return $(this)[hidden && bool ? 'show'      : hidden  && !bool ? 'hide' :
                  !hidden && bool ? 'slideDown' : !hidden && !bool ? 'slideUp' : 'noop'](); 
  };

  $.titlise = function(str) {
    var splitChar = str.indexOf(' ') > 0 ? ' ' :
                    str.indexOf('-') > 0 ? '-' : '_';
    var parts = str.split(splitChar);
    for(var p = 0; p < parts.length; ++p)
      parts[p] = parts[p].charAt(0).toUpperCase() + parts[p].substr(1).toLowerCase();
    return parts.join(' ');
  };

  $.scrollTo = function(y) {
    $('html, body').animate({
      scrollTop: y
    }, 100);
  };

  $.fn.scrollTo = function() {
    if(this && this.length > 0)
      $.scrollTo(this.is(':hidden') ? 0 : this.offset().top-100);
    return $(this);
  };

  $.fn.disabled = function(bool) {
    return $(this).attr('disabled', bool ? 'disabled' : null);
  };

  $.fn.rotate = function(deg) {

    var key = $.browser.webkit  ? 'WebkitTransform' :
              $.browser.mozilla ? '-moz-transform'  : null;

    if(key) $(this).css(key, deg ? ('rotate(' + deg + 'deg)') : '' );
  };

  (function(){

    var step = 10, angle = 10;

    $.fn.wiggle = function(duration) {

      if(!duration) duration = 300;

      var elem = $(this),
          total = 0,
          rotation = 0,
          dir = 1,
          ticker = setInterval(tick, step);

      function tick() {

        if(total >= duration) {
          elem.rotate(0);
          clearInterval(ticker);
          return;
        }

        elem.rotate(rotation);

        rotation += (dir * (angle/5));

        if(rotation >= angle)
          dir = -1;
        else if(rotation <= (angle*-1))
          dir = 1;

        total += step;
      }
    };

  }());

  return $;

});