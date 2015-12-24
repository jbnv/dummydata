var German = function(dd) {

  var _data = new DummyDataEngine(dd,'Languages','German','json');

  var maleNameSelector = function() { return _data('GermanMaleNames'); };

  function maleName() { return toInitialCase(maleNameSelector()); }

  var femaleNameSelector = function() { return _data('GermanFemaleNames'); };

  function femaleName() { return toInitialCase(femaleNameSelector()); }

  var surnameSelector = function() { return _data('GermanSurnamePrefixes')+_data('GermanSurnameSuffixes'); }

  function surname() { return toInitialCase(surnameSelector()); }

  function maleFullName() { return maleName()+" "+surname(); };

  function femaleFullName() { return femaleName()+" "+surname(); };

  this.menuItems = [
    ["Male Name", maleName],
    ["Female Name", femaleName],
    ["Surname", surname],
    ["Male Full Name", maleFullName],
    ["Female Full Name", femaleFullName]
  ];

};
