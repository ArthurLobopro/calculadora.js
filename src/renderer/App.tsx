import { useRef } from "react"
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

    function handleMenuExpandClick() {
        if (isLock.current) { return null }

        isLock.current = true
        setTimeout(() => isLock.current = false, 1000)

        const fundo = document.getElementById('fundo-invisivel') as HTMLDivElement
        if (fundo.classList.contains('visible')) {
            menu.current?.classList.toggle('visible')
            setTimeout(() => {
                fundo.classList.toggle('visible')
            }, 550)
            window.onclick = null
        } else {
            fundo.classList.toggle('visible')
            setTimeout(() => {
                menu.current?.classList.toggle('visible')
                isLock.current = false
            }, 100)
            menu.current.onmouseenter = () => window.onclick = null
            menu.current.onmouseleave = () => {
                window.onclick = () => {
                    handleMenuExpandClick()
                    window.onclick = null
                }
            }
        }
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
                            <li data-src={resolve(__dirname, `../calculators/${link.path}`)} key={link.path}>
                                {link.name}
                                <img src={resolve(assetsPath, "hyperlink.png")} data-href={link.path} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <iframe src={resolve(__dirname, "../calculators/padrao/padrao.html")}></iframe>
        </>
    )
}