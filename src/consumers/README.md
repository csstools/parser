# Consumers

- [CSSDeclaration](#cssdeclaration)

---

## CSSDeclaration

To consume a declaration, assuming the current value is a `CSSWord`:

- Create a new `CSSDeclaration`.
- Assign the current `CSSWord` value to `CSSDeclaration#name`.
- Advance the current value or return the incomplete `CSSDeclaration`.
- While the current value is a `CSSComment` or `CSSSpace` value;
  - Assign the current value to `CSSDeclaration#betweenNameAndOpening`.
  - Advance the current value.
- If the current value is not a `CSSSymbol<":">`;
  - Return the incomplete `CSSDeclaration`.
- Otherwise;
  - Assign the current value to `CSSDeclaration#opening`.
- Advance the current value.
- While the current value is a `CSSComment` or `CSSSpace` value;
  - Assign the current value to `CSSDeclaration#betweenOpeningAndValue`.
  - Advance the value.
- While the current value can be accessed;
  - Push the current value to `CSSDeclaration#value`.
  - Advance the current value.
- Move any trailing `CSSComment` or `CSSSpace` values from `CSSDeclaration#value` to `CSSDeclaration#betweenValueAndClosing`.
- If the last value of `CSSDeclaration#value` is a `CSSWord`; and,
  - If zero or more values before that are a `CSSComment` or `CSSSpace`; and,
    - If the value before that is a `CSSSymbol<"!">`; then,
      - Create a new `CSSPriority`, assigned to `CSSDeclaration#priority`.
      - Assign the `CSSSymbol<"!">` value to `CSSPriority#symbol`.
      - Assign the `CSSWord` value to `CSSPriority#value`.
      - Move any values between the `CSSSymbol<"!">` and the `CSSWord` to `CSSPriority#betweenSymbolAndValue`.
      - Move any `CSSComment` or `CSSSpace` values before the `CSSSymbol<"!">` to `CSSDeclaration#betweenValueAndPriority`.
- Return the new `CSSDeclaration`.

**Shape**

```ts
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

declare type CSSSkippable = CSSComment | CSSSpace
```
