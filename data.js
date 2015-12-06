var _data = {};

var _ordinal = 0;

function downloadTextFile(listName) {
  var client = new XMLHttpRequest();
  client.open('GET', 'https://raw.githubusercontent.com/jbnv/WordLists/master/'+listName+'.txt');
  client.onreadystatechange = function() {
    var text = client.responseText;
    _data[listName] = text.split("\n").filter(function(s) {return s.length > 0;});
    shuffle(_data[listName])
  }
  client.send();
}

function nextDatum(listName) {
  var list = _data[listName];
  if (list == null) {
    return "(UNAVAILABLE)";
  }
  return list[_ordinal++ % list.length];
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
