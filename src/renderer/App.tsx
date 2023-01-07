import { useRef, useState } from "react"
import { assetsPath } from "../Util"
import { resolve } from "path"
import { ipcRenderer } from "electron"
import { BasesCalculator } from "../calculators/bases"

const Links = [
    {
        name: "Padrão",
        path: "padrao/padrao.html"
    },
    {
        name: "Bases",
        path: "bases/bases.html",
        component: BasesCalculator
    },
    {
        name: "Eq. 2º Grau",
        path: "equacao/equacao.html"
    },
    {
        name: "Data",
        path: "data/data.html"
    },
    {
        name: "Tempo",
        path: "time/time.html"
    },
    {
        name: "PA",
        path: "pa/index.html"
    },
    {
        name: "PG",
        path: "pg/index.html"
    }
]

export function App() {
    const isLock = useRef(false)
    const menu = useRef(null as unknown as HTMLDivElement)
    const iframe = useRef(null as unknown as HTMLIFrameElement)

    async function handleChangeLoaded(path: string) {
        handleMenuExpandClick()
        iframe.current.src = resolve(__dirname, `../calculators/${path}`)
    }

    async function handleMenuExpandClick() {
        if (isLock.current) { return null }

        isLock.current = true
        setTimeout(() => isLock.current = false, 1000)

        return new Promise(resolve => {
            const fundo = document.getElementById('fundo-invisivel') as HTMLDivElement
            if (fundo.classList.contains('visible')) {
                menu.current?.classList.toggle('visible')
                setTimeout(() => {
                    window.onclick = null
                    fundo.classList.toggle('visible')
                    resolve(true)
                }, 550)
            } else {
                fundo.classList.toggle('visible')
                menu.current.onmouseenter = () => window.onclick = null
                menu.current.onmouseleave = () => {
                    window.onclick = () => {
                        handleMenuExpandClick()
                        window.onclick = null
                    }
                }
                setTimeout(() => {
                    menu.current?.classList.toggle('visible')
                    isLock.current = false
                    resolve(true)
                }, 100)
            }
        })
    }

    const [content, setContent] = useState(<BasesCalculator />)

    return (
        <>
            <header>
                <div>
                    <div id="menu-expand" onClick={handleMenuExpandClick}>
                        <img src={resolve(assetsPath, "menu.png")} width={30} />
                    </div>
                    <span id="calculator-name">Padrão</span>
                </div>
                <AlwaysOnTop />
            </header>

            <div id="fundo-invisivel">
                <div id="menu" ref={menu}>
                    <ul>
                        {Links.map(link => (
                            <li
                                data-src={resolve(__dirname, `../calculators/${link.path}`)} key={link.path}
                                onClick={() => handleChangeLoaded(link.path)}
                            >
                                {link.name}
                                <img
                                    src={resolve(assetsPath, "hyperlink.png")} data-href={link.path}
                                    onClick={e => {
                                        e.stopPropagation()
                                        ipcRenderer.send('new-window', link.path)
                                        handleMenuExpandClick()
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* <iframe ref={iframe} src={resolve(__dirname, `../calculators/${Links[0].path}`)}></iframe> */}
            {content}
        </>
    )
}

function AlwaysOnTop() {
    const toggleAlwaysOnTop = () => {
        const isAlwaysOnTop = ipcRenderer.sendSync("toggle-alwaysOnTop")
        setImgSrc(resolve(assetsPath, `alwaysOnTop-${isAlwaysOnTop}.svg`))
        setTitle(!isAlwaysOnTop ? "Fixar janela no topo." : "Desfixar janela do topo.")
    }

    const [title, setTitle] = useState("Fixar janela no topo.")
    const [imgSrc, setImgSrc] = useState(resolve(assetsPath, "alwaysOnTop-false.svg"))

    return (
        <div id="toggleAlwaysOnTop" title={title} onClick={toggleAlwaysOnTop}>
            <img src={resolve(assetsPath, imgSrc)} />
        </div>
    )
}