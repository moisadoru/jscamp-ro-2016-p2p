// ...

var wsock = require('websocket-stream')

  
function sync (ev) {
  ev.preventDefault()
  var stream = wsock(this.elements.wsock.value)
  var r = log.replicate()
  r.once('finish', function () { list(state.time) })
  stream.pipe(r).pipe(stream)
}
