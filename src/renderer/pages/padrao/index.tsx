import { resolve } from "path"
import { useEffect, useState } from "react"
import { assetsPath } from "../../../Util"
import { frame } from "../../Frame"
import { buttons } from "./buttonsLayout"
import * as correct from "../../../lib/correct_operations"

interface Props {
    changeTitle?: (title: string) => void
}

const operations = {
    "+": (n1: number, n2: number) => correct.soma(n1, n2),
    "-": (n1: number, n2: number) => correct.sub(n1, n2),
    "/": (n1: number, n2: number) => correct.div(n1, n2),
    "*": (n1: number, n2: number) => correct.mult(n1, n2),
    "%": (n1: number, n2: number) => correct.mult(n2, correct.div(n1, 100)),
    "^": (n1: number, n2: number) => correct.pow(n1, n2)
}

function calculate(n1: number, n2: number, signal: keyof typeof operations) {
    const operation = operations[signal]
    return operation(n1, n2)
}

const memory = {
    value: 0,
    clear() {
        this.value = 0
    },
    add(value: number) {
        this.value += value
    },
    sub(value: number) {
        this.value -= value
    }
}

export function DefaultCalculator(props: Props) {
    const [visor, setVisor] = useState({
        up: "",
        down: "0",
        signal: ""
    })

    useEffect(() => {
        if (window.location.hash === "#/padrao") {
            const link = document.querySelector("link[rel='icon']") as HTMLLinkElement
            link.href = resolve(assetsPath, "calculators-icons/plus.svg")
            frame.update()
        }

        props.changeTitle?.("Padrão")

        window.addEventListener("keydown", HandleKeyPress)

        return () => {
            memory.clear()
            window.removeEventListener("keydown", HandleKeyPress)
        }
    }, [])

    function HandleKeyPress(event: KeyboardEvent) {
        const key = event.key

        if (key.length === 1 || ["Backspace", "Delete", "Escape", "Enter"].includes(key)) {
            const button = document.querySelector(`button[data-value="${key}"]`) as HTMLButtonElement
            if (button) {
                button.click()
            }
        }
    }

    function HandleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const target = event.currentTarget
        const value = target.dataset.value as string

        if (value === "sqrt" && visor.up.length === 0) {
            return setVisor({
                ...visor,
                down: Math.sqrt(Number(visor.down)).toString()
            })
        }

        if (value === "-or+" && visor.down) {
            return setVisor({
                ...visor,
                down: Number(visor.down) * -1 + ""
            })
        }

        if (value === "1/x" && visor.up.length === 0) {
            return setVisor({
                ...visor,
                down: calculate(1, Number(visor.down), "/").toString()
            })
        }

        if (value === "M+") {
            memory.add(Number(visor.down))
            return
        }

        if (value === "M-") {
            memory.sub(Number(visor.down))
            return
        }

        if (value === "MR") {
            return setVisor({
                ...visor,
                down: memory.value.toString()
            })
        }

        if (value === "MC") {
            memory.clear()
            return
        }

        if ("0123456789".includes(value)) {
            return setVisor({
                ...visor,
                down: visor.down === "0" ? value : visor.down + value
            })
        }

        if ("/*-+^%".includes(value)) {
            if (!visor.up && !visor.signal) {
                return setVisor({
                    ...visor,
                    up: visor.down,
                    down: "",
                    signal: value
                })
            }
        }

        if (value === "Delete") {
            return setVisor({
                ...visor,
                down: "0"
            })
        }

        if (value === "Backspace") {
            if (["0", ""].includes(visor.down) && visor.signal) {
                return setVisor({
                    up: "",
                    signal: "",
                    down: visor.up
                })
            }

            return setVisor({
                ...visor,
                down: visor.down.length === 1 ? "0" : visor.down.slice(0, -1)
            })
        }

        if (value === "Escape") {
            return setVisor({
                ...visor,
                up: "",
                down: "0",
                signal: ""
            })
        }

        if (value === "Enter" && visor.up.length > 0 && visor.signal.length > 0) {
            const up = Number(visor.up)
            const down = Number(visor.down)

            const result = calculate(up, down, visor.signal as keyof typeof operations)

            console.log(result)

            return setVisor({
                up: "",
                down: result.toString(),
                signal: ""
            })
        }

    }

    return (
        <div className="calculator-wrapper" id="padrao">
            <div id="visor">
                <div id="up-visor">{visor.up} {visor.signal}</div>
                <div id="down-visor">{visor.down}</div>
            </div>
            <div id="keyboard">
                {buttons.map(button => (
                    <button data-value={button.value} onClick={HandleClick} key={button.value}>
                        {button.content}
                    </button>
                ))}
            </div>
        </div>
    )
}