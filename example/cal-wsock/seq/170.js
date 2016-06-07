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
