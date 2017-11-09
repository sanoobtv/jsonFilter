module.exports = function(app) {

  var bodyParser = require('body-parser');
  //var isJSON = require('is-json');
  var isJSON = require('is-valid-json');
  var jsonQuery = require('json-query');
  var oresultSet=require('./Model/resultSet.js');

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  //HomePage Rendering, a simple Form
 app.get('/Home', function(req, res) {
    res.render('Index.ejs');
  });

  //Form action from index.js.
  app.post('/validateJson', function(req, res) {
    //obtain form data - which is JSON inside the text field.
    var data = req.body.inputJSON;
    //validate if the given string is Json format- if true do the logic
    if (isJSON(data)) {
      console.log('valid json');
      var respon = getDataByDrm(data);
      var episodefilter = getDataByEp(respon)

      function getDataByDrm(data) {

        var jdata = JSON.parse(data);
        var drm = true;
        return jdata.payload.filter(
          function(jdata) {
            return jdata.drm == drm;
          });
      }

      function getDataByEp(jrespon) {
        return jrespon.filter(
          function(jrespon) {
            return jrespon.episodeCount > 0;
          }
        );
      }
      for (var i = 0; i < episodefilter.length; i++)
        console.log(episodefilter[i].title);
      res.render('Index.ejs')
    }
    //if not json send error message, mentioning its not JSON
    else {
      console.log('not valid');
    }
  });

  app.post('/', (req, res ,err) => {
    req.accepts('application/json')
  //  var drm = req.body.drm;
  //  var episodeCount = req.body.episodeCount;
    var data = req.body.payload;

    if (isJSON(data))
    {
    console.log('valid json');
    console.log(data);
    var respon = getDataByDrm(data);
    var episodefilter = getDataByEp(respon)
    var result = [];

    function getDataByDrm(data) {
      var jdata = JSON.parse(data);
      var drm = true;
      return jdata.filter(
        function(jdata) {
          return jdata.drm == drm;
        });
    }

    function getDataByEp(jrespon) {
      return jrespon.filter(
        function(jrespon) {
          return jrespon.episodeCount > 0;
        }
      );
    }
    for (var i = 0; i < episodefilter.length; i++) {
    var iresultSet = new oresultSet(episodefilter[i].image.showImage, episodefilter[i].slug, episodefilter[i].title)
    result[i] = iresultSet;
  }
  res.writeHead(200, {'Content-Type':'application/json'});
  res.status(200);
  res.end(JSON.stringify(result));
  }

  if(!req.is('json') )
  {
    console.log("Error");
    res.status(400);
    res.end('error');
  }


  });
  }
