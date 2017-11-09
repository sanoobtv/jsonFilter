module.exports = function(app) {

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
}
