const resultDiv = document.getElementById('result')

const circle = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
        svg:hover * {
            stroke: #ccc;
        }
        svg:active * {
            stroke: #aaa;
        }
        svg{
            cursor: pointer;
        }
    </style>

    <circle cx="10" cy="10" r="9" stroke="white" stroke-width="2" />
    <path d="M6 6L14 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M14 6L6 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

</svg>`

const a_input = document.getElementById("A")
const b_input = document.getElementById("B")
const c_input = document.getElementById("C")

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

function clearInputValues(){
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