import { useEffect, useState } from "react"
import { resolve } from "path"
import { assetsPath } from "../../Util"
import { buttons } from "./buttonsLayout"

const digits = {
    dec: "0123456789",
    hex: "0123456789ABCDEF",
    oct: "01234567",
    bin: "01"
}

export function BasesCalculator() {
    // useEffect(() => {
    //     if (process.isMainFrame) {
    //         const link = document.querySelector("link[rel='icon'") as HTMLLinkElement
    //         link.href = resolve(assetsPath, "calculators-icons/binary.svg")
    //     }
    // }, [])

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

    return (
        <div className="calculator-wrapper" id="bases">
            <div id="visor">
                <div id="input">{visorContent.join("")}</div>
                <div>
                    <div>HEX: <span id="hex">0</span></div>
                    <div>DEC: <span id="dec">0</span></div>
                    <div>OCT: <span id="oct">0</span> </div>
                    <div>BIN: <span id="bin">0</span></div>
                </div>
            </div>
            <div id="keyboard">

                <select
                    className="long" id="bases" value={digitsType}
                    onChange={(event) => setDigtsType(event.target.value as keyof typeof digits)}
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