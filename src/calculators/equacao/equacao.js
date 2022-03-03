const { loadSVG } = require("lib/Util")

const appPath = window.appPath

const resultDiv = document.getElementById('result')
const circle = loadSVG(appPath, "assets", "circle-x.svg")

const a_input = document.getElementById("A")
const b_input = document.getElementById("B")
const c_input = document.getElementById("C")
const inputs = [a_input, b_input, c_input]

const validadeKey = e => {
    return (
        e.key === "Backspace" || Array.from("0123456789").includes(e.key) ||
        e.key === ',' && !e.target.value.includes(',') &&
        !['+', '-'].includes(e.key)
    )
}

const negativeAndPositiveValidate = event => {
    const value = event.currentTarget.value

    if (event.key === "-" && !value.includes('-') || event.key === "+" && Number(value) < 0) {
        event.target.value = Number(value) * -1
    }
}

const arrows = event => {
    const { target, key } = event
    const index = inputs.indexOf(target)
    const value = Number(target.value)

    if (["ArrowUp", "ArrowDown"].includes(key)) {
        target.value = key === "ArrowUp" ? value + 1 : value - 1
    }

    if (index != inputs.length - 1 && ["ArrowRight", "Enter"].includes(key)) {
        inputs[index + 1].focus()
    }

    if (index === inputs.length - 1 && key === "Enter") {
        calcAndAppendResult()
    }

    if (index > 0 && key === "ArrowLeft") {
        inputs[index - 1].focus()
    }
}

const onkeydown = event => {
    arrows(event);
    negativeAndPositiveValidate(event)
    return validadeKey(event);
}

inputs.forEach(input => input.onkeydown = onkeydown)

function buildRes(content) {
    const res = document.createElement("div")
    res.className = "res"
    res.innerHTML = `${content}${circle}`

    res.querySelector('svg').onclick = () => {
        resultDiv.removeChild(res)
    }

    return res
}

function getInputValues() {
    return {
        a: Number(a_input.value),
        b: Number(b_input.value),
        c: Number(c_input.value)
    }
}

function clearInputValues() {
    inputs.forEach(input => input.value = '')
}

function calcAndAppendResult() {
    const { a, b, c } = getInputValues()
    if (a === 0) {
        a_input.style.borderBottomColor = "red"
        a_input.focus()
    } else {
        const delta = (b * b) - 4 * a * c
        const root = Math.sqrt(delta)
        let x1, x2

        x1 = (-(b) - root) / (a * 2)
        x2 = (-(b) + root) / (a * 2)

        const x = x1 == x2 ? [x1] : [x1, x2]
        const xString = String(root).toLowerCase() == "inexistente" ? "Inexistente" :
            x.length == 1 ? x[0] : `${x[0]} ou ${x[1]}`

        const content = `
        <div>
            A: ${a} <br>
            B: ${b} <br>
            C: ${c} <br>
            Δ: ${delta} <br>
            Raiz: ${root >= 0 ? root : "Inexistente"} <br>
            X: ${xString}
        </div>`

        resultDiv.appendChild(buildRes(content))
        clearInputValues()
        a_input.focus()
    }
}

a_input.addEventListener('keyup', () => {
    a_input.style.borderBottomColor = a_input.value == "0" ? "red" : ""
})

document.querySelector("#calc").onclick = calcAndAppendResult