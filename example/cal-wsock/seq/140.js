function update () {
  return html.update(root, html`<div>
    <form onsubmit=${add}>
      <input type="text" name="time" placeholder="time">
      <input type="text" name="title" placeholder="title">
      <button type="submit">add</button>
    </form>
  </div>`)

  function add (ev) {
    ev.preventDefault()
    log.append({
      time: this.elements.time.value,
      value: { title: this.elements.title.value }
    }, onappend)
    function onappend (err) {
      ev.target.reset()
      list(state.time)
    }
  }
}
