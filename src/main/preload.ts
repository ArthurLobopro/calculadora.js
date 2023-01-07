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
        const imageLinks = document.querySelectorAll('ul > li > img') as NodeListOf<HTMLImageElement>
        imageLinks.forEach(i => {
            i.onclick = (event: MouseEvent) => {
                const href = (event.currentTarget as HTMLElement).dataset?.href

                ipcRenderer.send('new-window', href)

            }
        })
    } else if (process.isMainFrame) {
        document.body.style.padding = "5px"
    }

    if (process.isMainFrame && process.platform !== "linux") {
        const frame = new ElectronFrame({})
        frame.insert()
    }

    require("../renderer/renderer.js")
})