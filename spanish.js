var Spanish = function() {

  downloadTextFile('SpanishMaleNames');
  downloadTextFile('SpanishFemaleNames');
  downloadTextFile('SpanishSurnames');
  downloadTextFile('SpanishNameStems');
  downloadTextFile('SpanishPlaces');

  var _this = this;

  this.maleName = function() {
    if (Math.random() < 0.5) {
      return nextDatum('SpanishMaleNames');
    } else {
      return nextDatum('SpanishNameStems')+"o";
    }
  };

  this.femaleName = function() {
    if (Math.random() < 0.5) {
      return nextDatum('SpanishFemaleNames');
    } else {
      return nextDatum('SpanishNameStems')+"a";
    }
  };

  var oneSurname = function() {

    var selector = Math.random();

    if (selector < 0.45) {
      return nextDatum('SpanishSurnames');
    }

    if (selector < 0.85) {
      var stem = nextDatum('SpanishNameStems');
      console.log(stem,stem.substr(-1))
      switch (stem.substr(-1)) {
        case "c": return stem.substr(0,stem.length-1)+"quez";
        case "g": return stem.substr(0,stem.length-1)+"guez";
      }
      return stem+"ez";
    }

    if (selector < 0.90) {
      return "de "+nextDatum('SpanishPlaces');
    }

    if (selector < 0.95) {
      return "San "+_this.maleName();
    }

    return "Santa "+_this.femaleName();
  };

  this.surname = function() {
    if (Math.random() < 0.9) {
      return oneSurname();
    } else {
      return oneSurname()+" y "+oneSurname();
    };
  };

  this.maleFullName = function() {
    return this.maleName()+" "+this.surname();
  };

  this.femaleFullName = function() {
    return this.femaleName()+" "+this.surname();
  };

};
