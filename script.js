var fileNames = [
  'EnglishOrdinalNumbers','EnglishPlants','EnglishAdjectives',
  'GermanMaleNames','GermanFemaleNames','GermanSurnamePrefixes','GermanSurnameSuffixes',
  'JapaneseMaleNames','JapaneseFemaleNames','JapaneseSurnamePrefixes','JapaneseSurnameSuffixes',
  'SpanishMaleNames','SpanishFemaleNames','SpanishSurnames'
];
var data = {};

var _language = 'English';
var _languages = {
  'English': new English(),
  'German': new German(),
  'Japanese': new Japanese(),
  'Spanish': new Spanish()
};

var _ordinal = 0;

function nextDatum(listName) {
  return data[listName][_ordinal++ % data[listName].length];
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

function toInitialCase(str)
{
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
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

function ipsum(options) {
  var articles = ["the","some","any","many","few"];
  var sentenceCount = options == null ? 1 : (options.count || 1);
  var sentences = [];
  for (var i = 0; i < sentenceCount; i++) {
    var article1 = articles[Math.floor(articles.length*Math.random())];
    var adjective1 = nextDatum("EnglishAdjectives");
    var noun1 = nextDatum("EnglishPlants") + "s";
    var verb = "covered";
    var article2 = articles[Math.floor(articles.length*Math.random())];
    var adjective2 = nextDatum("EnglishAdjectives");
    var noun2 = nextDatum("EnglishPlants") + "s";
    var sentence = toInitialCase(article1+" "+adjective1+" "+noun1+" "+verb+" "+article2+" "+adjective2+" "+noun2+".")
    sentences.push(sentence);
  }
  return sentences.join(" ");
}

var _germanGenderOrdinal = 0;

function germanName() {
  var name = _germanGenderOrdinal++ % 2 == 0 ? nextDatum('GermanMaleNames') : nextDatum('GermanFemaleNames');
  var surname = nextDatum('GermanSurnamePrefixes') + nextDatum('GermanSurnameSuffixes');
  return name+" "+surname;
}

var _japaneseGenderOrdinal = 0;

function japaneseName() {
  var name = _japaneseGenderOrdinal++ % 2 == 0 ? nextDatum('JapaneseMaleNames') : nextDatum('JapaneseFemaleNames');
  var surname = nextDatum('JapaneseSurnamePrefixes') + nextDatum('JapaneseSurnameSuffixes');
  return surname+" "+name;
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

function languageFn(fnName) { 
  return function() {
    return _languages[_language][fnName]();
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
  ["Street Address",streetAddress],
  null,
  ["Ipsum 1 sentence",ipsum],
  ["Ipsum 3 sentences",ipsum,{count:3}],
  ["Ipsum 5 sentences",ipsum,{count:5}],
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
    "checked":_language == l,
    "onclick": function(info, tab) { _language = l; }});
}
