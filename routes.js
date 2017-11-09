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

  function fixJson(data)
  {
  var badJSON = JSON.stringify(data);

  var fixedJSON = badJSON

    // Replace ":" with "@colon@" if it's between double-quotes
    .replace(/:\s*"([^"]*)"/g, function(match, p1) {
      return ': "' + p1.replace(/:/g, '@colon@') + '"';
    })

    // Replace ":" with "@colon@" if it's between single-quotes
    .replace(/:\s*'([^']*)'/g, function(match, p1) {
      return ': "' + p1.replace(/:/g, '@colon@') + '"';
    })

    // Add double-quotes around any tokens before the remaining ":"
    .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')

    // Turn "@colon@" back into ":"
    .replace(/@colon@/g, ':')
  ;

  return (fixedJSON);
  }





//  app.use(bodyParser.urlencoded({    extended: true  }));

  app.use(bodyParser.json());
  app.use(errorHandler);
  app.use(logErrors)
  app.use(clientErrorHandler)

  function errorHandler (err, req, res, next) {
    res.status = 400;
    res.type='json';
    res.json({
          'error': 'error'
        });
    res.end();

}

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}


  //HomePage Rendering, a simple Form
/* app.get('/Home', function(req, res) {
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
  });*/

app.post('/', (req, res ,err) => {

if (req.body.payload) {
  var data = req.body.payload;
  console.log("input data is JSON");
  if (isJSON(data)) {
    console.log('valid json');
    var respon = getDataByDrm(safelyParseJSON(data));
    var episodefilter = getDataByEp(respon);
    var result = [];
    data = fixJson(data);

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

    //res.writeHead(200, {  'Content-Type': 'application/json' });
res.status = 200;
res.type='json';
res.json({
      'response': result
    });
res.end();
return res;
    //res.status(200);



  }
}
  });

  }
