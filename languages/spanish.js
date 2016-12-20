var Spanish = function(dd) {

  var _data = new DummyDataEngine(dd,'Languages','Spanish','json');

  var _this = this;

  var nameSuffix = new Selector([[3,""],[1,"it"],[1,"in"],[1,"ill"]]);

  function appendSuffix(stem,suffix) {
    if (suffix == null || suffix == "") return stem;
    if (suffix.substr(0,1) == "i" || suffix.substr(0,1) == "e") {
      switch (stem.substr(-1)) {
        case "c": stem = stem.substr(0,stem.length-1)+"qu"; break;
        case "g": stem = stem+"u"; break;
      }
    }
    return stem+suffix;
  }

  var placeSelector = new Selector([
    function() { return _data('SpanishPlaces'); },
    function() { return "San "+maleName(); },
    function() { return "Santa "+femaleName(); }
  ]);

  var nameStemSelector = new Selector([
    function() { return _data('SpanishNameStems'); },
    function() { return _data('SpanishNamePrefixes')+_data('SpanishNameSuffixes'); }
  ]);

  function properNameStem() {
    return appendSuffix(nameStemSelector(),nameSuffix());
  }

  function ordinalNumberAsName() {
    return appendSuffix(_data('SpanishOrdinalNumbers'),nameSuffix());
  }

  var firstConsonant = rand(
    "","b","br","bl","c","ch","d","f","fl","fr","g","h","j","l",
    "m","n","p","pr","qu","r","s","t","v"
  );

  var firstVowel = rand("a","e","i","o","u","ue","ie");

  var secondConsonant = rand(
    "","b","br","bl","c","ch","d","f","fl","fr","g","h","j","l","m",
    "n","nc","nch","ng","p","pr","qu","r","s","t","v"
  );

  var secondVowel = rand("","el","i","or");

  function generatedNameStem() {
    var result = "".concat( firstConsonant(),firstVowel(),secondConsonant(),secondVowel() );
    return appendSuffix(result,nameSuffix());
  }

  var maleNameSelector = new Selector([
    [3, function() { return _data('SpanishMaleNames'); }],
    function() { return generatedNameStem()+"o"; },
    [3, function() { return properNameStem()+"o"; }],
    [1, function() { return ordinalNumberAsName()+"o"; }],
    [1, function() {
      var result = "".concat( firstConsonant(),firstVowel(),secondConsonant(),"el" );
      return result;
    }],
    [1, function() {
      var result = "".concat( firstConsonant(),firstVowel(),secondConsonant(),"iel" );
      return result;
    }]
  ]);

  function maleName() { return toInitialCase(maleNameSelector()); }

  var femaleNameSelector = new Selector([
    [3, function() { return _data('SpanishFemaleNames'); }],
    function() { return generatedNameStem()+"a"; },
    [3, function() { return properNameStem()+"a"; }],
    [1, function() { return ordinalNumberAsName()+"a"; }]
  ]);

  function femaleName() { return toInitialCase(femaleNameSelector()); }

  var surnameSuffix = new Selector(["o","a","os","as","es","ez"]);

  var surnameSelector = new Selector([
    [3, function() { return _data('SpanishSurnames'); }],
    [3, function() { return toInitialCase(appendSuffix(properNameStem(),surnameSuffix())); }],
    [1, function() { return toInitialCase(appendSuffix(ordinalNumberAsName(),surnameSuffix())); }],
    [2, placeSelector],
    [2, function() { return "de "+placeSelector(); }]
  ]);

  var surname = new Selector([
    [9,surnameSelector],
    function() { return surnameSelector()+" y "+surnameSelector()}
  ]);

  function maleFullName() { return maleName()+" "+surname(); };

  function femaleFullName() { return femaleName()+" "+surname(); };

  this.menuItems = [
    ["Male Name", maleName],
    ["Female Name", femaleName],
    ["Surname", surname],
    ["Male Full Name", maleFullName],
    ["Female Full Name", femaleFullName],
    null,
    ["Place", placeSelector]
  ];

};
