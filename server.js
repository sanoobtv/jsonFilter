var express = require('express');
var app = express();
app.set('view engine','ejs');
require('./routes.js')(app);

var stepLevel;


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
