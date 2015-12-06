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

}
