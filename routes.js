module.exports = function(app) {

  var bodyParser = require('body-parser');
  //var isJSON = require('is-json');
  var isJSON = require('is-valid-json');
  var jsonQuery = require('json-query');
  var oresultSet=require('./Model/resultSet.js');

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json({ type: 'application/json' }));
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
   if(err)
   {
     //console.log(err);
   }

console.log(req);
console.log(req.headers['content-type']);
if(req.body.payload)
{
  var data=req.body.payload;
  console.log("input data is JSON");
    if (isJSON(data))
    {
    console.log('valid json');

    var respon = getDataByDrm(data);
    var episodefilter = getDataByEp(respon)
    var result = [];

    function getDataByDrm(data) {
      console.log("1function");
      console.log("!!!!!!!!!!!!!!!!!!!!");
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

      //console.log('Before: ' + badJSON);
      //console.log('After: ' + fixedJSON);
      //console.log(JSON.parse(fixedJSON));

      console.log("!!!!!!!!!!!!!!!!!!!!");

      var jdata = JSON.parse(fixedJSON);
      var drm = true;
      return jdata.filter(
        function(jdata) {
          return jdata.drm == drm;
        });
    }

    function getDataByEp(jrespon) {
      console.log("2function");
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
  res.writeHead(200, {'Content-Type':'application/json'});
  res.status(200);
  res.end(JSON.stringify(result));

}
}
  });

  app.all('*', function(req, res) {
      throw new Error("Bad request")
  })

/*  app.use(function(e, req, res, next) {
    if (e.message === "Bad request") {
        res.status(400).json({error: {msg: e.message, stack: e.stack}});
    }
});*/

  }
