import { resolve } from "path"
import React, { useEffect, useState } from "react"
import { assetsPath } from "../../../Util"
import * as converter from "../../../lib/time-converter"
import { frame } from "../../Frame"
import { buttons } from "./buttonsLayout"

interface calculatorPros {
    changeTitle?: (title: string) => void
}

type conversions = "milisseconds" | "seconds" | "minutes" | "hours" | "days"

const MAX_LENGTH = 15

export function TimeCalculator(props: calculatorPros) {
    const [from, setFrom] = useState<conversions>("minutes")
    const [to, setTo] = useState<conversions>("minutes")
    const [text, setText] = useState<string>("0")

    useEffect(() => {
        if (window.location.hash === "#/time") {
            const link = document.querySelector("link[rel='icon']") as HTMLLinkElement
            link.href = resolve(assetsPath, "calculators-icons/pg.svg")
            frame.update()
        }

        if (props.changeTitle) {
            props.changeTitle("Tempo")
        }

        function onKeyDown(event: KeyboardEvent) {
            const key = event.key

            if (key.length > 1 && ["Backspace", "Delete"].includes(key)) {
                const button = document.querySelector(`button[data-value="${key}"]`) as HTMLButtonElement
                button.click()
            }

            if (key.length === 1 && !isNaN(Number(key))) {
                const button = document.querySelector(`button[data-value="${key}"]`) as HTMLButtonElement
                button.click()
            }
        }

        window.addEventListener("keydown", onKeyDown)

        return () => {
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [])

    function HandleButtonCLick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const button = event.currentTarget
        const value = button.dataset.value

        if (value === undefined) return

        switch (value) {
            case "invert":
                setText(from === to ? text : converter[`${from}_to_${to}` as keyof typeof converter](Number(text)) + "")
                setFrom(to)
                setTo(from)
                break
            case "Delete":
                setText("0")
                break
            case "Backspace":
                if (text.length === 1) {
                    setText("0")
                } else {
                    setText(text.slice(0, -1))
                }
                break
            default:
                if (text.length >= MAX_LENGTH) return

                if (text === "0") {
                    setText(value)
                } else {
                    setText(text + value)
                }
                break
        }
    }

    return (
        <div className="calculator-wrapper" id="time">

            <div id="from">
                <div className="input">{text}</div>
                <select value={from} onChange={event => setFrom(event.currentTarget.value as conversions)}>
                    <option value="milisseconds">Milisegundos</option>
                    <option value="seconds">Segundos</option>
                    <option value="minutes">Minutos</option>
                    <option value="hours">Horas</option>
                    <option value="days">Dias</option>
                </select>
            </div>

            <div id="to">
                <div className="input">
                    {
                        from === to ? text : converter[`${from}_to_${to}` as keyof typeof converter](Number(text))
                    }
                </div>
                <select value={to} onChange={event => setTo(event.currentTarget.value as conversions)}>
                    <option value="milisseconds">Milisegundos</option>
                    <option value="seconds">Segundos</option>
                    <option value="minutes">Minutos</option>
                    <option value="hours">Horas</option>
                    <option value="days">Dias</option>
                </select>
            </div>

            <div id="keyboard">
                {buttons.map(button => (
                    <button
                        className={button.double ? "double-button" : ""} data-value={button.value}
                        onClick={HandleButtonCLick} key={button.value}
                    >
                        {button.content}
                    </button>
                ))}
            </div>
        </div>
    )
}