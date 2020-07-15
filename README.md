# CSS Parser

## Commands

### Benchmark

```shell
npm run benchmark
```

```
Collecting PostCSS Tokenizer Benchmarks...

PostCSS Tokenizer (7.0.32):      49872 tokens in  8 ms
PostCSS Tokenizer (Development): 58823 tokens in 14 ms (1.8 times slower)

Collecting PostCSS Parser Benchmarks...

PostCSS Parser (7.0.32):         6240 tokens in  20 ms
PostCSS Parser (Development):   67811 tokens in  35 ms (1.7 times slower)
PostCSS/Selector/Value Parsers: 28491 tokens in 157 ms (7.7 times slower)
```

### Build

```shell
npm run build
```

```
┌─────────────────────────────────┐
│                                 │
│   Destination: dist/parse.cjs   │
│   Bundle Size:  39.37 KB        │
│   Minified Size:  13.04 KB      │
│   Gzipped Size:  3.18 KB        │
│                                 │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│                                 │
│   Destination: dist/parse.mjs   │
│   Bundle Size:  39.27 KB        │
│   Minified Size:  12.95 KB      │
│   Gzipped Size:  3.14 KB        │
│                                 │
└─────────────────────────────────┘
┌─────────────────────────────────────┐
│                                     │
│   Destination: dist/parse.iife.js   │
│   Bundle Size:  9.77 KB             │
│   Minified Size:  9.76 KB           │
│   Gzipped Size:  2.54 KB            │
│                                     │
└─────────────────────────────────────┘
```

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
