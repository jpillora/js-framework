define(['backbone'], function(Backbone) {

  //throw away logs on older browsers
  if(window.console === undefined)
      window.console = { log: function(str){} }
  
  var logFn = function(str) { 
    console.log(
      (this.name||this.cid) + ": " + 
      (this.model&&this.model.id?(this.model.id+": "):"") + 
      str); 
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

    executeTemplate: function() {
      if(!this.model) return log("cannot exec. template. no model.");
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

  return Backbone;
});