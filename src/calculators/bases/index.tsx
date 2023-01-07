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

    const [digtsType, setDigtsType] = useState<keyof typeof digits>("dec")

    return (
        <div className="calculator-wrapper" id="bases">
            <div id="visor">
                <div id="input">0</div>
                <div>
                    <div>HEX: <span id="hex">0</span></div>
                    <div>DEC: <span id="dec">0</span></div>
                    <div>OCT: <span id="oct">0</span> </div>
                    <div>BIN: <span id="bin">0</span></div>
                </div>
            </div>
            <div id="keyboard">

                <select className="long" id="bases">
                    <option value="dec">Decimal</option>
                    <option value="hex">Hexadecimal</option>
                    <option value="oct">Octal</option>
                    <option value="bin">Binário</option>
                </select>

                {buttons.map(({ value, content }, index) => (
                    <button
                        className={["Delete", "Backspace", ...digits[digtsType].split("")].includes(value) ? "" : "disable"}
                        key={index} value={value}
                    >
                        {content}
                    </button>
                ))}

            </div>
        </div>
    )
}