var Canada = function(dd) {

  function digit() {
    return Math.floor(10*Math.random());
  }

  var postalCodeLetters = "ABCEFGHJKLMNPRSTUVWXY";

  function postalCodeLetter() {
    return postalCodeLetters.substr(Math.floor(postalCodeLetters.length*Math.random()),1);
  };

  function postalCode() {
    return postalCodeLetter()+digit()+postalCodeLetter()+" "+digit()+postalCodeLetter()+digit();
  };

  this.menuItems = [
    ["Postal Code", postalCode]
  ];

};
