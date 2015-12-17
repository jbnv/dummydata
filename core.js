console.log("core.js BEGIN");

var _language = localStorage["language"] || 'English';
var _languages = {
  'English': new English(),
  'German': new German(),
  'Greek': new Greek(),
  'Japanese': new Japanese(),
  'Spanish': new Spanish()
};

function number(){
  return Math.floor(Math.pow(10,Math.random()*10));
}

function today() {
  return moment().format("YYYY-MM-DD");
}

// earlierDate: Pick a date up to three years before today's date.
function earlierDate() {
  return moment().subtract(Math.pow(365.25*3,Math.random()),'days').format("YYYY-MM-DD");
}

// laterDate: Pick a date up to three years after today's date.
function laterDate() {
  return moment().add(Math.pow(365.25*3,Math.random()),'days').format("YYYY-MM-DD");
}

function phoneNumber(options) {
  return function() {
    if (options == null) options = {};
    if (!options.format) options.format = "0##-####";
    var result = "";
    for (var i = 0; i < options.format.length; i++) {
      if (options.format[i] == '#') {
        result += Math.floor(Math.random()*10);
      } else {
        result += options.format[i];
      }
    }
    return result;
  };
}

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
