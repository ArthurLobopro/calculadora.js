const { CalculatorBase, createElement, buildResultDiv } = require('../Elements')
const path = require('path')
const Paths = require('../../Paths')

const calculateFunctions = {
    generate: {
        pa(first_term, razion, length) {
            return Array.from({ length }, (_, index) => first_term + razion * index)
        },
        pg(first_term, razion, length) {
            return Array.from({ length }, (_, index) => first_term * (razion ** index || 1))
        }
    },
    discover: {
        pa(first_term, razion, n) {
            // An = A1 + (n - 1) * r
            return first_term + (n - 1) * razion
        },
        pg(first_term, razion, n) {
            // An = A1 * (n - 1) ** r
            return first_term * (razion ** (n - 1))
        }
    }
}

module.exports = class PAorPG extends CalculatorBase {
    /**
     * @param {"pa" | "pg"} type 
     */
    constructor(type = 'pa') {
        super()
        this.type = type
    }

    getMetadata() {
        const iconPath = path.resolve(Paths.assetsPath, `calculators-icons/${this.type.toUpperCase()}.svg`)

        const title = createElement('title', { innerText: `Gerador de ${this.type.toUpperCase()}` })

        const iconLink = createElement('link', {
            rel: "icon",
            href: iconPath
        })

        const styleLink = createElement('link', {
            rel: "stylesheet",
            href: path.resolve(Paths.calculatorsPath, this.type, "index.css")
        })

        return [title, iconLink, styleLink]
    }

    build() {
        const screen = createElement('div', { id: "container" })
        screen.innerHTML = `
        <div class="menu">
            <button class="selected" data-menu="generate">Gerar</button>
            <button data-menu="discover">Descobrir Termo</button>
        </div>
        <div class="screen-wrapper">
            <div class="screen visible" id="generate">
                <div class="grid-input-group">
                    Primeiro Termo: <input type="number" id="generate-first-term">
                    Razão: <input type="number" id="generate-razion">
                    Quantidade: <input type="number" id="generate-quantity">
                </div>
                <button class="submit" id="generate-button">Gerar</button>
            </div>
            <div class="screen" id="discover">
                <div class="grid-input-group">
                    Primeiro Termo: <input type="number" id="dicover-first-term">
                    Razão: <input type="number" id="discover-razion">
                    Termo: <input type="number" id="discover-term">
                </div>
                <button class="submit" id="discover-button">Descobrir</button>
            </div>
        </div>
        <div id="result-wrapper">
            <div id="result"></div>
        </div>`

        this.elements = {
            menuScreens: Array.from(screen.querySelectorAll(".screen-wrapper > .screen")),
            menuButtons: screen.querySelectorAll(".menu > button"),

            result_wrapper: screen.querySelector("#result"),

            generate_first_term: screen.querySelector("#generate-first-term"),
            generate_razion: screen.querySelector("#generate-razion"),
            generate_quantity: screen.querySelector("#generate-quantity"),

            discover_first_term: screen.querySelector("#dicover-first-term"),
            discover_razion: screen.querySelector("#discover-razion"),
            discover_term: screen.querySelector("#discover-term"),

            generate_button: screen.querySelector("#generate-button"),
            discover_button: screen.querySelector("#discover-button"),
        }

        this.screen = screen
    }

    addEvents() {
        const {menuButtons, menuScreens,discover_button, generate_button, result_wrapper} = this.elements

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

        generate_button.onclick = () => {
            const { error, first_term, razion, quantity } = this.validadeInputsAndGetValues("generate")
            if (!error) {
                const progression = calculateFunctions.generate[this.type](first_term, razion, quantity)
                const content = `
                <div>
                    Primeiro Termo: ${first_term} <br>
                    Razão: ${razion} <br>
                    Quantidade: ${quantity} <br>
                    ${this.type.toUpperCase()}: (${progression.join(", ")})
                </div>`
        
                buildResultDiv(content, result_wrapper)
            }
        }
        
        discover_button.onclick = () => {
            const { error, first_term, razion, term } = this.validadeInputsAndGetValues("discover")
            if (!error) {
                const n_term = calculateFunctions.discover[this.type](first_term, razion, term)
                const content = `
                <div>
                    Primeiro Termo: ${first_term} <br>
                    Razão: ${razion} <br>
                    Termo: ${n_term}
                </div>`
        
                buildResultDiv(content, result_wrapper)
            }
        }
    }

    /**
     * @param {"generate" | "discover"} inputType
     */
    validadeInputsAndGetValues(inputType) {
        const isNaN = num => Number.isNaN(num)

        if (inputType === "generate") {
            const { generate_first_term, generate_quantity, generate_razion } = this.elements

            const first_term = Number(generate_first_term.value)
            const razion = Number(generate_razion.value)
            const quantity = Number.parseInt(generate_quantity.value)

            return {
                first_term, razion, quantity,
                error: isNaN(first_term) && isNaN(razion) && isNaN(quantity) && !(quantity > 0)
            }
        }

        if (inputType === "discover") {
            const { discover_first_term, discover_razion, discover_term } = this.elements

            const first_term = Number(discover_first_term.value)
            const razion = Number(discover_razion.value)
            const term = Number.parseInt(discover_term.value)

            return {
                first_term, razion, term,
                error: isNaN(first_term) && isNaN(razion) && isNaN(term) && !(term > 0)
            }
        }
    }
}