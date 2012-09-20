define(['backbone'], function(Backbone) {

  //throw away logs on older browsers
  if(window.console === undefined)
      window.console = { log: $.noop, group: $.noop };
  
  var logFn = function(str, groupBoolean) {

    if(str)
    str = this.name + ": " + 
          (this.model&&this.model.id?this.model.id:this.cid) + ": " +
          str;

    if(groupBoolean === true)
      console.group(str);

    if(str && groupBoolean !== true)
      console.log(str);

    if(groupBoolean === false)
      console.groupEnd();
  };

  //extra model methods
  _.extend(Backbone.Model.prototype, {
    log: logFn
  });
  //extra collection methods
  _.extend(Backbone.Collection.prototype, {
    log: logFn
  });
  //extra view methods
  _.extend(Backbone.View.prototype, {

    log: logFn,
    renderUJS: function() {
      var view = this;
      view.setupAutosave(view.model);
    },
    //custom editable field initialiser
    setupAutosave: function(model) {
      function saveValue() {
        var n = $(this).attr('data-name');
        var v = $(this).data('val') || $(this).val();
        view.model.set(n,v);
        log("save " + n + "   " + v)
      }
      view.$("input[type=text][data-name]").on('save',saveValue);
      view.$("input[type=checkbox][data-name]").click(saveValue);
    },


    setupNestedViews: function(callback) {

      var thisView = this,
          containers = thisView.$("[data-view]"), 
          totalRequires = containers.length, 
          currRequire = 0;

      if(totalRequires == 0) return;

      //thisView.log('start setup views', true);

      containers.each(function(){
        var container = $(this);
        var nestedViewName = container.attr('data-view');

        //console.log(container);
        require(['view/'+nestedViewName], function(NestedView) {

          //instantiate
          var nestedView = new NestedView({
            el: container,
            attributes: { parent: thisView }
          })
          
          nestedView.render();

          thisView[nestedViewName] = nestedView;

          currRequire++;
          if(currRequire == totalRequires){
            //thisView.log('setup complete', false);
            if(callback !== undefined)
              callback.apply(thisView);
          }
        });

      });

    },

    setupTogglers: function() {

      var view = this, togglers = view.$('[data-toggle]');

      togglers.each(function() {
        var btn = $(this),
            selector = btn.attr('data-toggle'),
            elem = view.$(selector);

        if(elem.length == 0) return;

        btn.click(function() {
          var visible = elem.is(':visible');
          
          var text = btn.html();
          btn.html(text.replace(/hide|show/i, visible ? 'Show' : 'Hide'))

          if(visible)
            elem.slideUp();
          else
            elem.slideDown();
        });

      })

    },

    executeTemplate: function() {
      if(!this.template) return this.log("cannot exec. template. no template set.");
      var data = this.model === undefined ? {} : this.model.toJSON();
      this.$el.html(this.template(data));
    },

    parentGet: function(attribute) {
      if(this.attributes && this.attributes.parent) {
        var model = this.attributes.parent.model;
        if (model) return model.get(attribute);
      }
      return null;
    }


  });

  return Backbone;
});