import { readFileSync } from 'fs'
import resolve from 'resolve'

import { parseRoot } from './parse.js'

const bootstrapCSSPath = resolve.sync(`bootstrap/dist/css/bootstrap.css`)
const bootstrapCSS = readFileSync(bootstrapCSSPath, `utf8`)

const input = { file: `-`, data: bootstrapCSS }
const root = parseRoot(input)

console.log(root.toString() === bootstrapCSS)
