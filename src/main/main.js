const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")

require('electron-frame/main')

const appPath = app.getAppPath()
const calculatorsFolder = path.resolve(__dirname, '../calculators')

function mainWindow() {
    const win = new BrowserWindow({
        frame: false,
        width: 315,
        minWidth: 315,
        height: 490,
        minHeight: 490,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        icon: path.resolve(appPath, "assets/icon.png"),
        webPreferences: {
            nodeIntegration: true,
            preload: path.resolve(__dirname, "preload.js"),
            nodeIntegrationInSubFrames: true
        }
    })

    win.loadFile("index.html")
}

function createWindow(href) {
    const win = new BrowserWindow({
        frame: false,
        width: 315,
        minWidth: 315,
        height: 465,
        minHeight: 465,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        icon: path.resolve(appPath, "assets/icon.png"),
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    })

    win.loadFile(path.resolve(calculatorsFolder, href))
}

const calculators = {
    "--bases": () => createWindow("bases/bases.html"),
    "--data": () => createWindow("data/data.html"),
    "--equacao": () => createWindow("equacao/equacao.html"),
    "--padrao": () => createWindow("padrao/padrao.html"),
    "--time": () => createWindow("time/time.html")
}

app.setJumpList([
    {
        name: "Calculadoras",
        type: "custom",
        items: [
            {
                type: "task",
                program: process.execPath,
                args: ". --bases",
                iconPath: path.resolve(appPath, "assets/binary.png"),
                iconIndex: 0,
                title: 'Bases',
                description: 'Calculadora de bases decimais'
            },
            {
                type: "task",
                program: process.execPath,
                args: ". --data",
                title: 'Data',
                description: 'Calculadora de Data'
            },
            {
                type: "task",
                program: process.execPath,
                args: ". --equacao",
                title: 'Eq. de 2° Grau',
                description: 'Calculadora de equação de 2° grau'
            },
            {
                type: "task",
                program: process.execPath,
                args: ". --padrao",
                title: 'Padrão',
                description: 'Calculadora Padrão'
            },
            {
                type: "task",
                program: process.execPath,
                args: ". --time",
                title: 'Tempo',
                description: 'Calculadora de Tempo'
            }
        ]
    }
])

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

// Faz com que o programa não inicie várias vezes durante a instalação
if (require('electron-squirrel-startup')) {
    app.quit();
}