# CSS Parser

## Commands

### Benchmark

```shell
npm run benchmark
```

```
> node run/benchmark.tokenize.js


Collecting PostCSS Tokenizer Benchmarks...

PostCSS Tokenizer (7.0.32):      49872 tokens in  8 ms
PostCSS Tokenizer (Development): 58823 tokens in 13 ms (1.6 times slower)


> node run/benchmark.parse.js


Collecting PostCSS Parser Benchmarks...

PostCSS Parser (7.0.32):         6240 tokens in  22 ms
PostCSS Parser (Development):   67811 tokens in  27 ms (1.2 times slower)
PostCSS/Selector/Value Parsers: 28491 tokens in 100 ms (4.6 times slower)
```

### Build

```shell
npm run build
```

```
┌─────────────────────────────────┐
│                                 │
│   Destination: dist/parse.cjs   │
│   Bundle Size:  38.15 KB        │
│   Minified Size:  11.82 KB      │
│   Gzipped Size:  3.13 KB        │
│                                 │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│                                 │
│   Destination: dist/parse.mjs   │
│   Bundle Size:  38.05 KB        │
│   Minified Size:  11.73 KB      │
│   Gzipped Size:  3.09 KB        │
│                                 │
└─────────────────────────────────┘
┌─────────────────────────────────────┐
│                                     │
│   Destination: dist/parse.iife.js   │
│   Bundle Size:  8.84 KB             │
│   Minified Size:  8.84 KB           │
│   Gzipped Size:  2.6 KB             │
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
