const get = id => document.getElementById(id)

import keyFunctions from "./scripts/key-functions.js"


document.addEventListener("DOMContentLoaded",()=>{
    const body = document.body
    const  visorDown = document.getElementById("down-visor")
    const visorUp = get("up-visor")

    body.onkeydown = event => {
        const key = String(event.key)
        const operations = ["+","-","*","/"]

        if(key == Number(key)){
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
        e.onclick = event => visorDown.innerText += event.target.innerText
    }
   
})