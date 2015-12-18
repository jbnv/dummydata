var Japanese = function() {

  downloadLanguageJSON('Japanese');

  this.maleName = function() {
    return nextDatum('JapaneseMaleNames');
  };

  this.femaleName = function() {
    return nextDatum('JapaneseFemaleNames');
  };

  this.surname = function() {
    return nextDatum('JapaneseSurnamePrefixes')+nextDatum('JapaneseSurnameSuffixes');
  };

  this.maleFullName = function() {
    return this.surname()+" "+this.maleName();
  };

  this.femaleFullName = function() {
    return this.surname()+" "+this.femaleName();
  };

};
