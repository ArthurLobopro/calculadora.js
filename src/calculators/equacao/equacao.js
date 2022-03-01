const { loadSVG } = require("lib/Util")

const appPath = window.appPath

const resultDiv = document.getElementById('result')
const circle = loadSVG(appPath, "assets", "circle-x.svg")

const a_input = document.getElementById("A")
const b_input = document.getElementById("B")
const c_input = document.getElementById("C")

const validadeKey = e => {
    return e.key == "Backspace" || "-0123456789".indexOf(e.key) >= 0 || e.key == ',' && !e.target.value.includes(',')
}

const arrows = event => {
    const elements = [a_input, b_input, c_input]
    const target = event.target
    const index = elements.indexOf(target)
    const key = event.key

    if (index != elements.length - 1 && ["ArrowRight", "Enter"].includes(key)) {
        elements[index + 1].focus()
    }

    if(index === elements.length - 1 && key === "Enter"){
        calc()
    }

    if (index > 0 && key === "ArrowLeft") {
        elements[index - 1].focus()
    }
}

const onkeydown = event => { arrows(event); validadeKey(event) }

[a_input, b_input, c_input].forEach(input => input.onkeydown = onkeydown)

function buildRes({ a, b, c, x = [], delta, root }) {
    const res = document.createElement("div")
    res.className = "res"

    const xString = String(root).toLowerCase() == "inexistente" ? "Inexistente" :
        x.length == 1 ? x[0] : `${x[0]} ou ${x[1]}`

    res.innerHTML = `
        <div>
            A: ${a} <br>
            B: ${b} <br>
            C: ${c} <br>
            Δ: ${delta} <br>
            Raiz: ${root} <br>
            X: ${xString}
        </div>
        ${circle}
    `

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
    a_input.value = ''
    b_input.value = ''
    c_input.value = ''
}

function calc() {
    const { a, b, c } = getInputValues()
    if (a === 0) {
        a_input.style.borderBottomColor = "red"
        a_input.focus()
    } else {
        let delta = (b * b) - 4 * a * c
        let raiz = Math.sqrt(delta)
        let x1, x2

        x1 = (-(b) - raiz) / (a * 2)
        x2 = (-(b) + raiz) / (a * 2)

        resultDiv.appendChild(
            buildRes({
                a, b, c, delta,
                x: x1 == x2 ? [x1] : [x1, x2],
                root: raiz >= 0 ? raiz : "Inexistente"
            })
        )

        clearInputValues()
        a_input.focus()
    }
}

const resizeWrapper = () => {
    const wrapper = document.getElementById("result-wrapper")

    const { y } = wrapper.getBoundingClientRect()

    const totalHeight = window.innerHeight

    wrapper.style.height = `${totalHeight - y - 10}px`
}

a_input.addEventListener('keyup', () => {
    a_input.style.borderBottomColor = a_input.value == "0" ? "red" : ""
})

document.querySelector("#calc").onclick = calc

window.onload = resizeWrapper

window.onresize = resizeWrapper