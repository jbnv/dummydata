// Context for Chrome extension.
// See https://github.com/jbnv/dummydata/wiki/Options.

var _context = function(name) {
  return function(p1) {
    if (p1) localStorage[name] = p1;
    return localStorage[name];
  }
}
