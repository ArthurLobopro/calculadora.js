//@ts-check

/** 
 * @param {number} num
 * @returns {number}
 * */
const getDecimalNumberLength = num => String(num).length - String(num).indexOf('.') - 1

/**
 * @param {number} n1 Primeiro termo da soma
 * @param {number} n2 Segundo termo da 
 * @returns {number}
 */
function soma(n1, n2) {
    const n1_length = getDecimalNumberLength(n1)
    const n2_length = getDecimalNumberLength(n2)
    const multiplier = 1 * 10 ** Math.max(n1_length, n2_length)
    return (n1 * multiplier + n2 * multiplier) / multiplier
}

/**
 * @param {number} n1 Primeiro termo da subtração
 * @param {number} n2 Segundo termo da subtração
 * @returns {number}
 */
function sub(n1, n2) {
    const n1_length = getDecimalNumberLength(n1)
    const n2_length = getDecimalNumberLength(n2)
    const multiplier = 1 * 10 ** Math.max(n1_length, n2_length)
    return (n1 * multiplier - n2 * multiplier) / multiplier
}

/**
 * @param {number} n1 Primeiro termo da multiplicação
 * @param {number} n2 Segundo termo da multiplicação
 * @returns {number}
 */
function mult(n1, n2) {
    const n1_length = getDecimalNumberLength(n1)
    const n2_length = getDecimalNumberLength(n2)
    const multiplier = 1 * 10 ** Math.max(n1_length, n2_length)
    return (n1 * multiplier) * (n2 * multiplier) / (multiplier * multiplier)
}

/**
 * @param {number} n1 Primeiro termo da divisão
 * @param {number} n2 Segundo termo da divisão
 * @returns {number | Error}
 */
function div(n1, n2) {
    if (n2 === 0) {
        return new Error("Não é possível dividir por 0")
    }
    const n1_length = getDecimalNumberLength(n1)
    const n2_length = getDecimalNumberLength(n2)
    const multiplier = 1 * 10 ** Math.max(n1_length, n2_length)
    const result = (n1 * multiplier) / (n2 * multiplier)
    return result
}

/**
 * @param {number} n Número a ser potencializado
 * @param {number} exp Expoente, o valor padrão é `2`
 * @returns {number}
 */
function pow(n, exp = 2) {
    const n_length = getDecimalNumberLength(n)
    const multiplier = 1 * 10 ** n_length
    let total = 1
    if (exp >= 0) {
        for (let i = 0; i < exp; i++) {
            total *= (n * multiplier)
        }
        return total / multiplier ** exp
    } else {
        for (let i = 0; i > exp; i--) {
            //@ts-ignore
            total = mult(total, div(n, multiplier))
        }
        return total
    }
}

module.exports = Object.freeze({
    soma, sub, mult, div, pow
})