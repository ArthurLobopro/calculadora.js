const path = require('path')
const { range, createElement } = require("lib/Util")
const paths = require('../../Paths')

function reduceYears(days, range) {
    let years = 0
    for (let anoAtual of range) {
        const daysOfYear = anoAtual % 4 === 0 ? 366 : 365
        if (days - daysOfYear >= 0) {
            years++
            days -= daysOfYear
        }
    }
    return { days, years }
}

function reduceMonths(days, { from }) {
    let months = 0
    const daysOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let atualMonth = from.getMonth()
    while (true) {
        if (days - daysOfMonths[atualMonth] >= 0) {
            months++
            days -= daysOfMonths[atualMonth]
        } else {
            return { days, months }
        }
        atualMonth = atualMonth == 11 ? 0 : atualMonth + 1
    }

}

function getDifference(days, { from, to }) {
    let years = 0, months = 0
    if (days < 0) days *= -1

    const yearsDiference = to.getFullYear() - from.getFullYear()
    if (yearsDiference !== 0) {
        const initRange = yearsDiference > 0 ? from : to
            ; ({ years, days } = reduceYears(days, range(initRange.getFullYear(), from.getFullYear() + yearsDiference)))
    }

    ; ({ months, days } = reduceMonths(days, { from }))

    return { years, months, days }
}

class DateCalculator {
    constructor() {
        this.build()
        this.addEvents()
    }

    getMetadata() {
        const title = createElement('title', { innerText: "Calculadora de Data" })

        const iconLink = createElement('link', {
            rel: "icon",
            href: path.resolve(paths.assetsPath, "calculators-icons/calendar-icon.svg")
        })

        const styleLink = createElement('link', {
            rel: "stylesheet",
            href: path.resolve(__dirname, "./data.css")
        })

        return [title, iconLink, styleLink]
    }

    appendMetadata() {
        this.getMetadata().forEach(tag => document.head.appendChild(tag))
    }

    append() {
        this.appendMetadata()
        document.body.appendChild(this.screen)
    }

    build() {
        const format = str => String(str).padStart(2, '0')
        const date = new Date()
        const dateString = `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(date.getDate())}`

        this.screen = createElement("div", { id: "container" })
        this.screen.innerHTML = `
            <div class="inputs">
                <span class="def">De:</span>
                <input type="date" id="from" value="${dateString}">
            </div>
            <div class="inputs">
                <span class="def">Para:</span>
                <input type="date" id="to" value="${dateString}">
            </div>
            <span class="def">Diferença:</span>
            <div id="visor"></div>
        `

        const from = this.screen.querySelector('#from')
        const to = this.screen.querySelector('#to')
        const visor = this.screen.querySelector('#visor')

        this.elements = {
            from, to, visor
        }
    }

    addEvents() {
        const { from, to } = this.elements
        Array(from, to).forEach(input => input.onchange = () => this.calc())
    }

    calc() {
        const from_value = String(this.elements.from.value).split('-')
        const to_value = String(this.elements.to.value).split('-')

        const dates = {
            from: new Date(from_value),
            to: new Date(to_value)
        }

        if (dates.from - 1 === dates.to - 1) {
            return this.elements.visor.innerText = "Mesma data"
        }

        const ONE_SECOND = 1000 //ms
        const ONE_DAY = 86400 * ONE_SECOND
        const days = (new Date(to_value) - new Date(from_value)) / ONE_DAY
        const difference = getDifference(days, dates)

        const result_string = [
            difference.years !== 0 ? `Anos: ${difference.years} ano${difference.years !== 1 ? 's' : ''}\n` : '',
            difference.months !== 0 ? `Meses: ${difference.months} ${difference.months === 1 ? 'mês' : 'meses'}\n` : '',
            difference.days !== 0 ? `Dias: ${difference.days} dia${difference.days !== 1 ? 's' : ''}\n` : '',
            `Total de dias: ${days}`
        ].join('')

        this.elements.visor.innerText = result_string
    }
}

const screen = new DateCalculator()
screen.append()