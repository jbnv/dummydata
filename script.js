var fileNames = ['EnglishOrdinalNumbers'];
var data = {};

var ordinal = 0;

function nextDatum(listName) {
  return data[listName][ordinal++ % data[listName].length];
}

function downloadTextFileToArray(fileName) {
  var client = new XMLHttpRequest();
  client.open('GET', 'https://raw.githubusercontent.com/jbnv/WordLists/master/'+fileName+'.txt');
  client.onreadystatechange = function() {
    var text = client.responseText;
    data[fileName] = text.split("\n");
    shuffle(data[fileName])
  }
  client.send();
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

fileNames.forEach(downloadTextFileToArray);

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function number(){
  return Math.floor(Math.pow(10,Math.random()*10));
}

function streetAddress(){
  var number = Math.floor(Math.pow(Math.random()*4,10));
  var types = ["Street","Road","Drive","Lane"];
  var address = "" + number + " " + nextDatum('EnglishOrdinalNumbers') + " " + types[Math.floor(types.length*Math.random())]
  return toTitleCase(address);
}

function insert(generatorFn,options) {
  return function(info, tab) {
    var value = generatorFn(options);
    var script = 'var form = document.activeElement;form.value = (form.value + "' + value + '");';
    chrome.tabs.executeScript({code : script});
  }
}

var a = chrome.contextMenus.create({"title": "Number", "contexts":["editable"], "onclick": insert(number)});
var b = chrome.contextMenus.create({"title": "Street Address", "contexts":["editable"], "onclick": insert(streetAddress)});
