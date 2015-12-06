var English = function() {

  this.maleName = function() {
    //return nextDatum('EnglishMaleNames');
    return "John";
  };

  this.femaleName = function() {
    //return nextDatum('EnglishFemaleNames');
    return "Jane";
  };

  this.surname = function() {
    //return nextDatum('EnglishSurnames');
    return "Doe";
  };

  this.maleFullName = function() {
    return this.maleName()+" "+this.surname();
  };

  this.femaleFullName = function() {
    return this.femaleName()+" "+this.surname();
  };

}
