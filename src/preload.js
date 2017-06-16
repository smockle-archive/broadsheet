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
  console.log(document.activeElement)
}

// Get origin URL
Broadsheet.prototype.getOriginURL = function () {
  const original = document.querySelector('main a.original')
  if (original) {
    return original.href
  }
}

window.broadsheet = Broadsheet()
