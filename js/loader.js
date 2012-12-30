var isLocal = !!window.location.host.match(/localhost/),
    script = document.createElement('script'); 

script.type = 'text/javascript';
script.src  = isLocal ? 'http://127.0.0.1:8888/framework/js/lib/require.js' :
                window.location.protocol === 'https:' ?
                  'https://raw.github.com/jpillora/js-framework/gh-pages/js/lib/require.min.js' :
                  'http://framework.jpillora.com/js/lib/require.min.js';  
script.setAttribute('data-main', 
              isLocal ? 'http://127.0.0.1:8888/framework/js/framework' :
                window.location.protocol === 'https:' ?
                  'https://raw.github.com/jpillora/js-framework/gh-pages/js/framework' :
                  'http://framework.jpillora.com/js/framework');
var s = document.getElementsByTagName('script')[0]; 
s.parentNode.insertBefore(script, s);