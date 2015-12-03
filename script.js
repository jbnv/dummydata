// A generic onclick callback function.
function genericOnClick(info, tab) {
  alert(
    "item " + info.menuItemId + " was clicked\n" +
    "info: " + JSON.stringify(info) + "\n" +
    "tab: " + JSON.stringify(tab));
}

function insertNumber(info, tab){
  var number = Math.floor(Math.pow(Math.random()*10,10));
  alert(
    number+"\n" +
    "info: " + JSON.stringify(info) + "\n" +
    "tab: " + JSON.stringify(tab
  ));
}

function insertAddress(info, tab){
  var number = Math.floor(Math.pow(Math.random()*4,10));
  var names = ["First","Second","Third","Fourth","Fifth"];
  var types = ["Street","Road","Drive","Lane"];
  var address = "" + number + " " + names[Math.floor(names.length*Math.random())] + " " + types[Math.floor(types.length*Math.random())]
  alert(
    address+"\n" +
    "info: " + JSON.stringify(info) + "\n" +
    "tab: " + JSON.stringify(tab
  ));
}

var a = chrome.contextMenus.create({"title": "Number", "contexts":["editable"], "onclick": insertNumber});
var b = chrome.contextMenus.create({"title": "Street Address", "contexts":["editable"], "onclick": insertAddress});
