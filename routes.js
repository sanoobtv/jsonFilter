module.exports = function(app) {

  var bodyParser = require('body-parser');
  var isJSON = require('is-valid-json');
  var jsonQuery = require('json-query');
  var oresultSet=require('./Model/resultSet.js');
  var methodOverride = require('method-override')



  function safelyParseJSON (json) {
    // This function cannot be optimised, it's best to
    // keep it small!
    var parsed

    try {
      parsed = JSON.parse(json)
    } catch (e) {
      // Oh well, but whatever...
      parsed = json;
    }

    return parsed // Could be undefined!
  }


  app.use(bodyParser.json());

  //Express Error handling.
  app.use(errorHandler);
  //app.use(logErrors)
  //app.use(clientErrorHandler)

  //Invalid Json request Error Handling
  function errorHandler (err, req, res, next) {
    res.status(400).send({ error: 'Could not decode request' })
  }

app.post('/', (req, res ,err) => {

if (req.body.payload) {
  var data = req.body.payload;
  console.log("input data is JSON");
  if (isJSON(data)) {
    console.log('valid json');
    var respon = getDataByDrm(safelyParseJSON(data));
    var episodefilter = getDataByEp(respon);
    var result = [];


    function getDataByDrm(jdata) {
      console.log("1function");

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
      console.log("loop");
      var iresultSet = new oresultSet(episodefilter[i].image.showImage, episodefilter[i].slug, episodefilter[i].title)
      result[i] = iresultSet;
    }


    console.log('return data');
   res.status = 200;
   res.type='json';
   res.json({ 'response': result });
   res.end();
//return res;
    //res.status(200);



  }
}
  });

  }
