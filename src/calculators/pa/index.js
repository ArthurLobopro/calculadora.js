const { loadSVG } = require("lib/Util")

const circle = loadSVG(appPath, "assets", "circle-x.svg")

const menuScreens = Array.from(document.querySelectorAll(".screen-wrapper > .screen"))
const menuButtons = document.querySelectorAll(".menu > button")

menuButtons.forEach(button => {
    button.onclick = () => {
        const focusedScreen = menuScreens.find(screen => screen.classList.contains("visible"))
        focusedScreen.classList.remove("visible")
        const newFocusedScreen = menuScreens.find(screen => screen.id === button.dataset.menu)
        newFocusedScreen.classList.toggle("visible")
        menuButtons.forEach(button => button.classList.remove("selected"))
        button.classList.add("selected")
    }
})

const result_wrapper = document.querySelector("#result")

const generate_first_term = document.querySelector("#generate-first-term")
const generate_razion = document.querySelector("#generate-razion")
const generate_quantity = document.querySelector("#generate-quantity")
const discover_first_term = document.querySelector("#dicover-first-term")
const discover_razion = document.querySelector("#discover-razion")
const discover_term = document.querySelector("#discover-term")

const validadeInputsAndGetValues = (inputType) => {
    const isNaN = num => Number.isNaN(num)
    if (inputType === "generate") {
        const first_term = Number(generate_first_term.value)
        const razion = Number(generate_razion.value)
        const quantity = Number.parseInt(generate_quantity.value)

        return {
            first_term, razion, quantity,
            error: isNaN(first_term) && isNaN(razion) && isNaN(quantity) && !quantity > 0
        }
    }
    if (inputType === "discover") {
        const first_term = Number(discover_first_term.value)
        const razion = Number(discover_razion.value)
        const term = Number.parseInt(discover_term.value)

        return {
            first_term, razion, term,
            error: isNaN(first_term) && isNaN(razion) && isNaN(term) && !term > 0
        }
    }
}

const generatePa = (first_term, razion, length) => {
    return Array.from({ length }, (_, index) => first_term + razion * index)
}

const discoverTerm = (first_term, razion, n) => {
    // An = A1 + (n - 1) * r
    return first_term + (n - 1) * razion
}

const buildRes = (content, resultWrapper) => {
    const res = document.createElement("div")
    res.className = "res"

    res.innerHTML = `${content}${circle}`

    res.querySelector('svg').onclick = () => {
        resultWrapper.removeChild(res)
    }

    resultWrapper.appendChild(res)
}

const generate_button = document.querySelector("#generate-button")
generate_button.onclick = () => {
    const { error, first_term, razion, quantity } = validadeInputsAndGetValues("generate")
    if(!error){
        const PA = generatePa(first_term, razion, quantity)
        const content = `
        <div>
            Primeiro Termo: ${first_term} <br>
            Razão: ${razion} <br>
            Quantidade: ${quantity} <br>
            PA: (${PA.join(", ")})
        </div>`

        buildRes(content, result_wrapper)
    }
}

const discover_button = document.querySelector("#discover-button")
discover_button.onclick = () => {
    const { error, first_term, razion, term } = validadeInputsAndGetValues("discover")
    if(!error){
        const n_term = discoverTerm(first_term, razion, term)
        const content = `
        <div>
            Primeiro Termo: ${first_term} <br>
            Razão: ${razion} <br>
            Termo: ${n_term}
        </div>`

        buildRes(content, result_wrapper)
    }
}