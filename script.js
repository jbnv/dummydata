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
  ["Ipsum 1 sentence",languageFn('ipsum')],
  ["Ipsum 3 sentences",languageFn('ipsum',{count:3})],
  ["Ipsum 5 sentences",languageFn('ipsum',{count:5})],
  null,
  ["Color", languageFn('color')],
  ["Street Address",languageFn('streetAddress')],
  null,
  ["Number",number],
  ["0##-####",phoneNumber({format:"0##-####"})],
  ["###-0##-####",phoneNumber({format:"###-0##-####"})],
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

//chrome.contextMenus.create({"type":"separator","contexts":["editable"]});
//chrome.contextMenus.create({"title": "Options...", "onclick": options});
