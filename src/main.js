const { app, Menu, BrowserWindow } = require('electron')

// Import window state memorizer.
const windowStateKeeper = require('electron-window-state')

// Import /Applications mover.
const { moveToApplications } = require('electron-lets-move')

// Import Menu template.
const menuTemplate = require('./menu')

// Open devtools with CmdOrCtrl+Alt+I.
require('electron-debug')({ showDevTools: false })

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null

function createWindow () {
  // Load menu.
  let appMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(appMenu)

  // Set default width & height.
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1024,
    defaultHeight: 700
  })

  // Create the browser window.
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

  // Remember window width & height.
  mainWindowState.manage(mainWindow)

  // Load renderer.
  mainWindow.loadURL(`file://${__dirname}/renderer.html`)

  // Prompt to move to /Applications.
  if (process.env.NODE_ENV !== 'development') {
    moveToApplications()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// ipcMain.on('search', () => {
//   mainWindow.webContents.send('search')
// })
