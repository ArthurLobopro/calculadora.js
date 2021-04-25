const { ipcMain, BrowserWindow } = require("electron")

function setWindowActions(){
    ipcMain.on('minimize',(event,arg)=>{
        const win = BrowserWindow.getFocusedWindow()
        win.minimize()
    })
    
    ipcMain.on('expand', (event,arg) => {
        const win = BrowserWindow.getFocusedWindow()
        if(win.isMaximizable === true){
            if(win.isMaximized()){
                win.restore()
            }else{
                win.maximize()
            }
        }else{
            win.center()
        }
    })
    
    ipcMain.on('close',(event,arg) => {
        const win = BrowserWindow.getFocusedWindow()
        win.close()
    })
}

module.exports = setWindowActions()