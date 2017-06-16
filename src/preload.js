const { ipcRenderer } = require('electron')
// Redefine console.log to use ipcRenderer.sendToHost
const console = {
  log: function () {
    ipcRenderer.sendToHost(Array.from(arguments).join(' '))
  }
}

function Broadsheet () {
  const broadsheet = Object.create(Broadsheet.prototype)
  return broadsheet
}

// Focus the search bar in the article list
Broadsheet.prototype.search = function () {
  const input = document.getElementById('searcher')
  if (input && typeof input.focus === 'function') {
    input.focus()
  }
}

window.broadsheet = Broadsheet()
