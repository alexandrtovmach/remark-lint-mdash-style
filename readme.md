# remark-lint-mdash-style [![npm version](http://img.shields.io/npm/v/remark-lint-mdash-style.svg)](https://npmjs.org/package/remark-lint-mdash-style) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/remark-lint-mdash-style)

Warn when the mdash style violate a given style.

Options: `'―'`, `'-'`, `'--'`, default: `'―'`.

## Presets

This rule is not included in any default preset

## Example

##### `valid.md`

###### In

```markdown
`remark-lint` ― powerful Markdown processor powered by plugins.
```

###### Out

No messages.

##### `invalid.md`

###### In

```markdown
`remark-lint` - powerful Markdown processor powered by plugins.

`remark-lint` -- powerful Markdown processor powered by plugins.
```

###### Out

```text
1:1-1:64: Use `―` instead of `-` for mdash
3:1-3:65: Use `―` instead of `--` for mdash
```

##### `valid.md`

When configured with `'-'`.

###### In

```markdown
`remark-lint` - powerful Markdown processor powered by plugins.
```

###### Out

No messages.

##### `valid.md`

When configured with `'--'`.

###### In

```markdown
`remark-lint` -- powerful Markdown processor powered by plugins.
```

###### Out

No messages.

## Install

[npm][]:

```sh
npm install remark-lint-mdash-style
```

## Use

You probably want to use it on the CLI through a config file:

```diff
 ...
 "remarkConfig": {
   "plugins": [
     ...
     "lint",
+    "lint-mdash-style",
     ...
   ]
 }
 ...
```

Or use it on the CLI directly

```sh
remark -u lint -u lint-mdash-style readme.md
```

Or use this on the API:

```diff
 var remark = require('remark');
 var report = require('vfile-reporter');

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-mdash-style'))
   .process('_Emphasis_ and **importance**', function (err, file) {
     console.error(report(err || file));
   });
```
