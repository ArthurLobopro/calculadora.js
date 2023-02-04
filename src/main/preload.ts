import { contextBridge } from 'electron'

const getArgValue = (arg: string) => {
    const argString = process.argv.find(argvArg => argvArg.includes(arg)) as string
    return argString.split("=")[1]
}

contextBridge.exposeInMainWorld('require', require)
contextBridge.exposeInMainWorld('appPath', getArgValue("--app-path"))

document.addEventListener("DOMContentLoaded", () => {
    require("../renderer/renderer.js")
})