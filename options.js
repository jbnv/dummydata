console.log("BEGIN options setup");

$languages = $("#languages");
$countries = $("#countries");
$ordinal = $("#ordinal");

$languages.val(localStorage["language"] || "English");
$countries.val(localStorage["country"] || "UnitedStates");
$ordinal.val(localStorage["ordinal"] || 0);

$("#options-form").submit(function() {

  localStorage["language"] = $languages.val();
  localStorage["country"] = $countries.val();

  var seed = $ordinal.val();
  var value = parseFloat(localStorage["ordinal"]);
  if (seed) value = parseFloat(seed);
  if (Number.isNaN(value)) value = seed || 0;
  localStorage["ordinal"] = value;

});

console.log("END options setup");
