window.onload = () => {
    const format = str => String(str).padStart(2,'0')
    const date =  new Date()
    const dateString = `${date.getFullYear()}-${format(date.getMonth()+1)}-${format(date.getDate())}`
    console.log(dateString);
    console.log(date);
    document.querySelectorAll('input[type="date"]').forEach( e => e.value = dateString)
}

const de = document.getElementById('de')
const para = document.getElementById('para')
const visor = document.getElementById('visor')
const range = (min,max,pass=1) => {
    let array = []
    if(min > max){
        for(let i = min;i>=max;i-=pass){ array.push(i) }
        return array
    }

    for(let i = min;i<=max;i+=pass){ array.push(i) }
    return array
}

const reduceYears = (dias,range) => {
    let anos = 0
    for(let anoAtual of range){
        const diasNoAno = anoAtual % 4 === 0 ? 366 : 365
        if(dias - diasNoAno >=0){
            anos++
            dias-= diasNoAno
        }
    }
    return {dias, anos}
}

const reduceMeses = (dias,{de}) => {
    let meses = 0
    const diasDoMes = [31,28,31,30,31,30,31,31,30,31,30,31]
    let mesAtual = de.getMonth()
    while(true){
        if(dias - diasDoMes[mesAtual] >= 0){
            meses++
            dias-= diasDoMes[mesAtual]
        }else{
            return {dias, meses}
        }
        mesAtual = mesAtual == 11 ? 0 : mesAtual + 1
    }
   
}


function getDiferenca(dias, {de,para}) {
    let anos = 0, meses = 0
    if(dias < 0) dias*= -1

    const difAnos = para.getFullYear() - de.getFullYear()
    if(difAnos !== 0){
        if(difAnos > 0){
            ;({anos,dias} = reduceYears(dias, range(de.getFullYear(), de.getFullYear() + difAnos)))
        }else{
            ;({anos,dias} = reduceYears(dias, range(para.getFullYear(), de.getFullYear() + difAnos)))
        }
    }

    ;({meses,dias} = reduceMeses(dias, {de}))
    
    console.table({anos,meses,dias})
    return {anos,meses,dias}
}

const calc = () => {
    const deValue = String(de.value).split('-')
    const paraValue = String(para.value).split('-')

    const data = {
        de: new Date(deValue),
        para: new Date(paraValue)
    }

    // dana - data = diferença em ms, dividido por 1000 = diferença em segundos, dividido por 86400, diferença em dias
    const dias = ((new Date(paraValue) - new Date(deValue)) /1000 ) / 86400
    const dif = getDiferenca(dias,data)

    visor.innerText = `Anos: ${dif.anos}\nMeses: ${dif.meses}\nDias: ${dif.dias}\n
    Total de dias: ${dias}`

}

[de,para].forEach( input => input.onchange = calc)