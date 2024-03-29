import { ipcRenderer } from "electron"
import { resolve } from "path"
import { useRef, useState } from "react"
import { assetsPath } from "../../Util"
import { BasesCalculator } from "./bases"
import { DataCalculator } from "./data"
import { EquationCalculator } from "./equacao"
import { PACalculator } from "./pa"
import { DefaultCalculator } from "./padrao"
import { PGCalculator } from "./pg"
import { TimeCalculator } from "./time"

const Links = {
    "Padrão": {
        arg: "--padrao",
        component: DefaultCalculator
    },
    "Bases": {
        arg: "--bases",
        component: BasesCalculator
    },
    "Eq. 2º Grau": {
        arg: "--equacao",
        component: EquationCalculator
    },
    "Data": {
        arg: "--data",
        component: DataCalculator
    },
    "Tempo": {
        arg: "--time",
        component: TimeCalculator
    },
    "PA": {
        arg: "--pa",
        component: PACalculator
    },
    "PG": {
        arg: "--pg",
        component: PGCalculator
    }
}

export function Home() {
    const isLock = useRef(false)
    const menu = useRef(null as unknown as HTMLDivElement)
    const iframe = useRef(null as unknown as HTMLIFrameElement)

    const [title, setTitle] = useState("Padrão")

    async function handleChangeLoaded(name: keyof typeof Links) {
        handleMenuExpandClick()
        const Calculator = Links[name].component
        setContent(<Calculator changeTitle={setTitle} />)
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

    const [content, setContent] = useState(<Links.Padrão.component changeTitle={setTitle} />)

    return (
        <>
            <header>
                <div>
                    <div id="menu-expand" onClick={handleMenuExpandClick}>
                        <img src={resolve(assetsPath, "menu.png")} width={30} />
                    </div>
                    <span id="calculator-name">{title}</span>
                </div>
                <AlwaysOnTop />
            </header>

            <div id="fundo-invisivel">
                <div id="menu" ref={menu}>
                    <ul>
                        {Object.entries(Links).map(([name, link]) => (
                            <li
                                key={name} onClick={() => handleChangeLoaded(name as keyof typeof Links)}
                            >
                                {name}
                                <img
                                    src={resolve(assetsPath, "hyperlink.svg")} data-href={link.arg}
                                    onClick={e => {
                                        e.stopPropagation()
                                        ipcRenderer.send('new-window', link.arg)
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