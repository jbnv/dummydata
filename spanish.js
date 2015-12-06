var Spanish = function() {

  downloadTextFile('SpanishMaleNames');
  downloadTextFile('SpanishFemaleNames');
  downloadTextFile('SpanishSurnames');

  this.maleName = function() {
    return nextDatum('SpanishMaleNames');
  };

  this.femaleName = function() {
    return nextDatum('SpanishFemaleNames');
  };

  this.surname = function() {
    if (Math.random() < 0.9) {
      return nextDatum('SpanishSurnames');
    } else {
      return nextDatum('SpanishSurnames')+" y "+nextDatum('SpanishSurnames');
    };
  };

  this.maleFullName = function() {
    return this.maleName()+" "+this.surname();
  };

  this.femaleFullName = function() {
    return this.femaleName()+" "+this.surname();
  };

};
