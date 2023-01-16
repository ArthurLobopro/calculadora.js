import { resolve } from "path"
import { assetsPath } from "../../../Util"
import { useEffect, useRef, useState } from "react"

export function EquationCalculator(props: { changeTitle?: (title: string) => void }) {
    const [data, setData] = useState({
        a: 0,
        b: 0,
        c: 0,
    })

    useEffect(() => {
        if (props.changeTitle) {
            props.changeTitle("Eq. 2º Grau")
        }
    }, [])

    const input = useRef<HTMLInputElement>(null)

    const [results, setResults] = useState<calcProps[]>([])

    function Submit() {
        if (isValid) {
            setResults([...results, data])
            setData({
                a: 0,
                b: 0,
                c: 0,
            })
        } else {
            input.current?.focus()
        }
    }

    const isValid = data.a > 0

    return (
        <div className="calculator-wrapper" id="equacao">
            <div id="screen">
                <div id="formule">
                    Ax² + Bx + C = 0
                </div>
                <div id="inputs">
                    <label>
                        A:
                        <input
                            type="number" value={data.a || ""} min={1} required={true} ref={input}
                            onChange={event => setData({ ...data, a: Number(event.currentTarget.value) })}
                        />
                    </label>
                    <label>
                        B:
                        <input
                            type="number" value={data.b || ""}
                            onChange={event => setData({ ...data, b: Number(event.currentTarget.value) })}
                        />
                    </label>
                    <label>
                        C:
                        <input
                            type="number" value={data.c || ""}
                            onChange={event => setData({ ...data, c: Number(event.currentTarget.value) })}
                        />
                    </label>
                    <div className="flex">
                        <button
                            className={isValid ? "" : "disable"}
                            onClick={Submit}
                        >
                            Calcular
                        </button>
                    </div>
                </div>
            </div>
            <div id="result-wrapper">
                <div id="result">
                    {results.map((result, index) => (
                        <Result key={index} {...result} onDelete={() => {
                            const newResults = [...results]
                            newResults.splice(index, 1)
                            setResults(newResults)
                            console.log(newResults)

                        }} />
                    ))}
                </div>
            </div>
        </div>
    )
}

type calcProps = { a: number, b: number, c: number }
type resultProps = calcProps & { onDelete?: () => void }

function Calc(params: calcProps) {
    const { a, b, c } = params
    const delta = (b ** 2) - (4 * a * c)
    const root = Math.sqrt(delta)
    const x1 = (-b + root) / (2 * a)
    const x2 = (-b - root) / (2 * a)
    const xString = x1 === x2 ? `X: ${x1}` : `X1: ${x1} | X2: ${x2}`
    return { delta, root, xString }
}

function Result(props: resultProps) {
    const { a, b, c } = props
    const { delta, root, xString } = Calc(props)
    return (
        <div className="res">
            <div>
                A: {a} <br />
                B: {b} <br />
                C: {c} <br />
                Δ: {delta} <br />
                Raiz: {root} <br />
                {xString}
            </div>
            <img src={resolve(assetsPath, "circle-x.svg")} onClick={props.onDelete} />
        </div>
    )
}