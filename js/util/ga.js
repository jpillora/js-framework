define(['https://ssl.google-analytics.com/ga.js'], function() {
  
  var hasSetup = false;
  function setup() {
    if(hasSetup) return true;
    if(window._gaq === undefined) return false;
    _gaq.push(['_setAccount', 'UA-34352911-1']);
    _gaq.push(['_trackPageview']);
    hasSetup = true;
  }

  function event(category, action, label, value) {
    if(!setup()) return false;
    var e = ['_trackEvent', category, action];
    if(label) e.push(label);
    if(value) e.push(value);
    _gaq.push(e);
  }

  setup();

  return {
    event: event
  }
  
});