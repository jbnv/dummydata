console.log("core.js BEGIN");

var _data = new DummyData();

var _languages = {
  'English': new English(),
  'German': new German(),
  'Greek': new Greek(),
  'Japanese': new Japanese(),
  'Spanish': new Spanish()
};


function languageFn(fnName,options) {
  return function() {
    if (_languages[_language] == null) {
      alert("Language '"+_language+"' not defined.");
      return "";
    }
    if (_languages[_language][fnName] == null) {
      alert("Function '"+fnName+"' not defined for language '"+_language+"'.");
      return "";
    }
    return _languages[_language][fnName](options);
  }
}

console.log("core.js END");
