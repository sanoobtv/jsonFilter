module.exports = function(app) {

  var bodyParser = require('body-parser');
  var isJSON = require('is-json');
  var jsonQuery = require('json-query');
  var oresultSet=require('./Model/resultSet.js');

  app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
//HomePage Rendering, a simple Form
/*app.get('/', function(req, res) {
  res.render('Index.ejs');
});
*/
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
    var drm = req.body.drm;
    var episodeCount = req.body.episodeCount;
    var data = req.body.data;

    if (err)
    {
    res.send({
      'status': 'Error!! Could not decode request: JSON parsing failed'
    });
    }

    if (isJSON(data))
    {
        console.log('valid json');
        var respon = getDataByDrm(data);
        var episodefilter = getDataByEp(respon)
        var result = [];

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
        {
         var iresultSet = new oresultSet(episodefilter[i].image.showImage, episodefilter[i].slug, episodefilter[i].title)
         result[i] = iresultSet;
        }

        res.send({
          'response': result,
          'status': 'Sucsess'
        });
    }

  else
  {
    res.send({
    'status':'Error!! Could not decode request: JSON parsing failed'
     });
  }


  });
  }
