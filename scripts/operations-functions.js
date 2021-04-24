const get = id => document.getElementById(id)
const  visorDown = get("down-visor")
const visorUp = get("up-visor")

const soma = () => {
    const text = visorDown.innerText 
    visorDown.innerText = ""
    visorUp.innerText = text
}

const calc = () => {
    const text = String( visorUp.innerText + visorDown.innerText ).replaceAll(" ","")
    console.log(text);
    let values = text.split("+")
    console.log(values);
    const total = Number(values[0]) + Number(values[1])
    visorUp.innerText = ""
    visorDown.innerText = total
}

export { soma,calc }