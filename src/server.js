const { app, Menu, BrowserWindow } = require('electron')
const windowStateKeeper = require('electron-window-state')
const { moveToApplications } = require('electron-lets-move')
require('electron-debug')({ showDevTools: false })

let mainWindow
const menuTemplate = require('./menu')

function createWindow () {
  let appMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(appMenu)

  let mainWindowState = windowStateKeeper({
    defaultWidth: 1024,
    defaultHeight: 700
  })

  let win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    titleBarStyle: 'hidden',
    vibrancy: 'light',
    minWidth: 300,
    minHeight: 150
  })

  mainWindowState.manage(win)

  win.loadURL(`file://${__dirname}/index.html`)

  win.on('closed', () => {
    win = null
  })
  return win
}

app.on('ready', () => {
  mainWindow = createWindow()
  if (process.env.NODE_ENV !== 'development') {
    moveToApplications()
  }
})

app.on('activate', (event, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    createWindow()
  }
})
