var English = function() {

  var nounOption = {
    partOfSpeech: "noun",
    transform: function(itemArray) {
      if (itemArray.length == 1) {
        itemArray.push(itemArray[0]+"s");
      }
      return itemArray;
    }
  }

  var verbOption = {
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

  downloadTextFile('EnglishAdjectives');
  downloadTextFile('EnglishAnimals',nounOption);
  downloadTextFile('EnglishCardinalNumbers');
  downloadTextFile('EnglishColors');
  downloadTextFile('EnglishFemaleNames');
  downloadTextFile('EnglishFeminineSuffixes');
  downloadTextFile('EnglishNamePrefixes1'); // prefixes that end in a consonant
  downloadTextFile('EnglishNamePrefixes2'); // prefixes that end in a vowel
  downloadTextFile('EnglishNameSuffixes1'); // suffixes that begin with a consonant
  downloadTextFile('EnglishNameSuffixes2'); // suffixes that begin with a vowel
  downloadTextFile('EnglishOrdinalNumbers');
  downloadTextFile('EnglishPlants',nounOption);
  downloadTextFile('EnglishSurnames');
  downloadTextFile('EnglishVerbs',verbOption);

  var _this = this;

  // [adjective phrase, is plural? (default false)]
  var adjectivePhraseOptions = [
    function() { return ["the"]; },
    function() { return ["the "+nextDatum("EnglishAdjectives"),_singularOrPlural(0.50)]; },
    function() { return [nextDatum("EnglishCardinalNumbers"),true]; },
    function() {
      var number = nextDatum("EnglishCardinalNumbers");
      return ["the "+number, number != "one"];
    },
    function() { return ["the "+nextDatum("EnglishOrdinalNumbers")]; },
    function() { return ["some",_singularOrPlural(0.50)]; },
    function() { return ["some "+nextDatum("EnglishAdjectives"),true]; },
    function() { return ["any",true]; },
    function() { return ["any "+nextDatum("EnglishAdjectives"),true]; },
    function() { return ["many",true]; },
    function() { return ["many "+nextDatum("EnglishAdjectives"),true]; },
    function() { return ["few",true]; },
    function() { return ["few "+nextDatum("EnglishAdjectives"),true]; },
    function() { return [_this.maleName()+"'s",_singularOrPlural(0.50)]; },
    function() { return [_this.femaleName()+"'s",_singularOrPlural(0.50)]; }
  ];

  this.adjectivePhrase = function() {
    return adjectivePhraseOptions[Math.floor(adjectivePhraseOptions.length*Math.random())]();
  }

  this.color = function() {
    var baseColor = nextDatum('EnglishColors');
    if (baseColor == "black" || baseColor == "white") { return baseColor; }
    var modifiers = ["light","medium","dark","bright","pale"];
    var selector = Math.random();
    if (selector < 0.3) { return modifiers[Math.floor(selector/0.3*modifiers.length)]+" "+baseColor; }
    return baseColor;
  }

  this.maleName = function() {
    var selector = Math.random();
    if (selector < 0.4) {
      return nextDatum('EnglishNamePrefixes1')+nextDatum('EnglishNameSuffixes1');
    } else if (selector < 0.8) {
      return nextDatum('EnglishNamePrefixes1')+nextDatum('EnglishNameSuffixes2');
    } else {
      return nextDatum('EnglishNamePrefixes2')+nextDatum('EnglishNameSuffixes1');
    }
  };

  this.femaleName = function() {
    var selector = Math.random();
    if (selector < 0.8) return nextDatum('EnglishFemaleNames');
    return this.maleName()+nextDatum('EnglishFeminineSuffixes');
  };

  this.surname = function() {
    var selector = Math.random();
    if (selector < 0.4) return nextDatum('EnglishSurnames');
    return this.maleName();
  };

  this.maleFullName = function() {
    return this.maleName()+" "+this.surname();
  };

  this.femaleFullName = function() {
    return this.femaleName()+" "+this.surname();
  };

  this.streetAddress = function() {
    var nameFns = [
      function() { return nextDatum('EnglishAnimals'); },
      function() { return _this.color(); },
      function() { return nextDatum('EnglishOrdinalNumbers'); },
      function() { return nextDatum('EnglishPlants'); },
      function() { return _this.maleName(); },
      function() { return _this.femaleName(); },
      function() { return _this.surname(); },
      function() { return _this.maleFullName(); },
      function() { return _this.femaleFullName(); },
    ];
    var number = Math.floor(Math.pow(100000,Math.random()));
    var types = ["Street","Road","Drive","Lane"];
    var streetName = nameFns[_ordinal % nameFns.length]();
    var streetType = types[_ordinal % types.length];
    var address = "" + number + " " + streetName + " " + streetType;
    return toTitleCase(address);
  }

  function ipsum_clause() {
    var adjectivePhraseArray = _this.adjectivePhrase();
    var nextDatumOptions = {
      partOfSpeech: 'noun',
      plural: adjectivePhraseArray.length >= 2 && adjectivePhraseArray[1]
    };
    var noun = [
      function() { return nextDatum('EnglishAnimals',nextDatumOptions); },
      function() { return nextDatum('EnglishPlants',nextDatumOptions); }
    ].nextElement()();
    return adjectivePhraseArray[0]+" "+noun;
  }

  function verbSelector(tense) {
    return nextDatum('EnglishVerbs',{partOfSpeech:'verb','case':tense});
  }

  var ipsum_verb_selectionList = [
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
  ];

  function ipsum_verb() { return ipsum_verb_selectionList.randomWeightedElement()(); }

  this.ipsum = function(options) {
    var sentenceCount = options == null ? 1 : (options.count || 1);
    var sentences = [];
    for (var i = 0; i < sentenceCount; i++) {
      var sentence = toInitialCase(ipsum_clause()+" "+ipsum_verb()+" "+ipsum_clause()+".")
      sentences.push(sentence);
    }
    return sentences.join(" ");
  }

}
