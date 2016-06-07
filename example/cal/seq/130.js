var level = require('level')
var cali = require('hyperlog-calendar-index')
var hyperlog = require('hyperlog')


var minimist = require('minimist')
var argv = minimist(process.argv.slice(2), {
  alias: { t: 'title', d: 'datadir' }
})

var log = hyperlog(level(argv.datadir + '/log.db'), { valueEncoding: 'json' })
var cal = cali({
  db: level(argv.datadir + '/cali.db'),
  log: log,
  map: function (row) { return row.value }
})
// ^^^ and also a hyperlog calendar index
