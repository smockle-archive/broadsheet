const { ipcRenderer } = require('electron')

const webview = document.querySelector('webview')

// Inject CSS into <webview>
// webview.addEventListener('dom-ready', () => {
//   webview.insertCSS(
//     fs.readFileSync(path.resolve(`${__dirname}/renderer.css`), 'utf8')
//   )
// })

// Log messages sent via ipcRenderer.sendToHost
webview.addEventListener('ipc-message', event => {
  console.log(event.channel)
})

// Focus the search bar in the article list
ipcRenderer.on('search', () => {
  webview.executeJavaScript('window.broadsheet.search()')
})
