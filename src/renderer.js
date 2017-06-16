const { ipcRenderer, shell } = require('electron')

const webview = document.querySelector('webview')

webview.addEventListener('new-window', event => {
  event.preventDefault()
  shell.openExternal(event.url)
})

// Log messages sent via ipcRenderer.sendToHost
webview.addEventListener('ipc-message', event => {
  console.log(event.channel)
})

// Focus the search bar in the article list
ipcRenderer.on('search', () => {
  webview.executeJavaScript('window.broadsheet.search()')
})
