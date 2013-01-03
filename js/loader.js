var isLocal = !!window.location.host.match(/(localhost|127\.0\.0\.1)/),
    script = document.createElement('script'); 

script.type = 'text/javascript';
script.src  = isLocal ? 'http://' + window.location.host + '/framework/js/lib/require.js' :
                window.location.protocol === 'https:' ?
                  'https://raw.github.com/jpillora/js-framework/gh-pages/js/lib/require.min.js' :
                  'http://framework.jpillora.com/js/lib/require.min.js';  
script.setAttribute('data-main', 
              isLocal ? 'http://' + window.location.host + '/framework/js/framework' :
                window.location.protocol === 'https:' ?
                  'https://raw.github.com/jpillora/js-framework/gh-pages/js/framework' :
                  'http://framework.jpillora.com/js/framework');
var s = document.getElementsByTagName('script')[0]; 
s.parentNode.insertBefore(script, s);