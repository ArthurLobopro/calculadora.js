const hex_digits_list = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
const hex_numbers = Object.fromEntries(hex_digits_list.map((item, index) => [item, index]))

/**
 * 
*  @param dec Decimal number to convert
 * @param base Base number to convert `(2-10 only)`
 * @returns Decimal number converted to new Base
 */
export const dec_to = (dec: number, base: number): string => {
    if (base < 2 || base > 10) {
        throw new Error(`Target base ${base} is not valid,this function needs abase from 2 to 10`)
    }

    let found = false
    const digits = []

    do {
        digits.push(dec % base)
        dec = Math.floor(dec / base)
        found = dec === 0
    } while (!found)

    return String(digits.reverse().join(''))
}

/**
 * 
 * @param num Number to convert to decimal
 * @param base Base of supplied number `(2-10 only)`
 * @returns Decimal number converted
 */
export const to_dec = (num: number | string, base: number): number => {
    if (base < 2 || base > 10) {
        throw new Error(`Target base ${base} is not valid,this function needs abase from 2 to 10`)
    }

    const digits = String(num).split('').reverse()
    let dec = 0

    digits.forEach((digit, index) => dec += Number(digit) * base ** index)

    return dec
}

/**
 * 
 * @param dec Decimal number to convert in hexadecimal
 * @returns Hexadecimal as string
 */
export const dec_to_hex = (dec: number) => {
    const digits = []
    let found = false

    do {
        digits.push(dec % 16)
        dec = Math.floor(dec / 16)
        found = dec == 0 ? true : false
    } while (!found)

    const hex_digits = digits.map(digit => hex_digits_list[digit])

    return String(hex_digits.reverse().join(''))
}

/**
 * 
 * @param hex Hex string to convert to dec
 * @returns Decimal number
 */
export const hex_to_dec = (hex: string) => {
    const hex_digits = String(hex).toUpperCase().split('').reverse().map(digit => {
        const number_digit = Number(digit)
        return !Number.isNaN(number_digit) ? number_digit : hex_numbers[digit]
    })

    const dec = hex_digits.map((digit, index) => digit * 16 ** index).reduce((total, value) => total + value, 0)

    return dec
}

export const dec_to_bin = (dec: number | string) => dec_to(Number(dec), 2)
export const dec_to_oct = (dec: number | string) => dec_to(Number(dec), 8)
export const bin_to_dec = (bin: string) => to_dec(bin, 2)
export const bin_to_oct = (bin: string) => dec_to_oct(bin_to_dec(bin))
export const bin_to_hex = (bin: string) => dec_to_hex(bin_to_dec(bin))
export const oct_to_dec = (oct: string) => to_dec(oct, 8)
export const oct_to_bin = (oct: string) => dec_to_bin(oct_to_dec(oct))
export const oct_to_hex = (oct: string) => dec_to_hex(oct_to_dec(oct))
export const hex_to_bin = (hex: string) => dec_to_bin(hex_to_dec(hex))
export const hex_to_oct = (hex: string) => dec_to_oct(hex_to_dec(hex))