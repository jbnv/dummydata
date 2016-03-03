var express = require('express');
var app = express();

var ordinal = 0;

var menu = {
  languages: [
    { slug: 'en', title: 'English' },
    { slug: 'de', title: 'German' },
    { slug: 'gk', title: 'Greek' },
    { slug: 'jp', title: 'Japanese' },
    { slug: 'es', title: 'Spanish' }
  ],
  countries: [
    { slug: 'us', title: 'United States' },
    { slug: 'ca', title: 'Canada' }
  ],
  universal: true
}

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send(menu);
});

app.get('/menu', function(request, response) {
  response.send(menu);
});

app.get(/^\/languages\/(.+)\/(.+)$/, function(req, res) {
  var languageSlug = req.params[0];
  var datumSlug = req.params[1];
  res.send(content);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
