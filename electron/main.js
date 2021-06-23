const { app, BrowserWindow } = require("electron")
const path = require("path")

require("./header-actions-main.js")

function mainWindow(){
    const win = new BrowserWindow({
        frame: false,
        width: 315,
        minWidth: 315,
        height: 485,
        minHeight: 485,
        resizable: false,
        maximizable: false,
        icon: path.join(__dirname,"../assets/icon.png"),
        webPreferences:{
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    })
    //win.setMenu(null)
    win.setMenuBarVisibility(false)
    win.loadFile("index.html")
}

function createWindow(href){
    const win = new BrowserWindow({
        frame: false,
        width: 315,
        minWidth: 315,
        height: 456,
        minHeight: 456,
        resizable: false,
        maximizable: false,
        icon: path.join(__dirname,"../assets/icon.png"),
        webPreferences:{
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    })
    win.setMenuBarVisibility(false)
    win.loadFile(path.join(__dirname ,'../', href))
}

app.whenReady().then(mainWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow()
    }
})

// Faz com que o programa não inicie várias vezes durante a instalação
if (require('electron-squirrel-startup')){
    return app.quit();
}