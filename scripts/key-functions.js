import { calc, parceTop } from "./operations-functions.js";
const get = id => document.getElementById(id)

const visorDown = get("down-visor")
const visorUp = get("up-visor")

const keyFunctions = {
    "Backspace": ()=> {
        const text = visorDown.innerText 
        visorDown.innerText = text.substring(0,text.length - 1)
        if(visorDown.innerText == "")
            visorDown.innerText = "0"
    },

    "Delete": () => visorDown.innerText = "0",
    "Escape": () => {
        visorDown.innerText = "0"
        visorUp.innerText = ""
    },

    "*": ()=> {
        const event = new Event("keydown")
        event.key = "x"
        document.body.dispatchEvent(event)
    },
    "pow": ()=> {
        const text = visorDown.innerText.replaceAll(" ","").replaceAll(",",".")
        visorDown.innerText = Number(text)**2
    },
    "sqrt": ()=> {
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
export default keyFunctions