const get = id => document.getElementById(id)

import keyFunctions from "./scripts/key-functions.js"


document.addEventListener("DOMContentLoaded",()=>{
    const body = document.body
    const  visorDown = document.getElementById("down-visor")
    body.onkeydown = event => {
        const key = String(event.key)

        if(key == Number(key)){
            visorDown.innerText += key
        }

        if(keyFunctions[key]){
            keyFunctions[key]()
        }

        console.log(key);
    }

    const buttons = document.querySelectorAll(".button")
    for(let e of buttons){
        e.onclick = event => visorDown.innerText += event.target.innerText
    }
   
})