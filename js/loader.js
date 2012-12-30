var isLocal = !!window.location.host.match(/localhost/),
    script = document.createElement('script'); 

script.type = 'text/javascript';
script.src  = isLocal ? 'http://127.0.0.1:8888/framework/js/lib/require.js' :
                        '//raw.github.com/jpillora/js-framework/gh-pages/js/lib/require.min.js';    
script.setAttribute('data-main', 
              isLocal ? 'http://127.0.0.1:8888/framework/js/framework' :
                        '//raw.github.com/jpillora/js-framework/gh-pages/js/framework');
var s = document.getElementsByTagName('script')[0]; 
s.parentNode.insertBefore(script, s);