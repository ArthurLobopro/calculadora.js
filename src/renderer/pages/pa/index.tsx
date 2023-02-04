import { resolve } from "path"
import React, { useEffect, useState, useRef } from "react"
import { assetsPath } from "../../../Util"
import { frame } from "../../Frame"

interface calculatorPros {
    changeTitle?: (title: string) => void
}

type conversionType = "generate" | "discover"

type resultsType = ({
    type: "generate", first_term: number, razion: number, quantity: number
} | {
    type: "discover", first_term: number, razion: number, term: number
})[]

type inputs = {
    discover: {
        first_term: number
        razion: number
        term: number
    },
    generate: {
        first_term: number
        razion: number
        quantity: number
    }

}

const generatePa = (first_term: number, razion: number, length: number) => {
    return Array.from({ length }, (_, index) => first_term + razion * index)
}

const discoverTerm = (first_term: number, razion: number, n: number) => {
    // An = A1 + (n - 1) * r
    return first_term + (n - 1) * razion
}

export function PACalculator(props: calculatorPros) {
    useEffect(() => {
        if (window.location.hash === "#/pa") {
            const link = document.querySelector("link[rel='icon']") as HTMLLinkElement
            link.href = resolve(assetsPath, "calculators-icons/pa.svg")
            frame.update()
        }

        if (props.changeTitle) {
            props.changeTitle("Progressão Aritmética")
        }
    }, [])

    const [menu, setMenu] = useState<conversionType>("generate")

    useEffect(() => {
        const buttons = document.querySelectorAll(".menu button") as NodeListOf<HTMLButtonElement>
        buttons.forEach(button => {
            button.classList.toggle("selected")
        })
    }, [menu])

    const menus = {
        get generate() {
            const [data, setData] = useState<inputs["generate"]>({
                first_term: 0,
                razion: 0,
                quantity: 0
            })

            function Submit() {
                if (form.current?.checkValidity()) {
                    setResults([
                        ...results,
                        {
                            type: "generate",
                            ...data
                        }
                    ])
                }
            }

            const form = useRef<HTMLFormElement>(null)

            return (
                <div className="screen">
                    <form ref={form}>
                        <label>
                            Primeiro Termo:
                            <input
                                type="text" value={data.first_term ?? ""} maxLength={3} required={true} autoFocus={true}
                                onChange={(event) => setData({ ...data, first_term: Number(event.currentTarget.value) })}
                            />
                        </label>
                        <label>
                            Razão:
                            <input
                                type="text" value={data.razion || ""} maxLength={3} min={1} required={true}
                                onChange={(event) => setData({ ...data, razion: Number(event.currentTarget.value) })}
                            />
                        </label>
                        <label>
                            Quantidade:
                            <input
                                type="text" value={data.quantity || ""} maxLength={3} min={1} required={true}
                                onChange={(event) => setData({ ...data, quantity: Number(event.currentTarget.value) })}
                            />
                        </label>
                    </form>
                    <button
                        className={`submit ${form.current?.checkValidity() ? "" : "disable"}`}
                        onClick={Submit}
                    >
                        Gerar
                    </button>
                </div>
            )
        },
        get discover() {
            const [data, setData] = useState<inputs["discover"]>({
                first_term: 0,
                razion: 0,
                term: 0
            })

            const form = useRef<HTMLFormElement>(null)

            function Submit() {
                if (form.current?.checkValidity()) {
                    setResults([
                        ...results,
                        {
                            type: "discover",
                            ...data
                        }
                    ])
                }
            }

            return (
                <div className="screen">
                    <form ref={form}>
                        <label>
                            Primeiro Termo:
                            <input
                                type="text" value={data.first_term} maxLength={3} required={true}
                                onChange={(event) => setData({ ...data, first_term: Number(event.currentTarget.value) })}
                            />
                        </label>
                        <label>
                            Razão:
                            <input
                                type="text" value={data.razion || ""} maxLength={3} required={true}
                                onChange={(event) => setData({ ...data, razion: Number(event.currentTarget.value) })}
                            />
                        </label>
                        <label>
                            Termo:
                            <input
                                type="text" value={data.term || ""} maxLength={3} required={true}
                                onChange={(event) => setData({ ...data, term: Number(event.currentTarget.value) })}
                            />
                        </label>
                    </form>
                    <button
                        className={`submit ${form.current?.checkValidity() ? "" : "disable"}`}
                        onClick={Submit}
                    >
                        Descobrir
                    </button>
                </div >
            )
        }
    }

    function HandleMenuButtonClick(menuType: conversionType) {
        if (menuType !== menu) {
            setMenu(menuType)
        }
    }

    const [results, setResults] = useState<resultsType>([])

    return (
        <div id="pa" className="calculator-wrapper">
            <div className="menu">
                <button className="selected" onClick={() => HandleMenuButtonClick("generate")}>Gerar</button>
                <button onClick={() => HandleMenuButtonClick("discover")}>Descobrir Termo</button>
            </div>
            <div className="screen-wrapper">
                {menus[menu]}
            </div>
            <div id="result-wrapper">
                <div id="result">
                    {results.map((result, index) => (
                        <Result key={index} {...result} onDelete={() => setResults(results.filter((v, i) => i !== index))} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function Result(props: resultsType[0] & { onDelete?: () => void }) {
    if (props.type === "generate") {
        const { first_term, razion, quantity } = props
        const PG = generatePa(first_term, razion, quantity)
        return (
            <div className="res">
                <div>
                    Primeiro Termo: {first_term} <br />
                    Razão: {razion} <br />
                    Quantidade: {quantity} <br />
                    PG: ({PG.join(", ")})
                </div>
                <img src={resolve(assetsPath, "circle-x.svg")} onClick={props.onDelete} />
            </div>
        )
    }

    const { first_term, razion, term } = props

    return (
        <div className="res">
            <div>
                Primeiro Termo: {first_term} <br />
                Razão: {razion} <br />
                Termo: {discoverTerm(first_term, razion, term)}
            </div>
            <img src={resolve(assetsPath, "circle-x.svg")} onClick={props.onDelete} />
        </div>
    )
}