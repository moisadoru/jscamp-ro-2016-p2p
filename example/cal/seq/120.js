var level = require('level')
var cali = require('hyperlog-calendar-index')
var hyperlog = require('hyperlog')


var minimist = require('minimist')
var argv = minimist(process.argv.slice(2), {
  alias: { t: 'title', d: 'datadir' }
})
// now we can create a hyperlog:
var log = hyperlog(level(argv.datadir + '/log.db'), { valueEncoding: 'json' })
