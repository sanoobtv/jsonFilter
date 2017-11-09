var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
//var http = require('http');

//app.set('views', __dirname + '/Views');
//app.set('view engine','ejs');

require('./routes.js')(app);

//var server = http.createServer(function(req,res){

//if(req.url === '/')
//console.log("request - > "+ req.body);
/*{

var payload = req.body.payload;
if (isJSON(payload))
{
console.log('valid json');
var respon = getDataByDrm(payload);
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
for (var i = 0; i < episodefilter.length; i++) {
var iresultSet = new oresultSet(episodefilter[i].image.showImage, episodefilter[i].slug, episodefilter[i].title)
result[i] = iresultSet;
}*/
//res.writeHead(200, {'Content-Type':'application/json'});
//es.end(JSON.stringify(result));
//}

//}
//});
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
