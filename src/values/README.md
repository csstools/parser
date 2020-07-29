# CSS Object Model

- [CSSValue](#cssvalue)
  - [CSSToken](#csstoken)
    - [CSSAtWord](#cssatword)
    - [CSSComment](#csscomment)
    - [CSSFunctionWord](#cssfunctionword)
    - [CSSHash](#csshash)
    - [CSSNumber](#cssnumber)
    - [CSSSpace](#cssspace)
    - [CSSString](#cssstring)
    - [CSSSymbol](#csssymbol)
    - [CSSWord](#cssword)
  - [CSSGroup](#cssgroup)
    - [CSSDeclaration](#cssdeclaration)

## CSSValue

The CSSValue class is the foundational class that all other CSS objects extend from.

---

### CSSToken

The CSSToken class is the foundational class for all syntactically significant objects in CSS; which include comments, spaces, names, at-words, function-words, hashes, strings, numbers, and symbols.

#### CSSAtWord

The CSSAtWord class is the token object for all at-prefixed word in CSS.

#### CSSComment

The CSSComment class is the token object for all comments in CSS.

#### CSSFunctionWord

The CSSFunctionWord class is the token object for all function words in CSS.

#### CSSHash

The CSSHash class is the token object for all hashes in CSS.

#### CSSNumber

The CSSNumber class is the token object for all numeric values in CSS.

#### CSSSpace

The CSSSpace class is the token object for all space values in CSS.

#### CSSString

The CSSString class is the token object for all strings in CSS.

#### CSSSymbol

The CSSSymbol class is the token object for all symbols in CSS.

#### CSSWord

The CSSWord class is the token object for all named words in CSS.

---

### CSSGroup

The CSSGroup class is the container object for tokens and other groups with a shared context; and it is the foundational class for sheets, rules, selectors, declarations, and bracketed blocks.

The CSSGroup class organizes objects into categories within its `raw` property.

For example, a CSSDeclaration includes an `raw.name` property which has a `CSSWord` value, an `raw.opening` property which has a `CSSSymbol` value (for the colon), and then another `raw.value` property which has an array of any of its group and token values.
Meanwhile, any spaces or comments between the colon and value are put into an `raw.betweenOpeningAndValue` property.

---

### CSSDeclaration

The CSSDeclaration class is the container object for style declarations in CSS.

To consume a declaration, assuming the current value is a `CSSWord`:

- Create a new `CSSDeclaration`.
- Assign the current `CSSWord` value to `CSSDeclaration#name`.
- Advance the current value or return the incomplete `CSSDeclaration`.
- While the current value is a `CSSComment` or `CSSSpace` value;
  - Assign the current value to `CSSDeclaration#betweenNameAndOpening`; and,
  - Advance the current value.
- If the current value is not `CSSSymbol<":">`;
  - Return the incomplete `CSSDeclaration`.
- Otherwise, assign the current value to `CSSDeclaration#opening`.
- Advance the current value.
- While the current value is a `CSSComment` or `CSSSpace` value;
  - Assign the current value to `CSSDeclaration#betweenOpeningAndValue`; and,
  - Advance the value.
- While the current value is accessible;
  - Push the current value to `CSSDeclaration#value`.
- Move any trailing `CSSComment` or `CSSSpace` values from `CSSDeclaration#value` to `CSSDeclaration#betweenValueAndClosing`.
- If the last value of `CSSDeclaration#value` is a `CSSWord`; and,
  - Skipping any values before that which are a `CSSComment` or `CSSSpace`; and,
    - A `CSSSymbol<"!">` value is encountered; then,
      - Create a new `CSSPriority`, assigned to `CSSDeclaration#priority`.
      - Assign the `CSSSymbol<"!">` value to `CSSPriority#symbol`.
      - Assign the `CSSWord` value to `CSSPriority#value`.
      - Move any values between the `CSSSymbol<"!">` and the `CSSWord` to `CSSPriority#betweenSymbolAndValue`.
      - Move any values before the `CSSSymbol<"!">` that are a `CSSComment` or `CSSSpace` to `CSSDeclaration#betweenValueAndPriority`.
- Return the new `CSSDeclaration`.

```tsx
declare type CSSSkippable = CSSComment | CSSSpace

declare class CSSDeclaration extends CSSGroup {
  name: CSSWord
  betweenNameAndOpening: CSSSkippable[]
  opening: CSSSymbol<":">
  betweenOpeningAndValue: CSSSkippable[]
  value: CSSValue[]
  betweenValueAndPriority: CSSSkippable[]
  priority: CSSPriority<{
    symbol: CSSSymbol<"!">
    betweenSymbolAndValue: CSSSkippable[]
    value: CSSWord
  }>
  betweenValueAndClosing: CSSSkippable[]
}
```
