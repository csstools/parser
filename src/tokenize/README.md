# tokenize

The **tokenize** function reads from CSS text and returns a function for consuming tokens from it, known as an **iterator**.

The **iterator** function returns true whenever a new token value is consumed.
The value is accessible from the `value` property on the **iterator**.

**Example**

```ts
iterator = tokenize(`word @atword #hash ! /* comment */`)
values = []

while (iterator() === true) values.push(iterator.value)

values /* [
  CSSWord { value: `word`, source: { line: 1, column: 0 } },
  CSSSpace { value: ` `, source: { line: 1, column: 4 } },
  CSSAtWord { value: `atword`, symbol: `@`, source: { line: 1, column: 5 } },
  CSSSpace { value: ` `, source: { line: 1, column: 12 } },
  CSSHash { value: `hash`, symbol: `#`, source: { line: 1, column: 13 } },
  CSSSpace { value: ` `, source: { line: 1, column: 18 } },
  CSSSymbol { value: `!`, type: 33, source: { line: 1, column: 21 } },
  CSSSpace { value: ` `, source: { line: 1, column: 20 } },
  CSSComment { value: `comment`, opening: `/*`, closing: `*​/`, source: { line: 1, column: 21 } },
] */
```
