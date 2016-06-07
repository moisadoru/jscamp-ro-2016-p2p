var level = require('level-browserify')
var cali = require('hyperlog-calendar-index')
var hyperlog = require('hyperlog')
var through = require('through2')
var strftime = require('strftime')
var schedule = require('parse-messy-schedule')
var html = require('yo-yo')
var collect = require('collect-stream')
var wswarm = require('webrtc-swarm')

var log = hyperlog(level(argv.datadir + '/log.db'), { valueEncoding: 'json' })
var cal = cali({
  db: level(argv.datadir + '/cali.db'),
  log: log,
  map: function (row) { return row.value }
})

if (argv._[0] === 'add') {
  log.append({
    time: argv._.slice(1).join(' '),
    value: { title: argv.title }
  })
} else if (argv._[0] === 'sync') {
  process.stdin.pipe(log.replicate()).pipe(process.stdout)
} else {
  var first = schedule('the 1st')
  var q = cal.query({
    gt: strftime('%F', first.prev(new Date)),
    lt: strftime('%F', first.next(new Date))
  })
  q.pipe(through.obj(function (row, enc, next) {
    next(null,
      '% ' + row.key + '\n'
      + '# ' + strftime('%F %T', row.time) + '\n'
      + row.value.title + '\n\n')
  })).pipe(process.stdout)
}
