module.exports = function(app) {
  var bodyParser = require('body-parser');
  var isJSON = require('is-json');
  var jsonQuery = require('json-query')
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.get('/', function(req, res) {
    res.render('Index.ejs');
  });

  app.post('/validateJson', function(req, res) {
    var data = req.body.inputJSON;
    if (isJSON(data))
    {
      console.log('valid json');

console.log(jsonQuery('payload[country=USA].country',{data: data}));
    res.render('Index.ejs')
    } else {
      console.log('not valid');
    }
  });
}
