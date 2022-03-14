const { loadSVG } = require("./Util")
const Paths = require('../Paths')
const circle = loadSVG(Paths.appPath, "assets", "circle-x.svg")

function buildResultDiv(content, resultWrapper) {
    const result_div = document.createElement("div")
    result_div.className = "res"
    result_div.innerHTML = `${content}${circle}`

    result_div.querySelector('svg').onclick = () => {
        resultWrapper.removeChild(result_div)
    }

    resultWrapper.appendChild(result_div)
}

function createElement(elementName = 'div', { dataset = {}, ...options }) {
    const element = document.createElement(elementName)

    Object.entries(dataset).forEach(([property, value]) => element.dataset[property] = value)

    Object.entries(options).forEach(([property, value]) => element[property] = value)

    return element
}

function createButtonList(buttonListOptions = [{ dataset, content, ...options }]) {
    return buttonListOptions.map(({ dataset, content, ...options }) => {
        return createElement('button', { dataset, innerHTML: content, ...options }).outerHTML
    })
}

class CalculatorBase {
    constructor() {
        this.build()
        this?.addEvents()
    }

    appendMetadata() {
        this.getMetadata().forEach(tag => document.head.appendChild(tag))
    }

    append() {
        this.appendMetadata()
        document.body.appendChild(this.screen)
    }
}

module.exports = Object.freeze({
    buildResultDiv,
    CalculatorBase,
    createButtonList,
    createElement
})