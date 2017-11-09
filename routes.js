module.exports = function(app) {

  var bodyParser = require('body-parser');
  var isJSON = require('is-valid-json');
  var oresultSet = require('./Model/resultSet.js');
  var methodOverride = require('method-override')



  function safelyParseJSON(json) {
    //Just to make sure before parsing if its JSON or String
    var parsed

    try {
      parsed = JSON.parse(json)
    } catch (e) {
      parsed = json;
    }
  return parsed
  }

  app.use(bodyParser.json());

  //Express Error handling.
  app.use(errorHandler);

  function errorHandler(err, req, res, next) {
    res.status(400).send({
      error: 'Could not decode request'
    })
  }

  app.post('/', (req, res, err) => {


    var data = req.body.payload;
    //just double checking data send through postman
    if (isJSON(data)) {
      //first function to filter Json by DRM
      var respon = getDataByDrm(safelyParseJSON(data));
      //Second function to further filter by Episode Count
      var episodefilter = getDataByEp(respon);
      var result = [];

      //use Array.Prototype.Filter to filter Data
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
      // Storing result in to an Model resultset, then to an array
      for (var i = 0; i < episodefilter.length; i++) {
        var iresultSet = new oresultSet(episodefilter[i].image.showImage, episodefilter[i].slug, episodefilter[i].title)
        result[i] = iresultSet;
      }
      //sucsess with 200 and response
      res.status(200).send({
        response: result
      });

    }
  });

}
