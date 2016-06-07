// ...
// `add` command to append documents to the log

if (argv._[0] === 'add') {
  log.append({
    time: argv._.slice(1).join(' '),
    value: { title: argv.title }
  })
}
