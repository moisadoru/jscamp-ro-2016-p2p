var level = require('level')
var cali = require('hyperlog-calendar-index')
var hyperlog = require('hyperlog')

// we'll also need some arguments:
var minimist = require('minimist')
var argv = minimist(process.argv.slice(2), {
  alias: { t: 'title', d: 'datadir' }
})
