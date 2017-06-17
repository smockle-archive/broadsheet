const { shell, ipcRenderer } = require('electron')
const debounce = require('lodash.debounce')

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

// If possible, navigate back.
function goBack () {
  if (webview.canGoBack()) {
    webview.stop()
    webview.goBack()
  }
}

// If possible, navigate forward.
function goForward () {
  if (webview.canGoForward()) {
    webview.stop()
    webview.goForward()
  }
}

// If possible, navigate to the index (webview.src)
function goHome () {
  webview.stop()
  webview.goToIndex(0)
}

// Handle wheel event.
const onwheel = debounce(
  event => {
    if (!event) {
      return
    }
    if ((event.deltaX || 0) < 0 && window.scrollX === 0) {
      // Swipe left-to-right.
      goBack()
    } else if ((event.deltaX || 0) > 0 && window.scrollX === 0) {
      // Swipe right-to-left.
      goForward()
    }
  },
  100,
  {
    leading: true,
    trailing: false
  }
)
webview.addEventListener('wheel', onwheel)
ipcRenderer.on('go-back', goBack)
ipcRenderer.on('go-forward', goForward)
ipcRenderer.on('go-home', goHome)

// Focus the search bar in the article list
ipcRenderer.on('search', () => {
  webview.executeJavaScript('window.broadsheet.search()')
})

// Open in browser
ipcRenderer.on('open', () => {
  webview.executeJavaScript(
    'window.broadsheet.getOriginURL()',
    false,
    result => {
      if (result) {
        shell.openExternal(result)
      }
    }
  )
})
