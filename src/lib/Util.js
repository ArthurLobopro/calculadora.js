const path = require('path')
const fs = require('fs')

function loadSVG(...PathSegments) {
    return fs.readFileSync(path.resolve(...PathSegments), {encoding: "utf-8"})
}

const range = (min,max,pass=1) => {
    if(pass == 0){
        throw new Error("Pass can't be equal to 0")
    }

    let array = []
    if(min > max){
        pass = pass > 0 ? pass : pass * -1
        for(let i = min;i>=max;i-=pass){ array.push(i) }
        return array
    }

    if(pass < 0){
        throw new Error("Pass can't be less than 0 on crescent range")
    }

    for(let i = min;i<=max;i+=pass){ array.push(i) }
    return array
}

module.exports =  { loadSVG, range }