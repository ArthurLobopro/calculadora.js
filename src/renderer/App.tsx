import { useRef, useState } from "react"
import { assetsPath } from "../Util"
import { resolve } from "path"

const Links = [
    {
        name: "Padrão",
        path: "padrao/padrao.html"
    },
    {
        name: "Bases",
        path: "bases/bases.html"
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

    return (
        <>
            <header>
                <div>
                    <div id="menu-expand" onClick={handleMenuExpandClick}>
                        <img src={resolve(assetsPath, "menu.png")} width={30} />
                    </div>
                    <span id="calculator-name">Padrão</span>
                </div>
                <div id="toggleAlwaysOnTop" title="Fixar janela no topo.">
                    <img src={resolve(assetsPath, "alwaysOnTop-false.svg")} />
                </div>
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
                                <img src={resolve(assetsPath, "hyperlink.png")} data-href={link.path} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <iframe ref={iframe} src={resolve(__dirname, `../calculators/${Links[0].path}`)}></iframe>
        </>
    )
}