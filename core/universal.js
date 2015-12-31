console.log("universal.js BEGIN");

var Universal = function(dd) {

  function number(){
    return Math.floor(Math.pow(10,Math.random()*10));
  }

  function today() {
    return moment().format("YYYY-MM-DD");
  }

  // earlierDate: Pick a date up to three years before today's date.
  function earlierDate() {
    return moment().subtract(Math.pow(365.25*3,Math.random()),'days').format("YYYY-MM-DD");
  }

  // laterDate: Pick a date up to three years after today's date.
  function laterDate() {
    return moment().add(Math.pow(365.25*3,Math.random()),'days').format("YYYY-MM-DD");
  }

  function phoneNumber(options) {
    return function() {
      if (options == null) options = {};
      if (!options.format) options.format = "0##-####";
      var result = "";
      for (var i = 0; i < options.format.length; i++) {
        if (options.format[i] == '#') {
          result += Math.floor(Math.random()*10);
        } else {
          result += options.format[i];
        }
      }
      return result;
    };
  }

  var alphanumerics = "0123456789abcdefghijklmnpqrstuvwxyz";

  function alphanumeric(options) {
    if (options == null) options = {};
    if (!options.minlength) options.minlength = 5;
    if (!options.maxlength) options.maxlength = 12;
    if (!options.transform) options.transform = function(x) { return x; };
    var length = Math.pow(options.maxlength-options.minlength,Math.random())+options.minlength;
    var outbound = "";
    for (var i = 0; i < length; i++) {
      outbound += alphanumerics.charAt(alphanumerics.length*Math.random());
    }
    return outbound;
  }

  this.menuItems = [
    ["Number",number],
    ["Alphanumeric String",alphanumeric],
    ["0##-####",phoneNumber({format:"0##-####"})],
    ["###-0##-####",phoneNumber({format:"###-0##-####"})],
    null,
    ["Today",today],
    ["Earlier Date",earlierDate],
    ["Later Date",laterDate],
  ];

}

console.log("universal.js END");
