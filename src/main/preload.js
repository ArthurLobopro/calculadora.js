const { ipcRenderer, contextBridge } = require('electron')
const { electronFrame } = require('electron-frame/renderer')

const getArgValue = arg => {
    const argString = process.argv.find(argvArg => argvArg.includes(arg))
    return argString.split("=")[1]
}

contextBridge.exposeInMainWorld('require', require)
contextBridge.exposeInMainWorld('appPath', getArgValue("--app-path"))
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)

document.addEventListener("DOMContentLoaded", () => {
    const isMain = location.href.search('index.html') !== -1

    if (isMain) {
        const imageLinks = document.querySelectorAll('ul > li > img')
        imageLinks.forEach(i => {
            i.onclick = event => {
                const href = event.target.dataset.href

                ipcRenderer.send('new-window', href)

            }
        })
    } else if (process.isMainFrame) {
        document.body.style.padding = "5px"
    }

    if (process.isMainFrame) {
        const frame = new electronFrame()
        frame.insert()
    }
})