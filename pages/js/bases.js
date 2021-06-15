import * as convert from "../../public/scripts/bases.js"

const digitos = {
    bin: ["0","1"],
    oct: ["0","1","2","3","4","5","6","7"],
    dec: ["0","1","2","3","4","5","6","7","8","9"],
    hex: ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
}

const get = id => document.getElementById(id)

const validateAndWrite = (digito,base) => {
    let content = ""
    if(digitos[base].indexOf(digito) !== -1) content =  digito
    
    if(input.innerText == "0"){
        input.innerText = content
    }else{
        input.innerText += content
    }
}

const keyFunctions = {
    "Backspace": ()=> {
        const text = input.innerText 
        input.innerText = text.substring(0,text.length - 1)
        if(input.innerText == "")
            input.innerText = "0"
    },

    "Delete": () => input.innerText = "0"
}

const input = get("input")

const calc = () => {
    const base = bases_select.value
    const number = input.innerText
    const dec = base === "dec" ? number : convert[`${base}_to_dec`](number)
    get('hex').innerText = convert.dec_to_hex(dec)
    get('dec').innerText = dec
    get('oct').innerText = convert.dec_to_oct(dec)
    get('bin').innerText = convert.dec_to_bin(dec)
}

const mainKeyDown = event => {
    const base = bases_select.value
    const key = event.key
    validateAndWrite(key.toUpperCase(), base)
    keyFunctions[key]?.()
    calc()
}

window.onkeydown =  mainKeyDown

const clickButtons = event => {
    const key = event.target.dataset.value
    return mainKeyDown({key})
}

const buttons = document.querySelectorAll('.button')
buttons.forEach( e => e.onclick = clickButtons)

const bases_select = get("bases")

bases_select.onchange = () => {
    const newBase = bases_select.value
    const value = get(newBase).innerText
    input.innerText = value
    buttons.forEach( b => {
        if(b.classList.contains('disable')){
            b.classList.remove('disable')
        }
    })
    buttons.forEach( b => {
        const value = b.dataset.value
        if(digitos[newBase].indexOf(value) === -1){
            b.classList.add('disable')
        }
    })
    document.querySelector('[data-value="Backspace"]').classList.remove('disable')
    calc()
}