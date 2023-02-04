import { ElectronFrame } from "electron-frame/renderer"

export const frame = new ElectronFrame({})

if (process.isMainFrame && process.platform !== "linux") {
    frame.insert()
}