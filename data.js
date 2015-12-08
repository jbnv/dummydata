var _data = {};

var _ordinal = 0;

function _singular() { return false; }
function _plural() { return true; }
function _singularOrPlural(fractionPlural) { return Math.random() < fractionPlural; }

// options.transform: function(t) that produces an array based on t per the part-of-speech pattern.
function downloadTextFile(listName,options) {
  var client = new XMLHttpRequest();
  client.open('GET', 'https://raw.githubusercontent.com/jbnv/WordLists/master/'+listName+'.txt');
  client.onreadystatechange = function() {
    _data[listName] = [];
    client.responseText.split("\n").forEach(function(line) {
      if (line.length == 0) return; // filter out blank lines
      var split = line.split("|");
      if (options != null && options.transform != null) {
        split = options.transform(split);
        if (split == null) {
          console.log(listName,"transform function produces null split!");
          return;
        }
      }
      _data[listName].push(split);
    });
    shuffle(_data[listName])
  }
  client.send();
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

  if (options.partOfSpech == 'noun') {
    return itemArray[options.plural ? 1 : 0];
  }
  if (options.partOfSpech == 'verb') {
    if (options.case == null) return itemArray[0];
    switch (options.case) {
      case 'present-singular': return itemArray[1] || itemArray[0];
      case 'present-plural': return itemArray[2] || itemArray[0];
      case 'past': return itemArray[3];
      case 'participle': return itemArray[4];
    }
  }

  return itemArray[0]; // catch-all
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
