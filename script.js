var _language = 'English';
var _languages = {
  'English': new English(),
  'German': new German(),
  'Japanese': new Japanese(),
  'Spanish': new Spanish()
};

function number(){
  return Math.floor(Math.pow(10,Math.random()*10));
}

function streetAddress(){
  var number = Math.floor(Math.pow(Math.random()*4,10));
  var types = ["Street","Road","Drive","Lane"];
  var address = "" + number + " " + nextDatum('EnglishOrdinalNumbers') + " " + types[Math.floor(types.length*Math.random())]
  return toTitleCase(address);
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


function insert(generatorFn,options) {
  return function(info, tab) {
    if (generatorFn == null) {
      alert ("Generator function is not defined.");
      return;
    }
    var value = generatorFn(options);
    var script = 'var form = document.activeElement;form.value = (form.value + "' + value + '");';
    chrome.tabs.executeScript({code : script});
  }
}

var menuItems = [
  ["Male Name", languageFn('maleName')],
  ["Female Name", languageFn('femaleName')],
  ["Surname", languageFn('surname')],
  ["Male Full Name", languageFn('maleFullName')],
  ["Female Full Name", languageFn('femaleFullName')],
  null,
  ["Number",number],
  ["Street Address",languageFn('streetAddress')],
  ["0##-####",phoneNumber({format:"0##-####"})],
  ["###-0##-####",phoneNumber({format:"###-0##-####"})],
  null,
  ["Ipsum 1 sentence",languageFn('ipsum')],
  ["Ipsum 3 sentences",languageFn('ipsum',{count:3})],
  ["Ipsum 5 sentences",languageFn('ipsum',{count:5})],
  null,
  ["Today",today],
  ["Earlier Date",earlierDate],
  ["Later Date",laterDate],
];

menuItems.forEach(function(item) {
  if (item == null) {
    chrome.contextMenus.create({"type":"separator","contexts":["editable"]});
    return;
  }
  // assumes item == [title, function, options]
  var title = item[0];
  var fn = item[1];
  var options = item.length >= 2 ? item[2] : null;
  chrome.contextMenus.create({"title": title, "contexts":["editable"], "onclick": insert(fn,options)});
})

chrome.contextMenus.create({"type":"separator","contexts":["editable"]});

for (var l in _languages) {
  chrome.contextMenus.create({
    "title": l, "contexts":["editable"],
    "type":"radio",
    "checked": _language == l,
    "onclick": function(languageName) {
      return function(info, tab) {
        console.log("_language <= ",languageName);
        _language = languageName;
      };
    }(l)
  });
}
