define(['backbone','util/is'], function(Backbone,is) {

  //throw away logs on older browsers
  if(window.console === undefined)
      window.console = { log: $.noop, group: $.noop };
  

  var getName = function(obj) {
    return obj.name + ": " + (obj.model && obj.model.id ? (obj.model.id + ": ") : 
                                           obj.cid ? (obj.cid + ": ") : '');
  }

  var logFn = function(str, groupBoolean) {

    if(str)
      str = getName(this) + str;

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

    setupHidables: function() {

      var view = this, hideWhens = this.$('[data-show-when]');

      hideWhens.each(function() {
        var elem = $(this),
            selector = elem.attr('data-show-when'),
            method = elem.attr('data-method') || 'val',
            target = view.$(selector);

        if(target.length == 0) return;

        if(target.is('input,textarea'))
        target.keyup(function() {
          elem.visible(!!target[method]());
        }).trigger('keyup');

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
      var data = this.model === undefined ? {} : 
                 this.model instanceof Backbone.Model ? this.model.toJSON() : 
                 this.model;
      try {
        this.$el.html(this.template(data));
      } catch(e) {
        this.log("Template Error with data: " + JSON.stringify(data));
        throw e;
      }
    },

    parentModel: function(attribute) {
      if(!this.attributes || !this.attributes.parent)
        return null;
      return this.attributes.parent.model;
    },

    parentGet: function(attribute) {
      var model = this.parentModel(attribute);
      if (!model)
        return null;
      return model.get(attribute);
    },

    setupCollection: function(attribute, Collection) {

      var view = this;
      var model = this.parentModel(attribute);

      if(!model)
        throw "no parent model";

      if(!this.model)
        this.model = model;

      var collection = new Collection();

      model.set(attribute+'_collection', collection);

      //bind collection events
      if(is.fn(this.addAll))
        collection.on('reset', this.addAll, this);

      if(is.fn(this.addOne))
        collection.on('add', this.addOne, this);

      //bind parent model events
      model.on('change:'+attribute, function(model, obj) {

        view.log('update: ' + attribute + " !");

        var newItems;
        if(is.array(obj)) {
          newItems = obj;
        } else if(is.object(obj) && obj.items) {
          newItems = obj.items;
        } else {
          return view.log("cannot find items");
        }

        if(!is.array(newItems)) return view.log("items not an array");
        if(newItems.length === 0) return view.log("items are empty");
          //throw 'cannot add non-array: ' + attribute;
        collection.add(newItems, {merge:true});
      });

      //add when ready
      view.on('rendered', function() {
        var items = model.get(attribute);
        if(items && items.length)
          model.set(attribute, {items:items});
      });

      return collection;

    }

  });

  return Backbone;
});