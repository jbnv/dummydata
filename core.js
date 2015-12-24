var _data = new DummyData();

_data.addLanguage({
  'English': new English(),
  'German': new German(),
  'Greek': new Greek(),
  'Japanese': new Japanese(),
  'Spanish': new Spanish()
});

_data.addCountry({
  'UnitedStates': null, //FUTURE
  'Canada': null //FUTURE
});

_data.resetMenu();
