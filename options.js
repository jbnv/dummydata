function OptionsViewModel() {

  var _this = this;

  this.language = ko.pureComputed({
    read: function() {
      return localStorage["language"] || "English";
    },
    write: function(value) {
      localStorage["language"] = value;
    }
  });

  this.country = ko.pureComputed({
    read: function() {
      return localStorage["country"] || "UnitedStates";
    },
    write: function(value) {
      localStorage["country"] = value;
    },
  });

  this.ordinal = ko.pureComputed({
    read: function() {
      return localStorage["ordinal"] || 0;
    },
    write: function(seed) {
      var value = parseFloat(localStorage["ordinal"]);
      if (seed) value = parseFloat(seed);
      if (Number.isNaN(value)) value = seed || 0;
      localStorage["ordinal"] = value;
    },
  });

  function observableArrayWithSpec(spec){
      var oa = ko.observableArray();
      spec.forEach(function (item) {
        if (item.constructor === Array) {
          outbound = {value: item[0], name: item[1]};
        } else {
          outbound = {value: item, name: item};
        }
        oa.push(outbound);
      });
      return oa;
  }

  this.languageOptions = observableArrayWithSpec(["English","German","Greek","Japanese","Spanish"]);

  this.countryOptions = observableArrayWithSpec([
    ["UnitedStates","United States (USA) / Canada"],
    "Australia",
    "Mexico",
    ["UnitedKingdom","United Kingdom (UK)"]
  ]);

}

var vm;

$(function() {
  vm = new OptionsViewModel();
  ko.applyBindings(vm);
});
