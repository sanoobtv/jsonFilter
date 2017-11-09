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


  var data = req.body.payload;

  if (isJSON(data)) {

    var respon = getDataByDrm(safelyParseJSON(data));
    var episodefilter = getDataByEp(respon);
    var result = [];


    function getDataByDrm(jdata) {
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
res.status(200).send({ response: result });
  
}
  });

  }
