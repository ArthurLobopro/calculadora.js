const convert = require('lib/bases.js')
const { createElement } = require('lib/Util')
const path = require("path")
const paths = require('../../Paths')

const digits = {
    bin: ["0", "1"],
    oct: ["0", "1", "2", "3", "4", "5", "6", "7"],
    dec: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    hex: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
}

class BasesCalculator {
    constructor() {
        this.build()
        this.addEvents()
    }

    getMetadata(){
        const title = createElement('title', { innerText: "Bases Decimais" })

        const iconLink = createElement('link', {
            rel: "icon",
            href: path.resolve(paths.assetsPath, "calculators-icons","binary.svg")
        })

        const styleLink = createElement('link', {
            rel: "stylesheet",
            href: path.resolve(__dirname, "./bases.css")
        })

        return [title, iconLink, styleLink]
    }

    appendMetadata() {
        this.getMetadata().forEach(tag => document.head.appendChild(tag))
    }

    append() {
        this.appendMetadata()
        document.body.appendChild(this.screen)
    }

    build() {
        const screen = createElement('div', { id: "container" })
        screen.innerHTML = `
        <div id="visor">
            <div id="input">0</div>
            <div>
                <div>HEX: <span id="hex">0</span></div>
                <div>DEC: <span id="dec">0</span></div>
                <div>OCT: <span id="oct">0</span> </div>
                <div>BIN: <span id="bin">0</span></div>
            </div>
        </div>
        <div id="keyboard">
            <select class="long" id="bases">
                <option value="dec">Decimal</option>
                <option value="hex">Hexadecimal</option>
                <option value="oct">Octal</option>
                <option value="bin">Binário</option>
            </select>

            <button data-value="Delete">CE</button>
            <button data-value="Backspace">
                <img src="${path.resolve(paths.assetsPath, "keyboard","delete.svg")}" alt="Apagar">
            </button>

            <button data-value="0">0</button>
            <button class="disable" data-value="A">A</button>
            <button class="disable" data-value="B">B</button>
            <button class="disable" data-value="C">C</button>

            <button data-value="1">1</button>
            <button data-value="2">2</button>
            <button data-value="3">3</button>
            <button class=" disable" data-value="D">D</button>  

            <button data-value="4">4</button>
            <button data-value="5">5</button>
            <button data-value="6">6</button>
            <button class="disable" data-value="E">E</button>
            
            <button data-value="7">7</button>
            <button data-value="8">8</button>  
            <button data-value="9">9</button>
            <button class="disable" data-value="F">F</button>
        </div>`

        this.elements = {
            buttons: screen.querySelectorAll('button'),
            bases_select: screen.querySelector('select#bases'),
            input: screen.querySelector("#input"),
            bases: {
                hex: screen.querySelector("#hex"),
                bin: screen.querySelector("#bin"),
                dec: screen.querySelector("#dec"),
                oct: screen.querySelector("#oct")
            }
        }

        this.screen = screen
    }

    addEvents() {
        const { buttons, bases_select, input } = this.elements
        buttons.forEach(button => button.onclick = () => {
            const key = button.dataset.value
            return mainKeyDown({ key })
        })

        bases_select.onchange = () => {
            const newBase = bases_select.value
            const value = this.elements.bases?.[newBase].innerText
            input.innerText = value

            buttons.forEach(button => {
                if (button.classList.contains('disable')) {
                    button.classList.remove('disable')
                }
            })

            buttons.forEach(button => {
                const value = button.dataset.value
                if (digits[newBase].indexOf(value) === -1 && digits.hex.includes(button.dataset.value)) {
                    button.classList.add('disable')
                }
            })

            this.calc()
        }

        const mainKeyDown = event => {
            const base = bases_select.value
            const { key } = event
            validateAndWrite(key.toUpperCase(), base)
            keyFunctions[key]?.()
            this.calc()
        }
        window.onkeydown = mainKeyDown

    }

    calc() {
        const {bases_select, input} = this.elements
        const { hex: hex_span, dec: dec_span, oct: oct_span, bin: bin_span } = this.elements.bases

        const base = bases_select.value
        const input_value = input.innerText
        const decimal_value = base === "dec" ? input_value : convert[`${base}_to_dec`](input_value)

        hex_span.innerText = convert.dec_to_hex(decimal_value)
        dec_span.innerText = decimal_value
        oct_span.innerText = convert.dec_to_oct(decimal_value)
        bin_span.innerText = convert.dec_to_bin(decimal_value)
    }
}

const screen = new BasesCalculator()
screen.append()

const input = screen.elements.input

const validateAndWrite = (digito, base) => {
    if (digits[base].indexOf(digito) !== -1) {
        let content = digito
        if (input.innerText == "0") {
            input.innerText = content
        } else {
            input.innerText += content
        }
    }
}

const keyFunctions = {
    "Backspace": () => {
        const text = input.innerText
        input.innerText = text.substring(0, text.length - 1) || "0"            
    },

    "Delete": () => input.innerText = "0"
}