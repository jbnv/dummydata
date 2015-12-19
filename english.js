var English = function() {

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

  var _urlPrefix = "Languages/English";

  // Download the data files.
  // This needs to be replaced with a call to the JSON file,
  // but the JSON script needs to process the noun and verb options.
  _downloadFile(_repositoryURL+'/Languages/English/English.txt')
  .then(
    function(text) {
      text.split("\n").forEach(function(line) {
        if (!line) return;
        var a = line.split("|");
        downloadTextFile(_urlPrefix,a[0],a.length > 1 && a[1] ? listOptions[a[1]] : null);
      });
    },
    function(error) {
      console.error(error);
    }
  );

  var _this = this;

  // [adjective phrase, is plural? (default false)]
  this.adjectivePhrase = new Selector([
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
  ]);

  this.color = function() {
    var baseColor = nextDatum('EnglishColors');
    if (baseColor == "black" || baseColor == "white") { return baseColor; }
    var modifiers = ["light","medium","dark","bright","pale"];
    var selector = Math.random();
    if (selector < 0.3) { return modifiers[Math.floor(selector/0.3*modifiers.length)]+" "+baseColor; }
    return baseColor;
  }

  this.maleName = new Selector([
    [2,function() {return nextDatum('EnglishNamePrefixes1')+nextDatum('EnglishNameSuffixes1')}],
    [2,function() {return nextDatum('EnglishNamePrefixes1')+nextDatum('EnglishNameSuffixes2');}],
    function() {return nextDatum('EnglishNamePrefixes2')+nextDatum('EnglishNameSuffixes1');}
  ]);

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

  var cardinalDirectionsForAddresses = new Selector([
    [10,['']],
    [4,['N.','S.','E.','W.']],
    [1,['NW','NE','SW','SE']]
  ]);

  var streetName = new Selector([
    function() { return nextDatum('EnglishAnimals'); },
    function() { return _this.color(); },
    function() { return nextDatum('EnglishOrdinalNumbers'); },
    function() { return nextDatum('EnglishPlants'); },
    function() { return _this.maleName(); },
    function() { return _this.femaleName(); },
    function() { return _this.surname(); },
    function() { return _this.maleFullName(); },
    function() { return _this.femaleFullName(); },
    function() { return nextDatum('EnglishAdjectives')+' '+nextDatum('EnglishTerrainWords'); },
    function() { return nextDatum('EnglishTerrainWords')+['side','view'].randomElement(); }
  ]);

  this.streetAddress = function() {
    var number = Math.floor(Math.pow(100000,Math.random()));
    var cardinalDirection = cardinalDirectionsForAddresses();
    var streetType = nextDatum('EnglishRoadTypes');
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
    function() { return _this.surname(); },
    function() { return _this.surname()+cityModifiers.randomElement(); },
    function() { return _this.surname()+cityModifiers.randomElement(); },
    function() { return _this.maleName()+cityModifiers.randomElement(); },
    function() { return _this.femaleName()+cityModifiers.randomElement(); },
    function() { return "Lake "+_this.surname(); },
    function() { return "Lake "+_this.maleName(); },
    function() { return "Lake "+_this.femaleName(); },
    function() { return "Mount "+_this.surname(); },
    function() { return "Mount "+_this.maleName(); },
    function() { return "Mount "+_this.femaleName(); }
  ]);

  this.city = function() {
    var cardinalDirection = cardinalDirectionsForCity();
    var city
      = cardinalDirection + (cardinalDirection == '' ? '' : " ")
      + citySelector();
    return toTitleCase(city);
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
