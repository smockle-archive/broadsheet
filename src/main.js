const { app, ipcMain, Menu, BrowserWindow } = require('electron')

// Import window state memorizer
const windowStateKeeper = require('electron-window-state')

// Import /Applications mover
const { moveToApplications } = require('electron-lets-move')

// Import Menu template
const menuTemplate = require('./menu')

// Open devtools with CmdOrCtrl+Alt+I
require('electron-debug')({ showDevTools: false })

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null

app.on('ready', () => {
  // Load menu
  let appMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(appMenu)

  // Set default width & height
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1024,
    defaultHeight: 700
  })

  // Configure browser window
  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    titleBarStyle: 'hidden',
    vibrancy: 'light',
    minWidth: 300,
    minHeight: 150
  })

  // Remember window width & height
  mainWindowState.manage(mainWindow)

  // Load renderer
  mainWindow.loadURL(`file://${__dirname}/renderer.html`)

  // Prompt to move to /Applications
  if (process.env.NODE_ENV !== 'development') {
    moveToApplications()
  }

  // Ensure garbage collection occurs when window is closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// ipcMain.on('find', () => {
//   mainWindow.webContents.send('find')
// })
