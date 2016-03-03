console.log('data.js BEGIN');

// Seed context.
if (_context) {
  if (!_context("language")()) _context("language")("English");
  if (!_context("country")()) _context("country")("UnitedStates");
}

function GlobalOrdinal(seed) {
  var value = parseFloat(_context("ordinal")());
  if (seed) value = parseFloat(seed);
  if (Number.isNaN(value)) value = seed || 0;
  _context("ordinal")(++value);
  return value;
}

function DummyData() {

  var _languages = {};
  var _countries = {};

  // p1: object defining the set of languages or name of language
  // p2: (if p1 == name of language) language object
  this.addLanguage = function(p1,p2) {
    if (p1 == null) return;
    if (typeof p1 === 'object') {
        _languages = p1;
        return;
    }
    _languages[p1] = p2;
  }

  // p1: object defining the set of languages or name of language
  // p2: (if p1 == name of language) language object
  this.addCountry = function(p1,p2) {
    if (p1 == null) return;
    if (typeof p1 === 'object') {
        _countries = p1;
        return;
    }
    _countries[p1] = p2;
  }

  this.languageName = function(newLanguage) {
    if (newLanguage) {
      _context("language")(newLanguage);
      this.resetMenu();
      return newLanguage;
    }
    return _context("language")();
  }

  this.countryName = function(newCountry) {
    if (newCountry) {
      _context("country")(newCountry);
      this.resetMenu();
      return newCountry;
    }
    return _context("country")();
  }

  this.language = function(name) {
    return _languages[name || this.languageName()];
  }

  this.country = function(name){
    return _countries[name || this.countryName()];
  }

  var universal = new Universal()

  var _this = this;

  this.resetMenu = function() {

    var menuSpec = [];

    engine = _this.language();
    if (engine) {
      Array.prototype.push.apply(menuSpec, engine.menuItems);
      menuSpec.push(null); // separator
    } else {
      console.log("_languages: No engine for "+_this.languageName()+".");
    }

    engine = _this.country();
    if (engine) {
      Array.prototype.push.apply(menuSpec, engine.menuItems);
      menuSpec.push(null); // separator
    } else {
      console.log("_countries: No engine for "+_this.countryName()+".");
    }

    Array.prototype.push.apply(menuSpec, universal.menuItems);

    return menuSpec;
  }
};

// dd: DummyData() result
// group: 'Languages'|'Countries'
// subgroup: string
// sourceType: 'txt'|'json'|array
function DummyDataEngine(dd,group,subgroup,sourceType,options) {

  var _data = {};

  var _repositoryURL = 'https://raw.githubusercontent.com/jbnv/WordLists/master/';
  var _directory = _repositoryURL+group+'/'+subgroup+'/';

  function engineOption(name) {
    if (!name) return null;
    if (options) return options[name];
    return null;
  }

  // Randomize array element order in-place. Durstenfeld shuffle algorithm.
  function shuffle(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }

  function _processLine(line,options) {
    if (line.length == 0) return; // filter out blank lines
    var split = line.split("|");
    if (options != null && options.transform != null) {
      split = options.transform(split);
      if (split == null) {
        console.log(listName,"transform function produces null split!");
        return;
      }
    }
    return split;
  }

  // return: promise
  function _downloadFile(filename) {
    var url = _directory+filename;
    console.log("_downloadFile",url);

    var request = new XMLHttpRequest();
    var deferred = Q.defer();

    request.open("GET", url, true);
    request.onload = onload;
    request.onerror = onerror;
    request.onprogress = onprogress;
    request.send();

    function onload() {
      if (request.status !== 200) {
        deferred.reject(new Error("Status code was " + request.status));
        return;
      }

      if (request.responseText == "") {
        deferred.reject(new Error("No data returned!"));
        return;
      }

      deferred.resolve(request.responseText);
    }

    function onerror() {
      deferred.reject(new Error("Can't XHR " + JSON.stringify(url)));
    }

    function onprogress(event) {
      deferred.notify(event.loaded / event.total);
    }

    return deferred.promise;
  }

  function _listToData(listName,list,options) {
    //console.log(listName+": Adding "+list.length+" lines.",options);
    _data[listName] = [];
    list.forEach(function(line) {
      var split = _processLine(line,options);
      _data[listName].push(split);
    });
    shuffle(_data[listName]);
  }

  if (sourceType == 'txt') {

    var lineFn = function(line) {
      if (!line) return null;
      var a = line.split("|");
      var listName = a[0];
      var fileOptions = a.length > 1 && engineOption(a[1]);

      return _downloadFile(listName+'.txt')
      .then(
        function(text) {
          _listToData(listName,text.split("\n"),fileOptions);
          return listName+'.txt';
        },
        function(error) {
          console.error(error);
        }
      );
    };

    downloadGroupList =
      _downloadFile(subgroup+'.txt')
      .then(
        function(text) {
          return text.split("\n").map(lineFn);
        },
        function(error) {
          console.error(error);
        }
      );

    Q.allSettled(downloadGroupList)
    .then(
      function (results) {
        console.log("Download results:",results);
      },
      function(error) {
        console.error(error);
      });

  } else if (sourceType == 'json') {

    // Download an entire language definition that was minified into a JSON file.
    _downloadFile(subgroup+'.json')
    .then(
      function(json) {
        var data = JSON.parse(json);
        for (var listName in data) {
          _listToData(listName,data[listName],options);
        }
      },
      function(error) {
        console.error(error);
      }
    );

  } else {

    //TODO process array

  }

  // options.transform: function(t) that produces an array based on t per the part-of-speech pattern.
  return function(listName,options) {

    var list = _data[listName];
    if (list == null) {
      console.log("List '"+listName+"' is unavailable.")
      return "";
    }

    var ordinal = GlobalOrdinal() % list.length;
    var itemArray = list[ordinal];
    if (itemArray == null) {
      console.log("Item "+ordinal+" of list '"+listName+"' is null.")
      return "";
    }
    if (itemArray.length == 0) {
      console.log("Item "+ordinal+" of list '"+listName+"' is an empty array.")
      return "";
    }

    if (options == null) return itemArray[0];

    var outbound = itemArray[0]; // catch-all

    if (options.partOfSpeech == 'noun') {
      outbound = itemArray[options.plural ? 1 : 0];
    }
    if (options.partOfSpeech == 'verb') {
      outbound = itemArray[0];
      switch (options.case) {
        case 'present-singular': outbound = itemArray[1] || itemArray[0]; break;
        case 'present-plural': outbound = itemArray[2] || itemArray[0]; break;
        case 'past': outbound = itemArray[3]; break;
        case 'participle': outbound = itemArray[4]; break;
      }
    }

    if (options.transform) {
      if (!options.transform.isArray) options.transform = [options.transform];
      options.transform.forEach(function(fn) {
        outbound = fn(outbound);
      });
    }
    return outbound;
  }

};

var _data = new DummyData();

function _singular() { return false; }
function _plural() { return true; }
function _singularOrPlural(fractionPlural) { return Math.random() < fractionPlural; }


function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function toInitialCase(str)
{
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}

Array.prototype.randomElement = function() {
  return this[Math.floor(this.length*Math.random())];
}

console.log('data.js END');
