import 'isomorphic-fetch'

import fs from 'fs/promises'

(async () => {
	const rex = /^(00(?:[0-7][0-9A-F]|80))[^A-Z]+([A-Z ]+)\n/mg
	const res = await fetch(`https://www.unicode.org/Public/UCD/latest/ucd/NamesList.txt`)
	const txt = await res.text()
	let str = ``
	let arr
	while ((arr = rex.exec(txt)) !== null) str = str.concat(`export const ${arr[2].replace(/[^A-Z]+/g, '_')} = 0x${arr[1]}\n`)
	await fs.writeFile(`enums.js`, str)
})()
