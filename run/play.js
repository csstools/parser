import tokenize from '../dist/tokenize.js'

const play = tokenize(`/*comment*/ "string"word@atword#hash;1em;23!`)

while (play.read() === true) console.log(play.type)
