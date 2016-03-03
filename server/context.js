// Context for Chrome extension.
// See https://github.com/jbnv/dummydata/wiki/Options.

var localContext = {};

var _context = function(name) {
  return function(p1) {
    if (p1) localContext[name] = p1;
    return localContext[name];
  }
}
