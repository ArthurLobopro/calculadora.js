// import { ipcRenderer } from "electron"

// const iframe = document.querySelector('iframe') as HTMLIFrameElement
// const nameDiv = document.getElementById('calculator-name') as HTMLDivElement

// const menuExpand = document.querySelector('#container #menu-expand') as HTMLDivElement

// const buttons = document.querySelectorAll('ul > li') as NodeListOf<HTMLLIElement>
// buttons.forEach(e => {
//     e.onclick = (event: MouseEvent) => {
//         const target = event.currentTarget as HTMLElement
//         if (target.tagName === 'IMG') return
//         const src = target.dataset.src as string

//         if (iframe.src !== src) iframe.src = src

//         menuExpand.click()
//         iframe.focus()

//         nameDiv.innerText = String(target.textContent).trim()
//     }
// })

// const menu = document.getElementById('menu') as HTMLDivElement

// let isLock = false



// const toggleAlwaysOnTop_button = document.getElementById("toggleAlwaysOnTop") as HTMLButtonElement
// const toggleAlwaysOnTop_image = toggleAlwaysOnTop_button.querySelector("img") as HTMLImageElement
// const toggleAlwaysOnTop = () => {
//     const isAlwaysOnTop = ipcRenderer.sendSync("toggle-alwaysOnTop")
//     toggleAlwaysOnTop_image.src = `./assets/alwaysOnTop-${isAlwaysOnTop}.svg`
//     toggleAlwaysOnTop_button.title = !isAlwaysOnTop ? "Fixar janela no topo." : "Desfixar janela do topo."
// }

// toggleAlwaysOnTop_button.onclick = toggleAlwaysOnTop

// window.onresize = () => {
//     const container = document.getElementById('container') as HTMLDivElement
//     menu.style.left = container.offsetLeft + "px"
// }

// iframe.focus()

import ReactDOM from "react-dom/client"
import { App } from "./App"

const root = ReactDOM.createRoot(
    document.getElementById("container") as HTMLElement
)

root.render(
    <App />
)