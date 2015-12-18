var German = function() {

  downloadLanguageJSON('German');

  this.maleName = function() {
    return nextDatum('GermanMaleNames');
  };

  this.femaleName = function() {
    return nextDatum('GermanFemaleNames');
  };

  this.surname = function() {
    return nextDatum('GermanSurnamePrefixes')+nextDatum('GermanSurnameSuffixes');
  };

  this.maleFullName = function() {
    return this.maleName()+" "+this.surname();
  };

  this.femaleFullName = function() {
    return this.femaleName()+" "+this.surname();
  };

};
