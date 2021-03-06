const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")
const { setWindowsJumplist } = require("./windows-actions.js")

require('electron-frame/main')

const appPath = app.getAppPath()
const calculatorsFolder = path.resolve(__dirname, '../calculators')

const isWindows = process.platform === "win32"
const isLinux = process.platform === "linux"

const defaultConfig = {
    frame: false,
    maximizable: false,
    fullscreenable: false,
}

const linuxConfig = {
    frame: true,
    autoHideMenuBar: true,
}

function mainWindow() {
    const win = new BrowserWindow({
        width: 315,
        minWidth: 315,
        height: 490,
        minHeight: 490,
        resizable: false,
        icon: path.resolve(appPath, "assets/icon.png"),
        webPreferences: {
            nodeIntegration: true,
            preload: path.resolve(__dirname, "preload.js"),
            nodeIntegrationInSubFrames: true
        },
        ...(isLinux ? linuxConfig : defaultConfig)
    })

    win.loadFile("index.html")
}

function createWindow(href) {
    const win = new BrowserWindow({
        width: 315,
        minWidth: 315,
        height: 465,
        minHeight: 465,
        resizable: false,
        icon: path.resolve(appPath, "assets/icon.png"),
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        },
        ...(isLinux ? linuxConfig : defaultConfig)
    })

    win.loadFile(path.resolve(calculatorsFolder, href))
}

const calculators = {
    "--bases": () => createWindow("bases/bases.html"),
    "--data": () => createWindow("data/data.html"),
    "--equacao": () => createWindow("equacao/equacao.html"),
    "--padrao": () => createWindow("padrao/padrao.html"),
    "--time": () => createWindow("time/time.html"),
    "--pa": () => createWindow("pa/index.html"),
    "--pg": () => createWindow("pg/index.html"),
}

if (isWindows) {
    setWindowsJumplist()
}

app.whenReady().then(
    () => {
        const args = process.argv

        for (const arg of args) {
            if (calculators[arg]) {
                calculators[arg]()
                return
            }
        }

        mainWindow()
    }
)

ipcMain.on('request-app-path', (event) => {
    event.returnValue = appPath
})

ipcMain.on('toggle-alwaysOnTop', (event) => {
    const win = BrowserWindow.getFocusedWindow()
    const isAlwaysOnTop = win.isAlwaysOnTop()
    win.setAlwaysOnTop(!isAlwaysOnTop)
    event.returnValue = !isAlwaysOnTop
})

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

ipcMain.on('new-window', (event, arg) => {
    createWindow(arg)
})

// Faz com que o programa n??o inicie v??rias vezes durante a instala????o
if (require('electron-squirrel-startup')) {
    app.quit();
}