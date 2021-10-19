const converter = require('time-converter')

const fromInput = document.getElementById("from-input")
const toInput = document.getElementById("to-input")

const isInt = num => String(num).indexOf('.') === -1

const onInput = event => {
    const input = event.currentTarget
    const value = String(input.value).replace(',', '.')
    if (value[value.length - 1] !== '.' && !Number.isNaN(Number(value))) {
        input.value = isInt(value) ? Number(value).toPrecision().replace('.', ',') : value.replace('.', ',')
    }
    convert()
}

const onKeyDown = e => {
    return e.key=="Backspace" || "0123456789".indexOf(e.key) >= 0 || event.key == ',' && !e.target.value.includes(',')
}

const onClick = event => {
    const target = event.target

        ;[fromInput, toInput].forEach(input => input.classList.remove('focus'))
    target.classList.add('focus')
}

fromInput.onkeydown = onKeyDown
toInput.onkeydown = onKeyDown

fromInput.oninput = onInput
toInput.oninput = onInput

fromInput.onchange = onInput
toInput.onchange = onInput

fromInput.onclick = onClick
toInput.onclick = onClick

const onChange = () => convert(true)

const fromSelect = document.getElementById("from-type")
const toSelect = document.getElementById("to-type")

fromSelect.onchange = onChange
toSelect.onchange = onChange

const format = str => String(str).replace('.', ',')

function convert(selectChange = false) {
    const focusedInput = selectChange ? fromInput : document.querySelector('input:focus') || document.querySelector('input.focus')
    const blurInput = selectChange ? toInput : document.querySelector('input:not(:focus):not(.focus)')

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

const getFocusedInput = () => document.querySelector('.focus') || fromInput
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
        const value = toInput.value
        const fromValue = fromSelect.value
        const toValue = toSelect.value

        fromInput.value = value
        fromSelect.value = toValue
        toSelect.value = fromValue

        convert(true)
    }
}

const onButtonClick = event => {
    const target = event.currentTarget
    const value = target.dataset.value

    buttonsFunctions[value]?.()

    const input = getFocusedInput()

    if("0123456789".indexOf(value) >= 0 || value == ',' && !input.value.includes(',')){
        input.value += value
        dispatchInput()
    }
}

document.querySelectorAll('.button').forEach(button => button.onclick = onButtonClick)

fromInput.focus()
fromInput.click()