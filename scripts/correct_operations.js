function soma(n1,n2){
    let multi = 1
    let n1_l = String(n1).length - String(n1).indexOf('.') - 1
    let n2_l = String(n2).length - String(n2).indexOf('.') - 1
    multi*= (n1_l>n2_l)? 10**n1_l : 10**n2_l
    return (n1 * multi + n2 * multi)/multi
}

function sub(n1,n2){
    let multi = 1
    let n1_l = String(n1).length - String(n1).indexOf('.') - 1
    let n2_l = String(n2).length - String(n2).indexOf('.') - 1
    multi*= (n1_l>n2_l)? 10**n1_l : 10**n2_l
    return (n1 * multi - n2 * multi)/multi
}

function mult(n1,n2){
    let multi = 1
    let n1_l = String(n1).length - String(n1).indexOf('.') - 1
    let n2_l = String(n2).length - String(n2).indexOf('.') - 1
    multi*= (n1_l>n2_l)? 10**n1_l : 10**n2_l
    return (n1*multi) * (n2*multi) / (multi*multi)
}

function div(n1,n2){
    let multi = 1
    let n1_l = String(n1).length - String(n1).indexOf('.') - 1
    let n2_l = String(n2).length - String(n2).indexOf('.') - 1
    multi*= (n1_l>n2_l)? 10**n1_l : 10**n2_l
    const result = (n1*multi) / (n2*multi)
    return Number.isNaN(result) || !Number.isFinite(result) ? "Indefinido" : result
}

function pow(n, exp = 2) {
    let mult = 1
    let n_l = String(n).length - String(n).indexOf('.') - 1
    mult = 10 ** n_l
    let total = 1
    for(let i =0;i<exp; i++){
        total*= (n * mult)
    }
    return total / mult ** exp
}

export { soma, sub, mult, div, pow }