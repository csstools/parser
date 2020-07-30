# Consumers

This section describes how different objects are consumed in CSS.

- [CSSDeclaration](#cssdeclaration)
- [CSSStyleRule](#cssstylerule)

---

## CSSDeclaration

The **CSSDeclaration** class represents a CSS declaration block.

```
┌───────────────────────────────────────────────────────────┐
│                        declaration                        │
├──────────────────┬─────────┬───────┬────────────┬─────────┤
│       name       │ opening │ value │  priority  │ closing │
" background-color      :       red    !important      ;    "
└──────────────────┴─────────┴───────┴────────────┴─────────┘
```

### Consuming a CSSDeclaration

> **Notes**:
> 1. This algorithm is based upon https://drafts.csswg.org/css-syntax/#consume-declaration
> 2. This algorithm assumes the current value can be accessed, and that it is a `CSSWord`.

To consume a declaration:

1.  Create a new `CSSDeclaration`.
2.  Assign the current value to `CSSDeclaration#name`.
3.  Advance the current value.
4.  If the current value cannot be accessed;
    1. Return the incomplete `CSSDeclaration`.
5.  While the current value is a `CSSComment` or `CSSSpace` value,
    1. Assign the current value to `CSSDeclaration#betweenNameAndOpening`.
    2. Advance the current value.
6.  If the current value is not a `CSSSymbol<":">`, then
    1. Return the incomplete `CSSDeclaration`.
7.  Assign the current value to `CSSDeclaration#opening`.
8.  Advance the current value.
9.  While the current value is a `CSSComment` or `CSSSpace` value, then
    1. Assign the current value to `CSSDeclaration#betweenOpeningAndValue`.
    2. Advance the value.
10. While the current value can be accessed,
    1. Push the current value to `CSSDeclaration#value`.
    2. Advance the current value.
11. Move any `CSSComment` or `CSSSpace` values from the end of `CSSDeclaration#value` to `CSSDeclaration#betweenValueAndClosing`.
12. If the following conditions are met, which are
    1. If the last value of `CSSDeclaration#value` is a `CSSWord`, and
    2. If zero-or-more values before that value are a `CSSComment` or `CSSSpace`, and
    3. If the value before that is a `CSSSymbol<"!">`, then
       1. Create a new `CSSPriority`.
       2. Assign it to `CSSDeclaration#priority`.
       3. Assign the `CSSSymbol<"!">` value to `CSSPriority#symbol`.
       4. Assign the `CSSWord` value to `CSSPriority#value`.
       5. Move any `CSSComment` or `CSSSpace` values between `CSSPriority#symbol` and `CSSPriority#value` to `CSSPriority#betweenSymbolAndValue`.
       6. Move any `CSSComment` or `CSSSpace` values before `CSSPriority#symbol` to `CSSDeclaration#betweenValueAndPriority`.
13. Return the new `CSSDeclaration`.

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

## CSSStyleRule

