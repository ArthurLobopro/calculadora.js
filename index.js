const get = id => document.getElementById(id)

import keyFunctions from "./scripts/key-functions.js"
import { calc } from "./scripts/operations-functions.js"


document.addEventListener("DOMContentLoaded",()=>{
    const body = document.body
    const  visorDown = document.getElementById("down-visor")
    const visorUp = get("up-visor")
    const operations = ["+","-","x","/","%"]

    body.onkeydown = event => {
        const key = String(event.key)

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
            visorUp.innerText == "" ?  keyFunctions.parse(key) : keyFunctions[key]()
        }
        
        console.log(key);
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