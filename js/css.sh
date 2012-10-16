cat framework/css/prettify.css framework/css/bootstrap-combined.min.css qa-widget/js/qa-widget.css > temp.css
csso temp.css temp.css
mv temp.css qa-widget/js/qa-widget.css