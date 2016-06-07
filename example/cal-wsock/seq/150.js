function update () {
  return html.update(root, html`<div>
    <form onsubmit=${add}>
      <!-- ... -->
    </form>
    <div>
      ${state.events.map(function (ev) {
        return html`<div>
          <div>% ${ev.key.slice(0,8)}</div>
          <div># ${strftime('%F %T', ev.time)}</div>
          <div>${ev.value.title}</div>
        </div>`
      })}
    </div>
  </div>`)

  function add (ev) {
    // ...
  }
}
