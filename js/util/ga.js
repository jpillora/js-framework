define(['https://ssl.google-analytics.com/ga.js'], function() {

  if(window._gaq === undefined) return null;

  _gaq.push(['_setAccount', 'UA-34352911-1']);
  _gaq.push(['_trackPageview']);

  function event(category, action, label, value) {
    var e = ['_trackEvent', category, action];
    if(label) e.push(label);
    if(value) e.push(value);
    _gaq.push(e);
  }

  return {
    _gaq: _gaq,
    event: event
  }
  
});