//boolean helpers
define(function() {

  var types = ['Array','Function','Object','String','Number'],
      typesLength = types.length,
      functions = {};

  while (typesLength--) {
    var typeName = types[typesLength];

    var fnName = (typeName === 'Function') ? 'fn' : typeName.toLowerCase();

    functions[fnName] = (function(t){
      return function(o) {
        return !!o && ( Object.prototype.toString.call(o) === '[object ' + t + ']' );
      }
    })(typeName);
  }

  return functions;
})