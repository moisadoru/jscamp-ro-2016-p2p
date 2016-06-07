function update () {
  return html.update(root, html`<div>
    <form onsubmit=${add}>
      <!-- ... -->
    </form>
    <form onsubmit=${sync}>
      <input type="text" name="wsock" value="ws://${location.host}">
      <button type="submit">sync</button>
    </form>
    <div>
      <!-- ... -->
    </div>
  </div>`)

  function add (ev) {
    // ...
  }
  function sync (ev) {
    ev.preventDefault()
    var stream = wsock(this.elements.wsock.value)
    var r = log.replicate()
    r.once('finish', function () { list(state.time) })
    stream.pipe(r).pipe(stream)
  }
}
