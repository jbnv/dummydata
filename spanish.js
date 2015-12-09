var Spanish = function() {

  downloadTextFile('SpanishCardinalNumbers');
  downloadTextFile('SpanishOrdinalNumbers');
  downloadTextFile('SpanishMaleNames');
  downloadTextFile('SpanishFemaleNames');
  downloadTextFile('SpanishSurnames');
  downloadTextFile('SpanishNameStems');
  downloadTextFile('SpanishPlaces');

  var _this = this;

  function adjustNameStem(stem) {
    switch (stem.substr(-1)) {
      case "c": return stem.substr(0,stem.length-1)+"qu";
      case "g": return stem.substr(0,stem.length-1)+"gu";
    }
    return stem;
  }

  function ordinalNumberAsName() {
    return nextDatum('SpanishOrdinalNumbers',{transform:toInitialCase});
  }

  this.maleName = function() {
    return [
      [3, function() { return nextDatum('SpanishMaleNames'); }],
      [3, function() { return nextDatum('SpanishNameStems')+"o"; }],
      [1, function() { return adjustNameStem(nextDatum('SpanishNameStems'))+"ito"; }],
      [1, function() { return adjustNameStem(nextDatum('SpanishNameStems'))+"ino"; }],
      [1, function() { return ordinalNumberAsName()+"o"; }],
      [1, function() { return ordinalNumberAsName()+"ito"; }],
      [1, function() { return ordinalNumberAsName()+"ino"; }]
    ].randomWeightedElement()();
  };

  this.femaleName = function() {
    return [
      [3, function() { return nextDatum('SpanishFemaleNames'); }],
      [3, function() { return nextDatum('SpanishNameStems')+"a"; }],
      [1, function() { return adjustNameStem(nextDatum('SpanishNameStems'))+"ita"; }],
      [1, function() { return adjustNameStem(nextDatum('SpanishNameStems'))+"ina"; }],
      [1, function() { return ordinalNumberAsName()+"a"; }],
      [1, function() { return ordinalNumberAsName()+"ita"; }],
      [1, function() { return ordinalNumberAsName()+"ina"; }]
    ].randomWeightedElement()();
  };

  var oneSurname = function() {
    return [
      [3, function() { return nextDatum('SpanishSurnames'); }],
      [3, function() { return adjustNameStem(nextDatum('SpanishNameStems'))+"ez"; }],
      [1, function() { return adjustNameStem(nextDatum('SpanishNameStems'))+"inez"; }],
      [1, function() { return adjustNameStem(nextDatum('SpanishNameStems'))+"itez"; }],
      [1, function() { return ordinalNumberAsName()+"ez"; }],
      [1, function() { return ordinalNumberAsName()+"itez"; }],
      [1, function() { return ordinalNumberAsName()+"inez"; }],
      [1, function() { return "San "+_this.maleName(); }],
      [1, function() { return "Santa "+_this.femaleName(); }],
      [1, function() { return "de "+nextDatum('SpanishPlaces'); }],
      [1, function() { return "de San "+_this.maleName(); }],
      [1, function() { return "de Santa "+_this.femaleName(); }]
    ].randomWeightedElement()();
  };

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
