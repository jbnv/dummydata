var UnitedStates = function(dd) {

  function digit() {
    return Math.floor(10*Math.random());
  }

  function zipCode() {
    return ""+digit()+digit()+digit()+digit()+digit();
  };

  function zipPlus4() {
    return zipCode()+"-"+digit()+digit()+digit()+digit();
  };

  function ssn(options) {
      var format = "###-##-####", result = "";
      for (var i = 0; i < format.length; i++) {
        if (format[i] == '#') {
          result += Math.floor(Math.random()*10);
        } else {
          result += format[i];
        }
      }
      return result;
  }

  this.menuItems = [
    ["Zip Code", zipCode],
    ["Zip+4 Code", zipPlus4],
    ["SSN",ssn]
  ];

};
