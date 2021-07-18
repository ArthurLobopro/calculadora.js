import { calc, parceTop } from "./operations-functions.js";
import { div } from "./correct_operations.js"
const get = id => document.getElementById(id)

const visorDown = get("down-visor")
const visorUp = get("up-visor")

const verifyAndCalc = () => {
    if(visorUp.innerText.length > 0){
        calc()
    }
}

const keyFunctions = {
    "Backspace": ()=> {
        const text = visorDown.innerText 
        visorDown.innerText = text.substring(0,text.length - 1)
        if(visorDown.innerText == "" || visorDown.innerText == "Indefinido")
            visorDown.innerText = "0"
    },

    "Delete": () => visorDown.innerText = "0",
    "Escape": () => {
        visorDown.innerText = "0"
        visorUp.innerText = ""
    },

    "Control++":() => {
        if(Number(visorDown.innerText) < 0){
            visorDown.innerText = Number(visorDown.innerText) * -1
        }
    },

    "Control+-":() => {
        if(Number(visorDown.innerText) > 0){
            visorDown.innerText = Number(visorDown.innerText) * -1
        }
    },

    "*": () => {
        verifyAndCalc()
        const event = new Event("keydown")
        event.key = "x"
        document.body.dispatchEvent(event)
    },
    "-or+": () => {
        const text = visorDown.innerText

        if(text == "0") return

        visorDown.innerText = Number(text) * -1
    },
    "1/x": () => {
        visorDown.innerText = div(1, Number(visorDown.innerText))
    },
    "pow": () => {
        const text = visorDown.innerText.replaceAll(" ","").replaceAll(",",".")
        visorDown.innerText = Number(text)**2
    },
    "sqrt": () => {
        const text = visorDown.innerText.replaceAll(" ","").replaceAll(",",".")
        visorDown.innerText = Math.sqrt(Number(text))
    },
    
    "parse": parceTop,

    "Enter": ()=> {
        if(visorDown.innerText !== "" && visorUp.innerText !== ""){
            calc()
        }
    }
}
export { keyFunctions,verifyAndCalc }