var Greek = function() {

  downloadLanguageJSON('Greek');

  var nameBaseSelector = [
    [3, function() { return nextDatum('GreekStems'); }],
    [3, function() { return nextDatum('GreekLetters'); }],
    [1, function() { return nextDatum('GreekNumbers')+nextDatum('GreekStems'); }],
    [1, function() { return nextDatum('GreekNumbers')+nextDatum('GreekLetters'); }]
  ];

  var maleSuffixes = ['os','es','on'];

  this.maleName = function() {
    var core = nameBaseSelector.randomWeightedElement()()+maleSuffixes.randomElement();
    return toInitialCase(core);
  };

  var femaleSuffixes = ['a','e'];

  this.femaleName = function() {
    var core = nameBaseSelector.randomWeightedElement()()+femaleSuffixes.randomElement();
    return toInitialCase(core);
  };

  var surnameBase1Selector = [
    [1, function() { return nextDatum('GreekStems')+"o"; }],
    [1, function() { return nextDatum('GreekNumbers'); }],
    [1, function() { return nextDatum('GreekLetters')+"a"; }]
  ];

  var surnameSuffixes = ['os','es','on'];

  this.surname = function() {
    core =
      surnameBase1Selector.randomWeightedElement()()
      + nextDatum('GreekStems')
      + surnameSuffixes.randomElement();
    return toInitialCase(core);
  };

  this.maleFullName = function() {
    return this.maleName()+" "+this.surname();
  };

  this.femaleFullName = function() {
    return this.femaleName()+" "+this.surname();
  };

};
