define(['https://ssl.google-analytics.com/ga.js'], function() {

  if(window._gaq === undefined) return null;
  if(window._gaInit === undefined) {
    window._gaInit = true;
    console.log('init google analytics')
    _gaq.push(['_setAccount', 'UA-34352911-1']);
    _gaq.push(['_trackPageview']);
  }

  function trackEvent(category, action, label, value) {
    var event = ['_trackEvent', category, action];
    if(label) event.push(label);
    if(value) event.push(value);
    _gaq.push(event);
  }

  return {
    _gaq: _gaq,
    event: trackEvent
  }
  
});