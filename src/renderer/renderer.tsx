
// window.onresize = () => {
//     const container = document.getElementById('container') as HTMLDivElement
//     menu.style.left = container.offsetLeft + "px"
// }

// iframe.focus()

import ReactDOM from "react-dom/client"
import { App } from "./App"

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
)

root.render(
    <App />
)