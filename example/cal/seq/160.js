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
  // ^^^ create a query with the current month
  // ...
}
