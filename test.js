const remark = require('remark');
const mdashRule = require('./index');

const processMarkdown = (md, opts) => {
  return remark()
    .use(mdashRule, opts)
    .process(md);
};

describe('remark-lint-mdash-style', () => {
  describe('default config', () => {
    test('"―" is valid', () => {
      const lint = processMarkdown(
        `remark-lint ― powerful Markdown processor powered by plugins.`
      );

      return lint.then((vFile) => {
        expect(vFile.messages.length).toBe(0);
      });
    });
    test('"-" is invalid', () => {
      const lint = processMarkdown(
        `remark-lint - powerful Markdown processor powered by plugins.`
      );

      return lint.then((vFile) => {
        expect(vFile.messages.length).toBe(1);
        expect(vFile.messages[0].reason).toBe("Use '―' instead of '-' for mdash");
      });
    });
    test('"--" is invalid', () => {
      const lint = processMarkdown(
        `remark-lint -- powerful Markdown processor powered by plugins.`
      );

      return lint.then((vFile) => {
        expect(vFile.messages.length).toBe(1);
        expect(vFile.messages[0].reason).toBe("Use '―' instead of '--' for mdash");
      });
    });
  });

  describe('"―" config', () => {
    test('"―" is valid', () => {
      const lint = processMarkdown(
        `remark-lint ― powerful Markdown processor powered by plugins.`,
        '―'
      );

      return lint.then((vFile) => {
        expect(vFile.messages.length).toBe(0);
      });
    });
    test('"-" is invalid', () => {
      const lint = processMarkdown(
        `remark-lint - powerful Markdown processor powered by plugins.`,
        '―'
      );

      return lint.then((vFile) => {
        expect(vFile.messages.length).toBe(1);
        expect(vFile.messages[0].reason).toBe("Use '―' instead of '-' for mdash");
      });
    });
    test('"--" is invalid', () => {
      const lint = processMarkdown(
        `remark-lint -- powerful Markdown processor powered by plugins.`,
        '―'
      );

      return lint.then((vFile) => {
        expect(vFile.messages.length).toBe(1);
        expect(vFile.messages[0].reason).toBe("Use '―' instead of '--' for mdash");
      });
    });
  });

  describe('"-" config', () => {
    test('"-" is valid', () => {
      const lint = processMarkdown(
        `remark-lint - powerful Markdown processor powered by plugins.`,
        '-'
      );

      return lint.then((vFile) => {
        expect(vFile.messages.length).toBe(0);
      });
    });
    test('"―" is invalid', () => {
      const lint = processMarkdown(
        `remark-lint ― powerful Markdown processor powered by plugins.`,
        '-'
      );

      return lint.then((vFile) => {
        expect(vFile.messages.length).toBe(1);
        expect(vFile.messages[0].reason).toBe("Use '-' instead of '―' for mdash");
      });
    });
    test('"--" is invalid', () => {
      const lint = processMarkdown(
        `remark-lint -- powerful Markdown processor powered by plugins.`,
        '-'
      );

      return lint.then((vFile) => {
        expect(vFile.messages.length).toBe(1);
        expect(vFile.messages[0].reason).toBe("Use '-' instead of '--' for mdash");
      });
    });
  });

  describe('"--" config', () => {
    test('"--" is valid', () => {
      const lint = processMarkdown(
        `remark-lint -- powerful Markdown processor powered by plugins.`,
        '--'
      );

      return lint.then((vFile) => {
        expect(vFile.messages.length).toBe(0);
      });
    });
    test('"―" is invalid', () => {
      const lint = processMarkdown(
        `remark-lint ― powerful Markdown processor powered by plugins.`,
        '--'
      );

      return lint.then((vFile) => {
        expect(vFile.messages.length).toBe(1);
        expect(vFile.messages[0].reason).toBe("Use '--' instead of '―' for mdash");
      });
    });
    test('"-" is invalid', () => {
      const lint = processMarkdown(
        `remark-lint - powerful Markdown processor powered by plugins.`,
        '--'
      );

      return lint.then((vFile) => {
        expect(vFile.messages.length).toBe(1);
        expect(vFile.messages[0].reason).toBe("Use '--' instead of '-' for mdash");
      });
    });
  });
});