const { app, BrowserWindow, globalShortcut } = require('electron')
// const path = require('path')
const config = require('./config')

let win;

function createWindow () {
    win = new BrowserWindow({
    width: 800,
    height: 600,
    // titleBarStyle: "hidden",
    autoHideMenuBar: "hidden",
    alwaysOnTop: true,
    webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    }
  })
    //   Minha LocalHost -> http:localhost:5501/
    //   Pode usar qualquer url
    //   win.loadURL('https://youtu.be/nznujk__7sQ')
    win.loadURL(config.url)

}
function toggleDevTools() {
    win.webContents.toggleDevTools()
}

function createShortcuts() {
    // criando atalho com o electron
    globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
}

app.whenReady()
.then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
// Chamando a funcao do atalho
.then(createShortcuts)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})