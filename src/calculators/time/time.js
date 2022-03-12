const converter = require('time-converter')
const { createElement, createButtonList, CalculatorBase } = require("../../lib/Elements")
const path = require('path')
const paths = require("../../Paths")

const isInt = num => String(num).indexOf('.') === -1

const format = str => String(str).replace('.', ',')

const onButtonClick = event => {
    const target = event.currentTarget
    const value = target.dataset.value

    buttonsFunctions[value]?.()

    const input = getFocusedInput()

    if ("0123456789".indexOf(value) >= 0 || value == ',' && !input.value.includes(',')) {
        input.value += value
        dispatchInput()
    }
}
class TimeCalculator extends CalculatorBase {
    constructor() {
        super()
    }

    getMetadata() {
        const title = createElement('title', { innerText: "Tempo" })

        const iconLink = createElement('link', {
            rel: "icon",
            href: path.resolve(paths.assetsPath, "calculators-icons", "clock.svg")
        })

        const styleLink = createElement('link', {
            rel: "stylesheet",
            href: path.resolve(__dirname, "./time.css")
        })

        return [title, iconLink, styleLink]
    }

    build() {
        const make_time_input = type => {
            return `
            <div id="${type}">
                <input type="text" min="0" id="${type}-input" maxlength="15" value="0">
                <select id="${type}-type" list="types">
                    <option value="milisseconds">Milisegundos</option>
                    <option value="seconds">Segundos</option>
                    <option value="minutes" selected>Minutos</option>
                    <option value="hours">Horas</option>
                    <option value="days">Dias</option>
                </select>
            </div>`
        }

        const screen = createElement("div", { id: 'container' })
        screen.innerHTML = `
        ${make_time_input("from")}
        ${make_time_input("to")}
        <div id="keyboard">
            ${createButtonList([
            {
                dataset: { value: "invert" },
                content: `<img src="${path.resolve(paths.assetsPath, "keyboard/revert.svg")}" width="25px" alt="Inverter">`
            },
            "CE",
            {
                dataset: { value: "Backspace" },
                content: `<img src="${path.resolve(paths.assetsPath, "keyboard/delete.svg")}" alt="Apagar">`
            },
            7, 8, 9, 4, 5, 6, 1, 2, 3,
            {
                dataset: { value: 0 },
                content: 0,
                className: "double-button"
            },
            ","
        ].map(item => {
            if (typeof item === "object") {
                return item
            }
            return { dataset: { value: item }, content: item }
        })).join('\n')}
        </div>`

        this.screen = screen

        this.elements = {
            from_input: screen.querySelector("#from-input"),
            to_input: screen.querySelector("#to-input"),
            from_select: screen.querySelector("#from-type"),
            to_select: screen.querySelector("#to-type")
        }
    }

    addEvents() {
        const onSelectChange = () => this.convert(true)

        const validadeKeyDown = e => {
            return e.key == "Backspace" || "0123456789".indexOf(e.key) >= 0 || e.key == ',' && !e.target.value.includes(',')
        }

        const { from_input, to_input, from_select, to_select } = this.elements

        this.screen.querySelectorAll('button').forEach(button => button.onclick = onButtonClick)

        Array(from_input, to_input).forEach((input, index, inputsArray) => {
            input.onkeydown = validadeKeyDown

            input.onclick = () => {
                inputsArray.forEach(input => input.classList.remove('focus'))
                input.classList.add('focus')
            }

            const onInput = () => {
                console.log('input');
                const value = String(input.value).replace(',', '.')
                if (value[value.length - 1] !== '.' && !Number.isNaN(Number(value))) {
                    input.value = isInt(value) ? Number(value).toPrecision().replace('.', ',') : value.replace('.', ',')
                }
                this.convert()
            }

            input.onchange = onInput
            input.oninput = onInput
        })

        Array(from_select, to_select).forEach(select => select.onchange = onSelectChange)
    }

    convert(selectChange = false) {
        const { from_input, to_input } = this.elements

        const focusedInput = selectChange ?
            from_input :
            document.querySelector('input:focus') || document.querySelector('input.focus')

        const blurInput = selectChange ?
            to_input :
            document.querySelector('input:not(:focus):not(.focus)')

        const fromSelect = selectChange ?
            document.getElementById("from-type") :
            document.querySelector("input:focus + select") || document.querySelector('input.focus + select')

        const toSelect = selectChange ?
            document.getElementById("to-type") :
            document.querySelector("input:not(:focus):not(.focus) + select")

        const fromType = fromSelect.value
        const toType = toSelect.value

        const fromValue = Number(String(focusedInput.value).replace(',', '.'))
        const toValue = fromType === toType ? fromValue : Number(converter[`${fromType}_to_${toType}`](fromValue))

        blurInput.value = Number.isInteger(toValue) ? format(toValue) : format(Number(toValue.toFixed(6)))
    }
}

const screen = new TimeCalculator()
screen.append()

const { from_input, to_input, from_select, to_select } = screen.elements

const getFocusedInput = () => document.querySelector('.focus') || from_input
const dispatchInput = () => {
    const input = getFocusedInput()
    const event = new Event("input")
    input.dispatchEvent(event)
}

const buttonsFunctions = {
    "Backspace": () => {
        const input = getFocusedInput()
        const value = input.value
        input.value = String(value).substring(0, value.length - 1)
        dispatchInput()
    },
    "CE": () => {
        const input = getFocusedInput()
        input.value = "0"
        dispatchInput()
    },
    "invert": () => {
        const value = to_input.value
        const fromValue = from_select.value
        const toValue = to_select.value

        from_input.value = value
        from_select.value = toValue
        to_select.value = fromValue

        screen.convert(true)
    }
}

from_input.focus()
from_input.click()