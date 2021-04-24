import { soma,calc } from "./operations-functions.js";
const  visorDown = document.getElementById("down-visor")

const keyFunctions = {
    "Backspace": ()=> {
        const text = visorDown.innerText 
        visorDown.innerText = text.substring(0,text.length - 1)
    },

    "Delete": () => visorDown.innerText = "0",
    
    "+": () => {
        visorDown.innerText += " +"
        soma()
    } ,
    "Enter": calc
}
export default keyFunctions