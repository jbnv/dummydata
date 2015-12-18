var Spanish = function() {

  downloadLanguageJSON('Spanish');

  var _this = this;

  function randomNameSuffix() { return [[3,""],[1,"it"],[1,"in"],[1,"ill"]].randomWeightedElement(); }

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

  function properNameStem() {
    var stem = nextDatum('SpanishNameStems',{transform:toInitialCase});
    var suffix = randomNameSuffix();
    return appendSuffix(stem,suffix);
  }

  function ordinalNumberAsName() {
    var stem = nextDatum('SpanishOrdinalNumbers',{transform:toInitialCase});
    var suffix = randomNameSuffix();
    return appendSuffix(stem,suffix);
  }

  var maleNameSelector = [
    [3, function() { return nextDatum('SpanishMaleNames'); }],
    [3, function() { return properNameStem()+"o"; }],
    [1, function() { return ordinalNumberAsName()+"o"; }]
  ];

  this.maleName = function() { return maleNameSelector.randomWeightedElement()(); }

  var femaleNameSelector = [
    [3, function() { return nextDatum('SpanishFemaleNames'); }],
    [3, function() { return properNameStem()+"a"; }],
    [1, function() { return ordinalNumberAsName()+"a"; }]
  ];

  this.femaleName = function() { return femaleNameSelector.randomWeightedElement()(); }

  var surnameSuffixes = ["o","a","os","as","es","ez"];

  function surnameSuffix() { return surnameSuffixes.randomElement(); }

  var surnameSelector = [
    [3, function() { return nextDatum('SpanishSurnames'); }],
    [3, function() { return appendSuffix(properNameStem(),surnameSuffix()); }],
    [1, function() { return appendSuffix(ordinalNumberAsName(),surnameSuffix()); }],
    [1, function() { return "San "+_this.maleName(); }],
    [1, function() { return "Santa "+_this.femaleName(); }],
    [1, function() { return "de "+nextDatum('SpanishPlaces'); }],
    [1, function() { return "de San "+_this.maleName(); }],
    [1, function() { return "de Santa "+_this.femaleName(); }]
  ];

  var oneSurname = function() { return surnameSelector.randomWeightedElement()(); }

  this.surname = function() {
    if (Math.random() < 0.9) {
      return oneSurname();
    } else {
      return oneSurname()+" y "+oneSurname();
    };
  };

  this.maleFullName = function() {
    return this.maleName()+" "+this.surname();
  };

  this.femaleFullName = function() {
    return this.femaleName()+" "+this.surname();
  };

};
