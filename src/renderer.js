const { ipcRenderer, shell } = require('electron')

const broadsheet = document.getElementById('broadsheet')

broadsheet.addEventListener('new-window', event => {
  event.preventDefault()
  shell.openExternal(event.url)
})

ipcRenderer.on('find', () => {
  const searchbar = document.getElementById('search_box')
  console.log(searchbar)
  if (searchbar && typeof searchbar.focus === 'function') {
    searchbar.focus()
  }
})
