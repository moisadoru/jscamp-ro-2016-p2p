var level = require('level-browserify')
var cali = require('hyperlog-calendar-index')
var hyperlog = require('hyperlog')
var through = require('through2')
var strftime = require('strftime')
var schedule = require('parse-messy-schedule')
var html = require('yo-yo')
var collect = require('collect-stream')
var wswarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var hubs = ['https://signalhub.mafintosh.com']

var root = document.querySelector('#content')
var state = { time: new Date, events: [] }

var log = hyperlog(level('log.d'), { valueEncoding: 'json' })
var cal = cali({ db: level('cali.db'), log: log })
update()
list(state.time)
log.on('add', function () { list(state.time) })

function update () {
  return html.update(root, html`<div>
    <form onsubmit=${add}>
      <input type="text" name="time" placeholder="time">
      <input type="text" name="title" placeholder="title">
      <button type="submit">add</button>
    </form>
    <form onsubmit=${sync}>
      <input type="text" name="swarm" value="cal-test">
      <button type="submit">sync</button>
    </form>
    <div>
      ${state.events.map(function (ev) {
        return html`<div>
          <div>% ${ev.key.slice(0,8)}</div>
          <div># ${strftime('%F %T', ev.time)}</div>
          <div>${ev.value.title}</div>
        </div>`
      })}
    </div>
  </div>`)

  function add (ev) {
    ev.preventDefault()
    log.append({
      time: this.elements.time.value,
      value: { title: this.elements.title.value }
    }, onappend)
    function onappend (err) {
      ev.target.reset()
      list(state.time)
    }
  }
  function sync (ev) {
    ev.preventDefault()
    var swarm = wswarm(signalhub(this.elements.swarm.value, hubs))
    swarm.on('peer', function (peer, id) {
      var r = log.replicate({ live: true })
      peer.pipe(r).pipe(peer)
    })
  }
}

function list (time) {
  var first = schedule('the 1st')
  var q = cal.query({
    gt: strftime('%F', first.prev(time)),
    lt: strftime('%F', first.next(time))
  })
  collect(q, function (err, docs) {
    if (err) console.error(err)
    state.events = docs
    update()
  })
}
