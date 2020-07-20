# CSS Parser

## Commands

### Benchmark

```shell
npm run benchmark
```

```
> node run/benchmark.tokenize.js


Collecting PostCSS Tokenizer Benchmarks...

PostCSS Tokenizer (Development): 58823 tokens in  8 ms (1.2 times faster)
PostCSS Tokenizer (7.0.32):      49872 tokens in 10 ms


> node run/benchmark.parse.js


Collecting PostCSS Parser Benchmarks...

PostCSS Parser (7.0.32):         6240 values in 12 ms
PostCSS Parser (Development):   58823 values in 20 ms (1.7 times slower)
PostCSS/Selector/Value Parsers: 28491 values in 83 ms (7.0 times slower)
```

### Build

```shell
npm run build
```

```
┌─────────────────────────────────┐
│                                 │
│   Destination: dist/index.cjs   │
│   Bundle Size:  39.16 KB        │
│   Minified Size:  12.51 KB      │
│   Gzipped Size:  3.32 KB        │
│                                 │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│                                 │
│   Destination: dist/index.mjs   │
│   Bundle Size:  38.97 KB        │
│   Minified Size:  12.34 KB      │
│   Gzipped Size:  3.27 KB        │
│                                 │
└─────────────────────────────────┘
┌─────────────────────────────────────┐
│                                     │
│   Destination: dist/index.iife.js   │
│   Bundle Size:  9.31 KB             │
│   Minified Size:  9.31 KB           │
│   Gzipped Size:  2.8 KB             │
│                                     │
└─────────────────────────────────────┘
```

### Lint

```shell
npm run lint
```

All checks should pass.

## Usage

```js
import parseCSSRoot from './dist/parse.cjs'

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
