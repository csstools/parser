# CSS Parser

## CSS Object Model

See [src/values/README.md](src/values/README.md).

## Commands

### Benchmark

```shell
npm run benchmark
```

```
> node run/benchmark.tokenize.js


Collecting PostCSS Tokenizer Benchmarks...

PostCSS Tokenizer (7.0.32):      49872 tokens in  9 ms
PostCSS Tokenizer (Development): 58823 tokens in 11 ms (1.2 times slower)


> node run/benchmark.parse.js


Collecting PostCSS Parser Benchmarks...

PostCSS Parser (7.0.32):         6240 values in 12 ms
PostCSS Parser (Development):   58823 values in 34 ms (2.9 times slower)
PostCSS/Selector/Value Parsers: 28491 values in 74 ms (6.3 times slower)
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

### Test

```shell
npm run test
```

All checks should pass.
