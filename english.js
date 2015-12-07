var English = function() {

  var nounOption = {
    partOfSpech: "noun",
    transform: function(itemArray) {
      if (itemArray.length == 1) {
        itemArray.push(itemArray[0]+"s");
      }
      return itemArray;
    }
  }

  downloadTextFile('EnglishAdjectives');
  downloadTextFile('EnglishAnimals',nounOption);
  downloadTextFile('EnglishCardinalNumbers');
  downloadTextFile('EnglishFemaleNames');
  downloadTextFile('EnglishFeminineSuffixes');
  downloadTextFile('EnglishNamePrefixes1'); // prefixes that end in a consonant
  downloadTextFile('EnglishNamePrefixes2'); // prefixes that end in a vowel
  downloadTextFile('EnglishNameSuffixes1'); // suffixes that begin with a consonant
  downloadTextFile('EnglishNameSuffixes2'); // suffixes that begin with a vowel
  downloadTextFile('EnglishOrdinalNumbers');
  downloadTextFile('EnglishPlants',nounOption);
  downloadTextFile('EnglishSurnames');

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
      function() { return nextDatum('EnglishOrdinalNumbers'); },
      function() { return nextDatum('EnglishPlants'); },
      function() { return _this.surname(); },
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
      partOfSpech: 'noun',
      plural: adjectivePhraseArray.length >= 2 && adjectivePhraseArray[1]
    };
    console.log("nextDatumOptions",nextDatumOptions);
    var noun = [
      function() { return nextDatum('EnglishAnimals',nextDatumOptions); },
      function() { return nextDatum('EnglishPlants',nextDatumOptions); }
    ].nextElement()();
    console.log("noun",noun);
    return adjectivePhraseArray[0]+" "+noun;
  }

  this.ipsum = function(options) {
    var sentenceCount = options == null ? 1 : (options.count || 1);
    var sentences = [];
    for (var i = 0; i < sentenceCount; i++) {
      var verb = "covered";
      var sentence = toInitialCase(ipsum_clause()+" "+verb+" "+ipsum_clause()+".")
      sentences.push(sentence);
    }
    return sentences.join(" ");
  }

}
