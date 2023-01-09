import { useEffect, useRef, useState } from "react"
import { frame } from "../../Frame"
import { resolve } from "path"
import { assetsPath } from "../../../Util"

interface calculatorProps {
    changeTitle?: (title: string) => void
}

function FormatDate(date: Date) {
    const addPad = (arg: number) => String(arg).padStart(2, '0')
    return `${date.getFullYear()}-${addPad(date.getMonth() + 1)}-${addPad(date.getDate())}`
}

function range(min: number, max: number, pass = 1) {
    const array = []
    if (min > max) {
        for (let i = min; i >= max; i -= pass) { array.push(i) }
        return array
    }

    for (let i = min; i <= max; i += pass) { array.push(i) }
    return array
}

function reduceYears(dias: number, range: number[]) {
    let anos = 0
    for (let anoAtual of range) {
        const diasNoAno = anoAtual % 4 === 0 ? 366 : 365
        if (dias - diasNoAno >= 0) {
            anos++
            dias -= diasNoAno
        }
    }
    return { dias, anos }
}

function reduceMeses(days: number, { from }: { from: Date }) {
    const diasDoMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let meses = 0
    let mesAtual = from.getMonth()
    while (true) {
        if (days - diasDoMes[mesAtual] >= 0) {
            meses++
            days -= diasDoMes[mesAtual]
        } else {
            return { dias: days, meses }
        }
        mesAtual = mesAtual == 11 ? 0 : mesAtual + 1
    }
}


function getDifference(days: number, { from, to }: { from: Date, to: Date }) {
    let anos = 0, meses = 0
    if (days < 0) days *= -1

    const difAnos = to.getFullYear() - from.getFullYear()
    if (difAnos !== 0) {
        if (difAnos > 0) {
            ; ({ anos, dias: days } = reduceYears(days, range(from.getFullYear(), from.getFullYear() + difAnos)))
        } else {
            ; ({ anos, dias: days } = reduceYears(days, range(to.getFullYear(), from.getFullYear() + difAnos)))
        }
    }

    ; ({ meses, dias: days } = reduceMeses(days, { from: from }))

    console.table({ anos, meses, dias: days })
    return { anos, meses, dias: days }
}

function NumberfyDate(datestring: string) {
    const date_arr = datestring.split('-').map(Number)
    return new Date(date_arr[0], date_arr[1] - 1, date_arr[2])

}

export function DataCalculator(props: calculatorProps) {
    const [message, setMessage] = useState("Mesma data")
    const fromInput = useRef<HTMLInputElement>(null)
    const toInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (window.location.hash === "#/data") {
            const link = document.querySelector("link[rel='icon']") as HTMLLinkElement
            link.href = resolve(assetsPath, "calculators-icons/calendar-icon.svg")
            frame.update()
        }

        if (props.changeTitle) {
            props.changeTitle("Data")
        }
    }, [])

    function Submit() {
        const from = NumberfyDate((fromInput.current as HTMLInputElement).value)
        const to = NumberfyDate((toInput.current as HTMLInputElement).value)

        if (from.valueOf() === to.valueOf()) {
            return setMessage("Mesma data")
        }

        const dias = (to.valueOf() - from.valueOf()) / 1000 / 86400
        const diff = getDifference(dias, { from, to })

        setMessage([
            diff.anos !== 0 ? `Anos: ${diff.anos} ano${diff.anos !== 1 ? 's' : ''}\n` : '',
            diff.meses !== 0 ? `Meses: ${diff.meses} ${diff.meses === 1 ? 'mês' : 'meses'}\n` : '',
            diff.dias !== 0 ? `Dias: ${diff.dias} dia${diff.dias !== 1 ? 's' : ''}\n` : '',
            `Total de dias: ${dias}`
        ].join(''))
    }

    return (
        <div className="calculator-wrapper" id="data">
            <div className="inputs">
                <span className="def">De:</span>
                <input
                    type="date" defaultValue={FormatDate(new Date())} ref={fromInput}
                    onChange={Submit}
                />
            </div>
            <div className="inputs">
                <span className="def">Para:</span>
                <input
                    type="date" defaultValue={FormatDate(new Date())} ref={toInput}
                    onChange={Submit}
                />
            </div>
            <span className="def">Diferença:</span>
            <div id="visor">
                {message}
            </div>
        </div>
    )
}