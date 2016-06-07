var schedule = require('parse-messy-schedule')
var ev = schedule('every thursday', { now: Date.now() })
var t
for (var i = 0; i < 10; i++) {
  t = ev.next(t)
  console.log(t)
}
