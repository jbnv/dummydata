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

  this.menuItems = [
    ["Zip Code", zipCode],
    ["Zip+4 Code", zipPlus4]
  ];

};
