var Japanese = function(dd) {

  var _data = new DummyDataEngine(dd,'Languages','Japanese','json');

  var maleNameSelector = function() { return _data('JapaneseMaleNames'); };

  function maleName() { return toInitialCase(maleNameSelector()); }

  var femaleNameSelector = function() { return _data('JapaneseFemaleNames'); };

  function femaleName() { return toInitialCase(femaleNameSelector()); }

  var surnameSelector = function() { return _data('JapaneseSurnamePrefixes')+_data('JapaneseSurnameSuffixes'); }

  function surname() { return toInitialCase(surnameSelector()); }

  function maleFullName() { return surname()+" "+maleName(); };

  function femaleFullName() { return surname()+" "+femaleName(); };

  this.menuItems = [
    ["Male Name", maleName],
    ["Female Name", femaleName],
    ["Surname", surname],
    ["Male Full Name", maleFullName],
    ["Female Full Name", femaleFullName]
  ];

};
