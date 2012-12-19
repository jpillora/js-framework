define(["util/dom/create","util/dom/encode","bootstrap","jquery"], function(create,encode) {
  "use strict";

  var attention = create("strong"),
      text = create("span"),
      content = create("div").append(attention).append(text),
      container = create("div").append(content).hide(),
      queue = [],
      ready = false;

  //css
  container.css({
    position: 'fixed',
    top: 0,
    left: 0,
    'z-index': 2000,
    width: '100%',
    opacity: 0.95
  });

  content.css({
    position: 'relative',
    margin: 20,
    'z-index': 5,
    cursor: 'pointer'
  });

  $(document).ready(function() {
    ready = true;
    $(document).on("click", ".alert", hide);
    $("body").prepend(container);
  });

  //add to alerts queue
  function add() {
    queue.push(arguments);
    if(queue.length === 1) show();
  }

  //show the current alert
  function show() {
    if(queue.length === 0) return;
    var args = queue[0];
    //inner helper
    (function(type, msg, duration) {
      content.attr('class','alert');
      if(type) content.addClass('alert-'+type);

      if($.isArray(msg)) {
        attention.html(encode(msg[0])+ ' ');
        text.html(encode(msg[1]));
      } else
        text.html(encode(msg));

      container.fadeIn();

      if(duration === undefined)
        duration = 5000;
      
      setTimeout(hide,duration);
    }).apply(window, args);
  }

  //hide the current alert, trigger next
  function hide() {
    container.fadeOut(function() {
      queue.shift();
      if(queue.length > 0) show();
    });
  }

  var alert = function(msg, duration) {
    add(null, msg, duration);
  };

  $.extend(alert, {
    error: function(msg,duration) {
      add('error', msg, duration);
    },
    warn: function(msg, duration) {
      add('warning', msg, duration);
    },
    success: function(msg, duration) {
      add('success', msg, duration);
    },
    info: function(msg, duration) {
      add('info', msg, duration);
    }
  });

  window.jalert = alert;

  return alert;

});