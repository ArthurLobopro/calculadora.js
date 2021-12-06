const dec_to = (dec, base) => {
    let found = false
    let num = []
    do {
        num.push(dec % base)
        dec = Math.floor(dec / base)
        found = dec == 0 ? true : false
    } while (!found)
    return base == 16 ? num : String(num.reverse().join(''))
}

const to_dec = (num, base) => {
    num = String(num).split('').reverse()
    let mult = 1, dec = 0
    for (let i of num) {
        dec += mult * Number(i)
        mult *= base
    }
    return dec
}

const dec_to_hex = dec => {
    const hexn = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    let hex = dec_to(dec, 16)
    for (let i in hex) { hex[i] = hexn[hex[i]] }
    return String(hex.reverse().join(''))
}

const hex_to_dec = hex => {
    const numbers = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 }
    hex = String(hex).toUpperCase().split('').reverse()
    for (let i in hex) {
        hex[i] = (Number(hex[i]) >= 0 && Number(hex[i]) <= 9) ? Number(hex[i]) : numbers[hex[i]]
    }
    let mult = 1, dec = 0
    for (let i of hex) {
        dec += mult * Number(i)
        mult *= 16
    }
    return dec
}

const dec_to_bin = dec => dec_to(dec, 2)
const dec_to_oct = dec => dec_to(dec, 8)
const bin_to_dec = bin => to_dec(bin, 2)
const bin_to_oct = bin => dec_to_oct(bin_to_dec(bin))
const bin_to_hex = bin => dec_to_hex(bin_to_dec(bin))
const oct_to_dec = oct => to_dec(oct, 8)
const oct_to_bin = oct => dec_to_bin(oct_to_dec(oct))
const oct_to_hex = oct => dec_to_hex(oct_to_dec(oct))
const hex_to_bin = hex => dec_to_bin(hex_to_dec(hex))
const hex_to_oct = hex => dec_to_oct(hex_to_dec(hex))

module.exports = {
    dec_to, to_dec, // *Pode ser usada em qualquer base que use apenas números (minimo binário, max decimal)
    dec_to_bin, dec_to_oct, dec_to_hex, //Conversões decimal => base
    bin_to_dec, oct_to_dec, hex_to_dec, // Conversões base => decimal
    bin_to_oct, bin_to_hex, //Conversões binário => base
    oct_to_bin, oct_to_hex, //Conversões octal => base
    hex_to_bin, hex_to_oct  //Conversões hexadecimal => base
}