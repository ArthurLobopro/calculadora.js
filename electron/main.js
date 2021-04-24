const { app, BrowserWindow } = require("electron")

function mainWindow(){
    const win = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true
        }
    })
    win.loadFile("index.html")
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