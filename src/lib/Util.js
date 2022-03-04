const path = require('path')
const fs = require('fs')

function loadSVG(...PathSegments) {
    return fs.readFileSync(path.resolve(...PathSegments), { encoding: "utf-8" })
}

const range = (min, max, pass = 1) => {
    if (pass == 0) {
        throw new Error("Pass can't be equal to 0")
    }

    let array = []
    if (min > max) {
        pass = pass > 0 ? pass : pass * -1
        for (let i = min; i >= max; i -= pass) { array.push(i) }
        return array
    }

    if (pass < 0) {
        throw new Error("Pass can't be less than 0 on crescent range")
    }

    for (let i = min; i <= max; i += pass) { array.push(i) }
    return array
}

const createElement = (elementName = 'div', {dataset = {}, ...options}) => {
    const element = document.createElement(elementName)

    Object.entries(dataset).forEach( ([property, value]) => element.dataset[property] = value)

    Object.entries(options).forEach(([property, value]) => element[property] = value)

    return element
}

const createButtonList = (buttonListOptions = [{dataset, content, ...options}]) => {
    return buttonListOptions.map( ({dataset, content, ...options}) => {
        return createElement('button', {dataset, innerHTML: content, ...options}).outerHTML
    })
}

module.exports = { loadSVG, range, createElement, createButtonList}