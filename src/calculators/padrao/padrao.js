const get = id => document.getElementById(id)

import { calc, parceTop } from "./operations-functions.js"

const { div } = require("lib/correct_operations")

const visorDown = get("down-visor")
const visorUp = get("up-visor")

const verifyAndCalc = () => {
    if (visorUp.innerText.length > 0 && visorDown.innerText.length > 0) {
        calc()
    }
}

const memory = {
    value: 0,
    clear() {
        this.value = 0
    },
    add(value) {
        this.value += value
    },
    sub(value) {
        this.value -= value
    }
}

const keyFunctions = {
    "Backspace": () => {

        const upText = visorUp.innerText.replaceAll(' ', '')
        if (upText !== "") {
            visorDown.innerText = upText.substring(0, upText.length - 1)
            visorUp.innerText = ''
            return
        }

        const text = visorDown.innerText
        visorDown.innerText = text.substring(0, text.length - 1)
        if (visorDown.innerText == "" || visorDown.innerText == "Indefinido")
            visorDown.innerText = "0"
    },

    "Delete": () => visorDown.innerText = "0",
    "Escape": () => {
        visorDown.innerText = "0"
        visorUp.innerText = ""
    },

    "Control++": () => {
        if (Number(visorDown.innerText) < 0) {
            visorDown.innerText = Number(visorDown.innerText) * -1
        }
    },

    "Control+-": () => {
        if (Number(visorDown.innerText) > 0) {
            visorDown.innerText = Number(visorDown.innerText) * -1
        }
    },

    "M+": () => {
        memory.add(Number(visorDown.innerText))
    },

    "M-": () => {
        memory.sub(Number(visorDown.innerText))
    },

    "MR": () => visorDown.innerText = memory.value,

    "MC": () => memory.clear(),

    "*": () => {
        verifyAndCalc()
        const multButton = document.querySelector('[data-value="x"]')
        multButton.click()
    },
    "-or+": () => {
        const text = visorDown.innerText

        if (text == "0") return

        visorDown.innerText = Number(text) * -1
    },
    "1/x": () => {
        visorDown.innerText = div(1, Number(visorDown.innerText))
    },
    "pow": () => {
        const text = visorDown.innerText.replaceAll(" ", "").replaceAll(",", ".")
        visorDown.innerText = Number(text) ** 2
    },
    "sqrt": () => {
        const text = visorDown.innerText.replaceAll(" ", "").replaceAll(",", ".")
        visorDown.innerText = Math.sqrt(Number(text))
    },

    "parse": parceTop,

    "Enter": () => {
        if (visorDown.innerText !== "" && visorUp.innerText !== "") {
            calc()
        }
    },

    ",":() => {
        if(!visorDown.innerText.includes(',')){
            visorDown.innerText += ','
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const operations = ["+", "-", "x", "/", "%", "^"]

    window.onkeydown = event => {
        const key = String(event.key)

        console.log(key);

        if (event.ctrlKey) {
            return keyFunctions[`Control+${key}`]?.()
        }

        if (key == Number(key)) {
            if (visorDown.innerText == "0") {
                visorDown.innerText = key
            } else {
                visorDown.innerText += key
            }
        }

        if (keyFunctions[key] && operations.indexOf(key) === -1) {
            keyFunctions[key]()
        }

        if (operations.indexOf(key) !== -1) {
            verifyAndCalc()
            visorUp.innerText == "" ? keyFunctions.parse(key) : keyFunctions[key]()
        }
    }

    const buttons = document.querySelectorAll("button")
    for (let e of buttons) {
        e.onclick = event => {
            const key = event.currentTarget.dataset.value

            if (keyFunctions[key]) {
                keyFunctions[key]()
                return
            }

            if (operations.indexOf(key) !== -1) {
                visorUp.innerText == "" ? keyFunctions.parse(key) : keyFunctions[key]()
            } else if (key === "=") {
                verifyAndCalc()
            } else {
                if (key == Number(key)) {
                    if (visorDown.innerText == "0") {
                        visorDown.innerText = key
                    } else {
                        visorDown.innerText += key
                    }
                }

                if (key == ",") {
                    visorDown.innerText += key
                }
            }

        }
    }

})