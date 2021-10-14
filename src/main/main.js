const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")

require('electron-frame/main')

const appPath = app.getAppPath()
const calculatorsFolder = path.resolve(__dirname, '../calculators')

function mainWindow(){
    const win = new BrowserWindow({
        frame: false,
        width: 315,
        minWidth: 315,
        height: 490,
        minHeight: 490,
        resizable: false,
        maximizable: false,
        icon: path.resolve(appPath,"assets/icon.png"),
        webPreferences:{
            nodeIntegration: true,
            preload: path.resolve(__dirname, "preload.js")
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
        height: 465,
        minHeight: 465,
        resizable: false,
        maximizable: false,
        icon: path.resolve(appPath,"assets/icon.png"),
        webPreferences:{
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    })
    win.setMenuBarVisibility(false)
    win.loadFile(path.resolve(calculatorsFolder, href))
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

//ipcMain

ipcMain.on('new-window', (event,arg) => {
    createWindow(arg)
})

// Faz com que o programa não inicie várias vezes durante a instalação
if (require('electron-squirrel-startup')){
    app.quit();
}