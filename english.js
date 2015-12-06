var English = function() {

  downloadTextFile('EnglishAdjectives');
  downloadTextFile('EnglishAnimals');
  downloadTextFile('EnglishFemaleNames');
  downloadTextFile('EnglishFeminineSuffixes');
  downloadTextFile('EnglishNamePrefixes1'); // prefixes that end in a consonant
  downloadTextFile('EnglishNamePrefixes2'); // prefixes that end in a vowel
  downloadTextFile('EnglishNameSuffixes1'); // suffixes that begin with a consonant
  downloadTextFile('EnglishNameSuffixes2'); // suffixes that begin with a vowel
  downloadTextFile('EnglishOrdinalNumbers');
  downloadTextFile('EnglishPlants');
  downloadTextFile('EnglishSurnames');

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
    var number = Math.floor(Math.pow(Math.random()*4,10));
    var types = ["Street","Road","Drive","Lane"];
    var address = "" + number + " " + nextDatum('EnglishOrdinalNumbers') + " " + types[Math.floor(types.length*Math.random())]
    return toTitleCase(address);
  }

  this.ipsum = function(options) {
    var articles = ["the","some","any","many","few"];
    var sentenceCount = options == null ? 1 : (options.count || 1);
    var sentences = [];
    for (var i = 0; i < sentenceCount; i++) {
      var article1 = articles[Math.floor(articles.length*Math.random())];
      var adjective1 = nextDatum("EnglishAdjectives");
      var noun1 = nextDatum("EnglishPlants") + "s";
      var verb = "covered";
      var article2 = articles[Math.floor(articles.length*Math.random())];
      var adjective2 = nextDatum("EnglishAdjectives");
      var noun2 = nextDatum("EnglishPlants") + "s";
      var sentence = toInitialCase(article1+" "+adjective1+" "+noun1+" "+verb+" "+article2+" "+adjective2+" "+noun2+".")
      sentences.push(sentence);
    }
    return sentences.join(" ");
  }

}
