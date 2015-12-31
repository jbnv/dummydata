function insertTextIntoCurrentElement(generatorFn,options) {
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

function createSeparator() { chrome.contextMenus.create({"type":"separator","contexts":["editable"]}); }

function createContextMenuItem(item) {
  if (item == null) {
    createSeparator();
    return;
  }
  // assumes item == [title, function, options]
  var title = item[0];
  var fn = item[1];
  var options = item.length >= 2 ? item[2] : null;
  chrome.contextMenus.create({"title": title, "contexts":["editable"], "onclick": insertTextIntoCurrentElement(fn,options)});
}

function rebuildMenu() {

  chrome.contextMenus.removeAll();

  var menu = _data.resetMenu();
  // menu should be an array, all elements of which should be [title,function] or null.

  menu.forEach(createContextMenuItem);

  return menu;

}

rebuildMenu();
