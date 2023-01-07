import { ipcRenderer, contextBridge } from 'electron'
import { ElectronFrame } from 'electron-frame/renderer'

const getArgValue = (arg: string) => {
    const argString = process.argv.find(argvArg => argvArg.includes(arg)) as string
    return argString.split("=")[1]
}

contextBridge.exposeInMainWorld('require', require)
contextBridge.exposeInMainWorld('appPath', getArgValue("--app-path"))
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)

document.addEventListener("DOMContentLoaded", () => {
    const isMain = location.href.search('index.html') !== -1

    if (isMain) {
        require("../renderer/renderer.js")
    } else if (process.isMainFrame) {
        document.body.style.padding = "5px"
    }

    if (process.isMainFrame && process.platform !== "linux") {
        const frame = new ElectronFrame({})
        frame.insert()
    }
})