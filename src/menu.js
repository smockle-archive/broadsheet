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
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
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
