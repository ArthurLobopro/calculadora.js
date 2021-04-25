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
    
    "parse": parceTop,

    "Enter": ()=> {
        if(visorDown.innerText !== "" && visorUp.innerText !== ""){
            calc()
        }
    }
}
export default keyFunctions