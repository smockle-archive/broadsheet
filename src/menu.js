const { ipcMain } = require('electron')

module.exports = [
  {
    label: 'Broadsheet',
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'File',
    submenu: [
      {
        label: 'Open in Browser',
        accelerator: 'O',
        click: (_, mainWindow) => {
          mainWindow.webContents.send('open')
          // ipcMain.emit('open')
        }
      }
    ]
  },
  {
    role: 'editMenu',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectall' },
      { type: 'separator' },
      {
        label: 'Find',
        submenu: [
          {
            label: 'Find…',
            accelerator: 'CmdOrCtrl+F',
            click: (_, mainWindow) => {
              mainWindow.webContents.send('search')
              // ipcMain.emit('search')
            }
          }
        ]
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'History',
    submenu: [
      {
        label: 'Back',
        accelerator: 'CmdOrCtrl+[',
        click: (_, mainWindow) => {
          mainWindow.webContents.send('go-back')
        }
      },
      {
        label: 'Forward',
        accelerator: 'CmdOrCtrl+]',
        click: (_, mainWindow) => {
          mainWindow.webContents.send('go-forward')
        }
      },
      {
        label: 'Home',
        accelerator: 'Shift+CmdOrCtrl+H',
        click: (_, mainWindow) => {
          mainWindow.webContents.send('go-home')
        }
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' },
      { type: 'separator' },
      { role: 'front' }
    ]
  }
]
