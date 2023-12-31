import { ElectronFrame } from "electron-frame"

const isLinux = process.platform === "linux"

const frame = new ElectronFrame({
    autoInsert: !isLinux
})

const frameToExport = !isLinux ? frame : { update() { } }

export { frameToExport as frame }
