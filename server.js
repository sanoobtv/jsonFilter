var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

require('./routes.js')(app);


app.listen(port, function () {
  console.log('JsonFilter app listening on port !');
});
