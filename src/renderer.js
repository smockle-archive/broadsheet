const { ipcRenderer, shell } = require('electron')

const broadsheet = document.getElementById('broadsheet')

broadsheet.addEventListener('new-window', event => {
  event.preventDefault()
  shell.openExternal(event.url)
})

ipcRenderer.on('find', () => {
  console.log('ipcRenderer.find')
})
