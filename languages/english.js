var English = function(dd) {

  var listOptions = {};

  listOptions.nounOption = {
    partOfSpeech: "noun",
    transform: function(itemArray) {
      if (itemArray.length == 1) {
        itemArray.push(itemArray[0]+"s");
      }
      return itemArray;
    }
  }

  listOptions.verbOption = {
    partOfSpeech: "verb",
    transform: function(itemArray) {
      var outbound = [];
      var stem = itemArray[0];
      if (stem.substr(-3) == "{e}") {
        stem = stem.substr(0,stem.length-3);
        outbound.push(stem+"e");
        outbound.push(stem+"es"); // present singular
        outbound.push(stem+"e"); // present plural
        outbound.push(stem+"ed"); // past
        outbound.push(stem+"ing"); // participle
        return outbound;
      }
      if (stem.substr(-3) == "{y}") {
        stem = stem.substr(0,stem.length-3);
        outbound.push(stem+"y");
        outbound.push(stem+"ies"); // present singular
        outbound.push(stem+"y"); // present plural
        outbound.push(stem+"ied"); // past
        outbound.push(stem+"ying"); // participle
        return outbound;
      }

      outbound.push(stem);
      outbound.push(itemArray[1] || stem+"s"); // present singular
      outbound.push(itemArray[2] || stem); // present plural
      outbound.push(itemArray[3] || stem+"ed"); // past
      outbound.push(itemArray[4] || stem+"ing"); // participle
      return outbound;
    }
  }

  // Download the data files.
  // This needs to be replaced with a call to the JSON file,
  // but the JSON script needs to process the noun and verb options.
  var _data = new DummyDataEngine(dd,'Languages','English','txt',listOptions);

  var _this = this;

  // [adjective phrase, is plural? (default false)]
  var adjectivePhrase = new Selector([
    function() { return ["the",_singularOrPlural(0.50)]; },
    function() { return ["the "+_data("EnglishAdjectives"),_singularOrPlural(0.50)]; },
    function() { return [_data("EnglishCardinalNumbers"),true]; },
    function() {
      var number = _data("EnglishCardinalNumbers");
      return ["the "+number, number != "one"];
    },
    function() { return ["the "+_data("EnglishOrdinalNumbers")]; },
    function() { return ["some",_singularOrPlural(0.50)]; },
    function() { return ["some "+_data("EnglishAdjectives"),true]; },
    function() { return ["any",true]; },
    function() { return ["any "+_data("EnglishAdjectives"),true]; },
    function() { return ["many",true]; },
    function() { return ["many "+_data("EnglishAdjectives"),true]; },
    function() { return ["few",true]; },
    function() { return ["few "+_data("EnglishAdjectives"),true]; },
    function() { return [maleName()+"'s",_singularOrPlural(0.50)]; },
    function() { return [femaleName()+"'s",_singularOrPlural(0.50)]; }
  ]);

  function color() {
    var baseColor = _data('EnglishColors');
    if (baseColor == "black" || baseColor == "white") { return baseColor; }
    var modifiers = ["light","medium","dark","bright","pale"];
    var selector = Math.random();
    if (selector < 0.3) { return modifiers[Math.floor(selector/0.3*modifiers.length)]+" "+baseColor; }
    return baseColor;
  }

  var maleName = new Selector([
    [2,function() {return _data('EnglishNamePrefixes1')+_data('EnglishNameSuffixes1')}],
    [2,function() {return _data('EnglishNamePrefixes1')+_data('EnglishNameSuffixes2');}],
    function() {return _data('EnglishNamePrefixes2')+_data('EnglishNameSuffixes1');}
  ]);

  function femaleName() {
    var selector = Math.random();
    if (selector < 0.8) return _data('EnglishFemaleNames');
    return maleName()+_data('EnglishFeminineSuffixes');
  };

  function surname() {
    var selector = Math.random();
    if (selector < 0.4) return _data('EnglishSurnames');
    return maleName();
  };

  function maleFullName() {
    return maleName()+" "+surname();
  };

  function femaleFullName() {
    return femaleName()+" "+surname();
  };

  var cardinalDirectionsForAddresses = new Selector([
    [10,['']],
    [4,['N.','S.','E.','W.']],
    [1,['NW','NE','SW','SE']]
  ]);

  var streetName = new Selector([
    function() { return _data('EnglishAnimals'); },
    function() { return color(); },
    function() { return _data('EnglishOrdinalNumbers'); },
    function() { return _data('EnglishPlants'); },
    function() { return maleName(); },
    function() { return femaleName(); },
    function() { return surname(); },
    function() { return maleFullName(); },
    function() { return femaleFullName(); },
    function() { return _data('EnglishAdjectives')+' '+_data('EnglishTerrainWords'); },
    function() { return _data('EnglishTerrainWords')+['side','view'].randomElement(); }
  ]);

  function streetAddress() {
    var number = Math.floor(Math.pow(100000,Math.random()));
    var cardinalDirection = cardinalDirectionsForAddresses();
    var streetType = _data('EnglishRoadTypes');
    var address
      = "" + number + " "
      + cardinalDirection + (cardinalDirection == '' ? '' : " ")
      + streetName() + " " + streetType;
    return toTitleCase(address);
  }

  var cardinalDirectionsForCity = new Selector([
    [10,['']],
    [4,['North','South','East','West']],
    [1,['Upper','Lower']]
  ]);

  var cityModifiers = ['town','ton','ville','burg',' City',' Springs',' Heights',' Town'];

  var citySelector = new Selector([
    function() { return surname(); },
    function() { return surname()+cityModifiers.randomElement(); },
    function() { return surname()+cityModifiers.randomElement(); },
    function() { return maleName()+cityModifiers.randomElement(); },
    function() { return femaleName()+cityModifiers.randomElement(); },
    function() { return "Lake "+surname(); },
    function() { return "Lake "+maleName(); },
    function() { return "Lake "+femaleName(); },
    function() { return "Mount "+surname(); },
    function() { return "Mount "+maleName(); },
    function() { return "Mount "+femaleName(); }
  ]);

  function city() {
    var cardinalDirection = cardinalDirectionsForCity();
    var city
      = cardinalDirection + (cardinalDirection == '' ? '' : " ")
      + citySelector();
    return toTitleCase(city);
  }

  var ipsum_noun_selector = new Selector([
    function() { return _data('EnglishAnimals'); }, //TEMP _dataOptions removed from each
    function() { return _data('EnglishPlants'); },
    function() { return _data('EnglishRoadTypes'); },
    function() { return _data('EnglishSubstances'); }
  ]);

  function ipsum_clause() {
    var adjectivePhraseArray = adjectivePhrase();
    var _dataOptions = {
      partOfSpeech: 'noun',
      plural: adjectivePhraseArray.length >= 2 && adjectivePhraseArray[1]
    };
    return adjectivePhraseArray[0]+" "+ipsum_noun_selector();
  }

  function verbSelector(tense) {
    return _data('EnglishVerbs',{partOfSpeech:'verb','case':tense});
  }

  var ipsum_verb = new Selector([
    [5, function() { return verbSelector('past');}],
    [5, function() {
      var selector1 = [
        ['','infinitive'],
        ['be','past'],
        ['be','participle'],
        ['have','past'],
        ['have been','past'],
        ['have been','participle']
      ].randomElement();
      var outbound =
        ['can','could','shall','should','may','might','will','would'].randomElement()
        + " " + selector1[0] + (selector1[0] == "" ? "" : " ")
        + verbSelector(selector1[1]);
      return outbound;
    }]
  ]);

  function ipsum(options) {
    var sentenceCount = options == null ? 1 : (options.count || 1);
    var sentences = [];
    for (var i = 0; i < sentenceCount; i++) {
      var sentence = toInitialCase(ipsum_clause()+" "+ipsum_verb()+" "+ipsum_clause()+".")
      sentences.push(sentence);
    }
    return sentences.join(" ");
  }

  var businessNameSelector = new Selector([
    function() { return surname()+" & "+surname(); },
    function() { return surname()+" & Associates"; },
    function() { return surname()+" & Company"; },
    function() { return surname()+" & Son"; },
    function() { return surname()+", "+surname()+" & Associates"; },
    function() { return surname()+" Industries"; },
    function() { return surname()+" LLC"; },
    function() { return surname()+" "+surname()+" LLC"; },
    function() { return surname()+", Incorporated"; },
    function() { return surname()+" "+surname()+", Incorporated"; }
    // function() { return [color] [noun]" Company"; },
    // function() { return [color] [noun]" Industries"; },
  ]);

  this.menuItems = [
    ["Male Name", maleName],
    ["Female Name", femaleName],
    ["Surname", surname],
    ["Male Full Name", maleFullName],
    ["Female Full Name", femaleFullName],
    null,
    ["Color", color],
    ["Street Address",streetAddress],
    ["City",city],
    ["Business Name",businessNameSelector],
    null,
    ["Ipsum 1 sentence",ipsum],
    ["Ipsum 3 sentences",ipsum,{count:3}],
    ["Ipsum 5 sentences",ipsum,{count:5}]
  ];

}
