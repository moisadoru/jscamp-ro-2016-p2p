var osmdb = require('osm-p2p')
var osm = osmdb('/tmp/map.db')

if (process.argv[2] === 'create') {
  var doc = JSON.parse(process.argv[3])
  osm.create(doc, function (err, key, node) {
    if (err) console.error(err)
    else console.log(key)
  })
}
