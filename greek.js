var Greek = function(dd) {

  var _data = new DummyDataEngine(dd,'Languages','Greek','json');

  var namePrefixSelector = new Selector([
    [1, function() { return _data('GreekStems')+"o"; }],
    [1, function() { return _data('GreekNumbers'); }],
    [1, function() { return _data('GreekLetters')+"a"; }]
  ]);

  var nameBaseSelector = new Selector([
    [3, function() { return _data('GreekStems'); }],
    [3, function() { return _data('GreekLetters'); }],
    [1, function() { return namePrefixSelector()+_data('GreekStems'); }],
    [1, function() { return namePrefixSelector()+_data('GreekLetters'); }]
  ]);

  var maleSuffixes = ['as','os','es','is','us','ys','on','ander'];

  var maleNameSelector = function() { return nameBaseSelector()+maleSuffixes.randomElement(); }

  function maleName() { return toInitialCase(maleNameSelector()); }

  var femaleSuffixes = ['a','e','o'];

  var femaleNameSelector = new Selector([
    [19,function() { return nameBaseSelector()+femaleSuffixes.randomElement(); }],
    function() { return namePrefixSelector()+"meter"; }
  ]);

  function femaleName() { return toInitialCase(femaleNameSelector()); }

  var surnameSuffixes = ['os','es','on'];

  var surnameSelector = function() { return nameBaseSelector()+surnameSuffixes.randomElement(); }

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
