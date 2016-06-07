// ...

var wswarm = require('websocket-stream')
var signalhub = require('signalhub')

function sync (ev) {
  ev.preventDefault()
  var swarm = wswarm(signalhub(this.elements.swarm.value, hubs))
  swarm.on('peer', function (peer, id) {
    var r = log.replicate({ live: true })
    peer.pipe(r).pipe(peer)
  })
}
