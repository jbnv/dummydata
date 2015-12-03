function setActiveElementValue(value) {
  var script = 'var form = document.activeElement;form.value = (form.value + "' + value + '");';
    chrome.tabs.executeScript({code : script});
}

function insertNumber(info, tab){
  var number = Math.floor(Math.pow(Math.random()*10,10));
  setActiveElementValue(number);
}

function insertAddress(info, tab){
  var number = Math.floor(Math.pow(Math.random()*4,10));
  var names = ["First","Second","Third","Fourth","Fifth"];
  var types = ["Street","Road","Drive","Lane"];
  var address = "" + number + " " + names[Math.floor(names.length*Math.random())] + " " + types[Math.floor(types.length*Math.random())]
  setActiveElementValue(address);
}

var a = chrome.contextMenus.create({"title": "Number", "contexts":["editable"], "onclick": insertNumber});
var b = chrome.contextMenus.create({"title": "Street Address", "contexts":["editable"], "onclick": insertAddress});
