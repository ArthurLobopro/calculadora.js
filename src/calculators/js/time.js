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

const onkeypress = e => {
    return "0123456789".indexOf(e.key) >= 0 || event.key == ',' && !e.target.value.includes(',')
}

fromInput.onkeypress = onkeypress
toInput.onkeypress = onkeypress

fromInput.oninput = onInput
toInput.oninput = onInput

const onChange = () => convert(true)

const fromSelect = document.getElementById("from-type")
const toSelect = document.getElementById("to-type")

fromSelect.onchange = onChange
toSelect.onchange = onChange

const format = str => String(str).replace('.', ',')

function convert(selectChange = false) {
    const focusedInput = selectChange ? fromInput : document.querySelector('input:focus')
    const blurInput = selectChange ? toInput : document.querySelector('input:not(:focus)')

    const fromSelect = selectChange ? document.getElementById("from-type") : document.querySelector("input:focus + select")
    const toSelect = selectChange ? document.getElementById("to-type") : document.querySelector("input:not(:focus) + select")

    const fromType = fromSelect.value
    const toType = toSelect.value

    const fromValue = Number(String(focusedInput.value).replace(',', '.'))
    const toValue = fromType === toType ? fromValue : Number(converter[`${fromType}_to_${toType}`](fromValue))

    blurInput.value = Number.isInteger(toValue) ? format(toValue) : format(Number(toValue.toFixed(6)))
}