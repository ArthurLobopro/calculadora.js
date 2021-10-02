const get = id => document.getElementById(id)

import { calc, parceTop } from "../../lib/operations-functions.js"

import { div } from "../../lib/correct_operations.js"

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

document.addEventListener("DOMContentLoaded",()=>{
    const body = document.body
    const operations = ["+","-","x","/","%","^"]

    window.onkeydown = event => {
        const key = String(event.key)

        console.log(key);

        if(event.ctrlKey){
            return keyFunctions[`Control+${key}`]?.()
        }

        if(key == Number(key)){
            if(visorDown.innerText == "0"){
                visorDown.innerText = key
            }else{
                visorDown.innerText += key
            }
        }

        if(key == ","){
            visorDown.innerText += key
        }

        if(keyFunctions[key] && operations.indexOf(key) === -1){
            keyFunctions[key]()
        }

        if(operations.indexOf(key) !== -1){
            verifyAndCalc()
            visorUp.innerText == "" ?  keyFunctions.parse(key) : keyFunctions[key]()
        }
    }

    const buttons = document.querySelectorAll(".button")
    for(let e of buttons){
        e.onclick = event => {
            const key = event.target.dataset.value

            if(keyFunctions[key]){
                keyFunctions[key]()
                return
            }

            if(operations.indexOf(key) !== -1){
                visorUp.innerText == "" ?  keyFunctions.parse(key) : keyFunctions[key]()
            }else if(key === "="){
                calc()
            }else{
                if(key == Number(key)){
                    if(visorDown.innerText == "0"){
                        visorDown.innerText = key
                    }else{
                        visorDown.innerText += key
                    }
                }
        
                if(key == ","){
                    visorDown.innerText += key
                }
            }

        }
    }
   
})