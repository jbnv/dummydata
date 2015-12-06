var English = function() {

  downloadTextFile('EnglishAdjectives');
  downloadTextFile('EnglishAnimals');
  downloadTextFile('EnglishCardinalNumbers');
  downloadTextFile('EnglishFemaleNames');
  downloadTextFile('EnglishFeminineSuffixes');
  downloadTextFile('EnglishNamePrefixes1'); // prefixes that end in a consonant
  downloadTextFile('EnglishNamePrefixes2'); // prefixes that end in a vowel
  downloadTextFile('EnglishNameSuffixes1'); // suffixes that begin with a consonant
  downloadTextFile('EnglishNameSuffixes2'); // suffixes that begin with a vowel
  downloadTextFile('EnglishOrdinalNumbers');
  downloadTextFile('EnglishPlants');
  downloadTextFile('EnglishSurnames');

  var _this = this;

  var adjectivePhraseOptions = [
    function() { return "the" },
    function() { return "the "+nextDatum("EnglishAdjectives") },
    function() { return nextDatum("EnglishCardinalNumbers") },
    function() { return "the "+nextDatum("EnglishCardinalNumbers") },
    function() { return "the "+nextDatum("EnglishOrdinalNumbers") },
    function() { return "some" },
    function() { return "some "+nextDatum("EnglishAdjectives") },
    function() { return "any" },
    function() { return "any "+nextDatum("EnglishAdjectives") },
    function() { return "many" },
    function() { return "many "+nextDatum("EnglishAdjectives") },
    function() { return "many" },
    function() { return "few "+nextDatum("EnglishAdjectives") },
    function() { return _this.maleName()+"'s" },
    function() { return _this.femaleName()+"'s" }
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

  this.ipsum = function(options) {
    var sentenceCount = options == null ? 1 : (options.count || 1);
    var sentences = [];
    for (var i = 0; i < sentenceCount; i++) {
      var noun1 = nextDatum("EnglishPlants") + "s";
      var verb = "covered";
      var noun2 = nextDatum("EnglishPlants") + "s";
      var sentence = toInitialCase(this.adjectivePhrase()+" "+noun1+" "+verb+" "+this.adjectivePhrase()+" "+noun2+".")
      sentences.push(sentence);
    }
    return sentences.join(" ");
  }

}
