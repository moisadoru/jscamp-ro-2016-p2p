// ...

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
  // ^^^ format output
}
