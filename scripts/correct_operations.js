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
    return (n1*multi) / (n2*multi)
}

export {soma, sub, mult, div}