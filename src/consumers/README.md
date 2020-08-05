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

1.  Create a new `CSSDeclaration` as `d`.
2.  Assign the current token to `d.name`.
3.  Advance the current token.
4.  If the current token cannot be accessed, then
    1. Create a new `CSSAny` as `a`.
    2. Move all of the tokens from `d` to the `a.value` list.
    1. Return `a`.
5.  While the current token is either a `CSSComment` or `CSSSpace` token,
    1. Push the current token to the `d.betweenNameAndOpening` list.
    2. Advance the current token.
6.  If the current token is not a `CSSSymbol<":">`, then
    1. Create a new `CSSAny` as `a`.
    2. Move all of the tokens from `d` to the `a.value` list.
    1. Return `a`.
7.  Assign the current token to `d.opening`.
8.  Advance the current token.
9.  If the current token cannot be accessed, then
    1. Create a new `CSSAny` as `a`.
    2. Move all of the tokens from `d` to the `a.value` list.
    1. Return `a`.
10. While the current token is either a `CSSComment` or `CSSSpace`, then
    1. Push the current token to the `d.betweenOpeningAndValue` list.
    2. Advance the token.
11. While the current token can be accessed,
    1. Push the current token to the `d.value` list.
    2. Advance the current token.
12. Move any `CSSComment` or `CSSSpace` tokens from the end of `d.value` to the `d.betweenValueAndClosing` list.
13. If the following conditions are met, which are
    1. If the last token of `d.value` is a `CSSWord`, and
    2. If zero-or-more tokens before that are either a `CSSComment` or `CSSSpace`, and
    3. If the token before that is a `CSSSymbol<"!">`, then
       1. Create a new `CSSPriority` as `p`.
       2. Assign `p` to `d.priority`.
       3. Assign the `CSSSymbol<"!">` token to `p.symbol`.
       4. Assign the `CSSWord` token to `p.value`.
       5. Move any `CSSComment` or `CSSSpace` tokens between `p.symbol` and `p.value` to the `p.betweenSymbolAndValue` list.
       6. Move any `CSSComment` or `CSSSpace` tokens before `p.symbol` to the `d.betweenValueAndPriority` list.
14. Return `d`.
