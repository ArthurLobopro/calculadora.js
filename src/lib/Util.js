const path = require('path')
const fs = require('fs')

function loadSVG(...PathSegments) {
    return fs.readFileSync(path.resolve(...PathSegments), {encoding: "utf-8"})
}

const appPath = window.appPath

export { loadSVG, appPath }