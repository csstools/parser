# Consumers

This section describes how different objects are consumed in CSS.

- [CSSDeclaration](#cssdeclaration)

---

## CSSDeclaration

The **CSSDeclaration** class represents a CSS declaration block.

**Simplified Illustration**

```
┌─────────────────────────────────────────────────────────┐
│                       declaration                       │
├────────────┬─────────┬───────────┬────────────┬─────────┤
│    name    │ opening │   value   │  priority  │ closing │
" background      :      blue none   !important      ;    "
└────────────┴─────────┴───────────┴────────────┴─────────┘
```

**Detailed Illustration**

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                       declaration                                       │
├────────────┬───────┬─────────┬───────┬───────────┬───────┬────────────┬───────┬─────────┤
│    name    │   1   | opening │   2   |   value   │   3   |  priority  │   4   | closing │
" background   /* */      :      /* */   blue none   /* */   !important   /* */      ;    "
└────────────┴───────┴─────────┴───────┴───────────┴───────┴────────────┴───────┴─────────┘

1. any comments or spaces between the name and the opening.
2. any comments or spaces between the opening and the value.
3. any comments or spaces between the value and the priority (when a priority exists).
4. any comments or spaces between the value and the closing.
```

### Consuming a CSSDeclaration

> **Notes**:
> 1. This algorithm is a lossless variation of the [CSS Syntax](https://drafts.csswg.org/css-syntax/#consume-declaration).
> 2. This algorithm assumes the current value can be accessed, and that it is a `CSSWord`.

To consume a declaration:

1.  Create a new `CSSDeclaration`.
2.  Assign the current value to the `CSSDeclaration#name`.
3.  Advance the current value.
4.  If the current value cannot be accessed;
    1. Return the unbound values of the `CSSDeclaration`.
5.  While the current value is either a `CSSComment` or `CSSSpace` value,
    1. Push the current value to the `CSSDeclaration#betweenNameAndOpening` list.
    2. Advance the current value.
6.  If the current value is not a `CSSSymbol<":">`, then
    1. Return the unbound values of the `CSSDeclaration`.
7.  Assign the current value to the `CSSDeclaration#opening`.
8.  Advance the current value.
9.  If the current value cannot be accessed;
    1. Return the unbound values of the `CSSDeclaration`.
10. While the current value is either a `CSSComment` or `CSSSpace`, then
    1. Push the current value to the `CSSDeclaration#betweenOpeningAndValue` list.
    2. Advance the value.
11. While the current value can be accessed,
    1. Push the current value to the `CSSDeclaration#value` list.
    2. Advance the current value.
12. Move any `CSSComment` or `CSSSpace` values from the end of the `CSSDeclaration#value` to the `CSSDeclaration#betweenValueAndClosing` list.
13. If the following conditions are met, which are
    1. If the last value of the `CSSDeclaration#value` is a `CSSWord`, and
    2. If zero-or-more values before that are either a `CSSComment` or `CSSSpace`, and
    3. If the value before that is a `CSSSymbol<"!">`, then
       1. Create a new `CSSPriority`.
       2. Assign the `CSSPriority` value to the `CSSDeclaration#priority`.
       3. Assign the `CSSSymbol<"!">` value to the `CSSPriority#symbol`.
       4. Assign the `CSSWord` value to the `CSSPriority#value`.
       5. Move any `CSSComment` or `CSSSpace` values between the `CSSPriority#symbol` and the `CSSPriority#value` to the `CSSPriority#betweenSymbolAndValue` list.
       6. Move any `CSSComment` or `CSSSpace` values before the `CSSPriority#symbol` to the `CSSDeclaration#betweenValueAndPriority` list.
14. Return the `CSSDeclaration`.
