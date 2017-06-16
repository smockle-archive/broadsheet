const { shell } = require('electron')

const broadsheet = document.getElementById('broadsheet')

broadsheet.addEventListener('new-window', event => {
  event.preventDefault()
  shell.openExternal(event.url)
})
