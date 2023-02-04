import path from 'path'
import fs from 'fs'

export function loadSVG(...PathSegments: string[]) {
    return fs.readFileSync(path.resolve(...PathSegments), { encoding: "utf-8" })
}