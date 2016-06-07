var osmdb = require('osm-p2p')
var osm = osmdb('/tmp/map.db')

if (process.argv[2] === 'create') {
  var doc = JSON.parse(process.argv[3])
  osm.create(doc, function (err, key, node) {
    if (err) console.error(err)
    else console.log(key)
  })
} else if (process.argv[2] === 'query') {
  var q = process.argv.slice(3).map(csplit)
  osm.query(q, function (err, pts) {
    if (err) console.error(err)
    else pts.forEach(function (pt) {
      console.log(pt)
    })
  })
}

function csplit (x) { return x.split(',').map(Number) }
