var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.set('views', __dirname + '/Views');
app.set('view engine','ejs');

require('./routes.js')(app);


app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
