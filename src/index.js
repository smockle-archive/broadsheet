const fs = require('fs')
const path = require('path')
const { shell } = require('electron')

const broadsheet = document.getElementById('broadsheet')

broadsheet.addEventListener('dom-ready', () => {
  broadsheet.insertCSS(
    fs.readFileSync(path.join(__dirname, '/index.css'), 'utf8')
  )
})

broadsheet.addEventListener('new-window', event => {
  event.preventDefault()
  shell.openExternal(event.url)
})
