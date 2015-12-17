var _data = {};

var _ordinal = 0;

function _singular() { return false; }
function _plural() { return true; }
function _singularOrPlural(fractionPlural) { return Math.random() < fractionPlural; }

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

function _downloadFile(url) {
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

// options.transform: function(t) that produces an array based on t per the part-of-speech pattern.
function downloadTextFile(listName,options) {
  var url = 'https://raw.githubusercontent.com/jbnv/WordLists/master/'+listName+'.txt';
  _downloadFile(url)
  .then(
    function(text) {
      _listToData(listName,text.split("\n"),options);
    },
    function(error) {
      console.error(error);
    }
  );
}

// Download an entire language definition that was minified into a JSON file.
// options.transform: function(t) that produces an array based on t per the part-of-speech pattern.
function downloadLanguageJSON(language,options) {
  var url = 'https://raw.githubusercontent.com/jbnv/WordLists/master/'+language+'.json';
  _downloadFile(url)
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
}

function nextDatum(listName,options) {

  var list = _data[listName];
  if (list == null) {
    console.log("List '"+listName+"' is unavailable.")
    return "";
  }

  var ordinal = _ordinal++ % list.length;
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

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function toInitialCase(str)
{
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}

Array.prototype.nextElement = function() {
  return this[_ordinal % this.length];
}

Array.prototype.randomElement = function() {
  return this[Math.floor(this.length*Math.random())];
}

Array.prototype.randomWeightedElement = function() {

  // Sum up the selector values.
  var weightSum = 0;
  for(var i = 0, len = this.length; i < len; i++) {
    weightSum += this[i][0];
  }

  // Pick a selector value at random.
  var selector = Math.floor(Math.random()*weightSum);

  var i = 0;
  for(var i = 0, len = this.length; i < len; i++) {
    selector -= this[i][0];
    if (selector < 0) { return this[i][1]; }
  }

  return "Array breach; selector = "+selector; // this should never happen
}
