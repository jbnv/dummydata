$(function() {

  console.log("BEGIN options setup");

  $languages = $("#languages");

  $("#languages option").remove();

  $languages.change(function() {
    var languageName = $(this).val();
    //console.log("_language <= ",languageName);
    _language = languageName;
    localStorage["language"] = languageName;
  });

  for (var l in _languages) {
    $languages.append("<option>"+l+"</option>");
  }

  console.log("END options setup");

});
