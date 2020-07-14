# CSS Parser

## Commands

### Benchmark

```shell
npm run benchmark
```

```
Collecting PostCSS Tokenizer Benchmarks...

PostCSS Tokenizer (Development): 58633 tokens in 7 ms (1.4 times faster)
PostCSS Tokenizer (7.0.32):      49872 tokens in 9 ms

Collecting PostCSS Parser Benchmarks...

PostCSS Parser (7.0.32):         6240 tokens in 14 ms
PostCSS Parser (Development):   67811 tokens in 24 ms (1.7 times slower)
PostCSS/Selector/Value Parsers: 28491 tokens in 81 ms (5.9 times slower)
```

Presently, `tokenize.js` compiles to ~ 1.91kB, and `parse.js` compiles to ~ 3.81kB (min/gzip).

### Build

#### Build `tokenize`

```shell
npm run build:tokenize
```

```
src/tokenize.js → dist/tokenize.cjs...
created dist/tokenize.cjs in 60ms
```

The compiled size of `dist/tokenize.cjs` is 5397 bytes (1538 gzipped).

#### Build `evaluate`

```shell
npm run build:evaluate
```

```
src/evaluate.js → dist/evaluate.cjs...
created dist/evaluate.cjs in 90ms
```

The compiled size of `dist/evaluate.cjs` is 5685 bytes (1251 gzipped).

### Lint

```shell
npm run lint
```

## Usage

```js
import tokenize from 'src/tokenize.js'

const token = tokenize(`/* Example Comment */`)

// log each token type and token string parts
while (token()) {
  console.log(
    token.type,      // 67
    token.getLead(), // `/*`
    token.getText(), // ` Example Comment `
    token.getTail()  // `/*`
  )
}
```

```js
import evaluate from 'src/evaluate.js'
import tokenize from 'src/tokenize.js'

const token = tokenize(`/* Example Comment */`)
const value = evaluate(token)

// log each token type, evaluation stage, and known value string
while (value()) {
  console.log(
    `${token.type}:${value.enter ? `enter` : `leave`}`, // `67:enter`
    value.node.toString() // `/* Example Comment */`
  )
}
```
