function populateDemo() {

  var menu = _data.resetMenu();
  // menu should be an array, all elements of which should be [title,function] or null.

  var tableElem = $("<table class=\"table\"></table>");
  $(tableElem).append($("<tr><th>Menu Item</th><th>Sample Result</th></tr>"));
  menu.forEach(function(item) {
    if (item) {
      var tr = $("<tr></tr>");
      $(tr).append("<td><b>"+item[0]+"</b></td>");
      $(tr).append("<td>"+item[1]()+"</td>");
      $(tableElem).append(tr);
    }
  });

  $("#demo-container").html(tableElem);
}

function onFormSubmit() {

  localStorage["language"] = $languages.val();
  localStorage["country"] = $countries.val();

  var seed = $ordinal.val();
  var value = parseFloat(localStorage["ordinal"]);
  if (seed) value = parseFloat(seed);
  if (Number.isNaN(value)) value = seed || 0;
  localStorage["ordinal"] = value;

  populateDemo();

}

$(function() {

  console.log("BEGIN options setup");

  $languages = $("#languages");
  $countries = $("#countries");
  $ordinal = $("#ordinal");

  $languages.val(localStorage["language"] || "English");
  $countries.val(localStorage["country"] || "UnitedStates");
  $ordinal.val(localStorage["ordinal"] || 0);

  $("#options-form").submit(onFormSubmit);

  populateDemo();

  console.log("END options setup");

});
