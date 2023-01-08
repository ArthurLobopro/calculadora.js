import { useEffect, useState } from "react"
import { resolve } from "path"
import { assetsPath } from "../../Util"
import { buttons } from "./buttonsLayout"

import * as conversor from "../../lib/bases"
import { frame } from "../../renderer/Frame"

const digits = {
    dec: "0123456789",
    hex: "0123456789ABCDEF",
    oct: "01234567",
    bin: "01"
}

interface calculatorPros {
    changeTitle?: (title: string) => void
}

export function BasesCalculator(props: calculatorPros) {
    useEffect(() => {
        if (window.location.hash === "#/bases") {
            const link = document.querySelector("link[rel='icon']") as HTMLLinkElement
            link.href = resolve(assetsPath, "calculators-icons/binary.svg")
            frame.update()
        }

        if (props.changeTitle) {
            props.changeTitle("Bases")
        }
    }, [])

    useEffect(() => {
        const onclick = (event: KeyboardEvent) => {
            const { key } = event
            const button_key = key.length === 1 ? key.toUpperCase() : key
            const button = document.querySelector(`button[value="${button_key}"]`) as HTMLButtonElement
            if (button) {
                button.click()
            }
        }
        window.addEventListener("keydown", onclick)

        return () => window.removeEventListener("keydown", onclick)
    }, [])

    function handleButtonClick(value: string) {
        if (value === "Delete") {
            return setVisorContent(["0"])
        }

        if (value === "Backspace") {
            return setVisorContent(content => {
                if (content.length === 1) {
                    return ["0"]
                } else {
                    return content.slice(0, content.length - 1)
                }
            })
        }

        if (visorContent.length === 1 && visorContent[0] === "0") {
            return setVisorContent([value])
        }

        setVisorContent(content => [...content, value])
    }

    const [digitsType, setDigtsType] = useState<keyof typeof digits>("dec")
    const [visorContent, setVisorContent] = useState(["0"])

    const conversions = {
        bin: digitsType === "bin" ? visorContent.join("") : conversor[`${digitsType}_to_bin`](visorContent.join("")),
        oct: digitsType === "oct" ? visorContent.join("") : conversor[`${digitsType}_to_oct`](visorContent.join("")),
        dec: digitsType === "dec" ? visorContent.join("") : conversor[`${digitsType}_to_dec`](visorContent.join("")),
        hex: digitsType === "hex" ? visorContent.join("") : conversor[`${digitsType}_to_hex`](visorContent.join("") as never)
    }

    return (
        <div className="calculator-wrapper" id="bases">
            <div id="visor">
                <div id="input">{visorContent.join("")}</div>
                <div>
                    <div>HEX: <span id="hex">{conversions.hex}</span></div>
                    <div>DEC: <span id="dec">{conversions.dec}</span></div>
                    <div>OCT: <span id="oct">{conversions.oct}</span> </div>
                    <div>BIN: <span id="bin">{conversions.bin}</span></div>
                </div>
            </div>
            <div id="keyboard">

                <select
                    className="long" id="bases" value={digitsType}
                    onChange={(event) => {
                        const value = event.target.value as keyof typeof digits
                        setVisorContent(conversions[value].toString().split(""))
                        setDigtsType(value)
                    }}
                >
                    <option value="dec">Decimal</option>
                    <option value="hex">Hexadecimal</option>
                    <option value="oct">Octal</option>
                    <option value="bin">Binário</option>
                </select>

                {buttons.map(({ value, content }, index) => {
                    const isDisable = !["Delete", "Backspace", ...digits[digitsType].split("")].includes(value)
                    return (
                        <button
                            className={!isDisable ? "" : "disable"}
                            key={index} value={value}
                            onClick={() => !isDisable && handleButtonClick(value)}
                        >
                            {content}
                        </button>
                    )
                })}

            </div>
        </div >
    )
}