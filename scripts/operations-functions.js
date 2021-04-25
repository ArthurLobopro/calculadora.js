const get = id => document.getElementById(id)
const  visorDown = get("down-visor")
const visorUp = get("up-visor")
const operations_simbols = ["+","-","*","/"]

const operations = {
    "+": (n1,n2) =>  n1 + n2,
    "-": (n1,n2) => n1 - n2,
    "/": (n1,n2) => n1/n2,
    "*": (n1,n2) => n1 * n2
}

const parceTop = key => {
    const text = visorDown.innerText 
    visorDown.innerText = ""
    visorUp.innerText = `${text} ${key}`
}

const calc = () => {
    const text = String( visorUp.innerText + visorDown.innerText ).replaceAll(" ","").replaceAll(",",".")
    let key

    for(let s of operations_simbols){
        if(text.indexOf(s) !== -1){
            key = s
            break
        }
    }
    
    let values = text.split(key)
    const total = operations[key]( Number(values[0]), Number(values[1]))
    visorUp.innerText = ""
    visorDown.innerText = String(total).replaceAll(".",",")
}

export { calc, parceTop }