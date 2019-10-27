/**
 * @author Alexandr Tovmach
 * @copyright 2019 Alexandr Tovmach
 * @license MIT
 * @module mdash-style
 * @fileoverview
 *   Warn when the mdash style violate a given style.
 *
 *   Options: `'―'`, `'-'`, `'--'`, default: `'―'`.
 *
 * @example {"name": "valid.md"}
 *
 *   `remark-lint` ― powerful Markdown processor powered by plugins.
 *
 * @example {"name": "valid.md", "setting": "-"}
 *
 *   `remark-lint` - powerful Markdown processor powered by plugins.
 *
 * @example {"name": "valid.md", "setting": "--"}
 *
 *   `remark-lint` -- powerful Markdown processor powered by plugins.
 *
 * @example {"name": "invalid.md", "label": "input"}
 *
 *   `remark-lint` - powerful Markdown processor powered by plugins.
 *
 *   `remark-lint` -- powerful Markdown processor powered by plugins.
 *
 * @example {"name": "invalid.md", "label": "output"}
 *
 *   1:1-1:64: Use `―` instead of `-` for mdash
 *   3:1-3:65: Use `―` instead of `--` for mdash
 */

const rule = require("unified-lint-rule");
const visit = require("unist-util-visit");
const generated = require("unist-util-generated");
const toString = require("mdast-util-to-string");

const options = ["―", "-", "--"];

const validateMdashStyle = (tree, file, pref) => {
  const allowedMdash =
    (typeof pref === "string" && options.includes(pref) && pref) || options[0];
  const notAllowedMdash = options.filter(el => el !== allowedMdash);
  const expression = new RegExp(`\\s(${notAllowedMdash.join("|")})\\s`, "g");

  const visitor = node => {
    let value;

    if (!generated(node)) {
      value = toString(node).match(expression);

      if (value) {
        value.forEach(el =>
          file.message(
            `Use '${allowedMdash}' instead of '${el.trim()}' for mdash`,
            node
          )
        );
      }
    }
  };
  
  visit(tree, "text", visitor);
};

module.exports = rule("remark-lint:mdash-style", validateMdashStyle);