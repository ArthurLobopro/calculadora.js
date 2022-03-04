const path = require('path')

const getArgValue = arg => {
    const argString = process.argv.find( argvArg => argvArg.includes(arg))
    return argString.split("=")[1]
}

const appPath = getArgValue("--app-path")

const paths = {
    appPath,
    assetsPath: path.resolve(appPath, 'assets'),
    calculatorsPath: path.resolve(appPath, 'src', 'calculators')
}

module.exports = paths