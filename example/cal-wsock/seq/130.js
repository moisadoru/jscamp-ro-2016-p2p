var level = require('level-browserify')
var cali = require('hyperlog-calendar-index')
var hyperlog = require('hyperlog')

var log = hyperlog(level('log.d'), { valueEncoding: 'json' })
var cal = cali({ db: level('cali.db'), log: log })

var html = require('yo-yo')
var root = document.querySelector('#content')
var state = { time: new Date, events: [] }
