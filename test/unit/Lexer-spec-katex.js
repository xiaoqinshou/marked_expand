import { Lexer } from '../../src/Lexer.js';
import { Parser } from '../../src/Parser.js';

function expectTokens({ md, options, tokens = [], links = {} }) {
  const lexer = new Lexer(options);
  const actual = lexer.lex(md);
  const expected = tokens;
  expected.links = links;
  console.log(JSON.stringify(actual, null, 2));
  // const parser = new Parser(options);
  // const actual2 = parser.parse(actual);
  // console.log(actual2);
  expect(actual).toEqual(expected);
}

describe('Lexer', () => {
  describe('katex', () => {
    it('katex', () => {
      expectTokens({
md: `
### 余弦函数的求导
6. 求余弦函数 $f(x)=\\cos x$的导数
$$\\begin{aligned}
& \\lim_{h\\rightarrow0}\\frac{\\cos(x+h)-\\cos h}{h}\\
= &\\lim_{h\\rightarrow0}\\frac{-2\\sin\\frac{2x+h}{2}\\sin\\frac{h}{2}}{h}\\
= &\\lim_{h\\rightarrow0}-\\sin(x+\\frac{h}{2}) \\
= &-\\sin x
\\end{aligned}$$

### 正切函数的求导
7. 求正切函数 $f(x)=\\tan x$的导数
$$\\begin{aligned}
& \\lim_{h\\rightarrow0}\\frac{\\tan(x+h)-\\tan x}{h}\\
= &\\lim_{h\\rightarrow0}\\frac{\\frac{\\sin(x+h)}{\\cos(x+h)}-\\frac{\\sin x}{\\cos x}}{h}\\
= &\\lim_{h\\rightarrow0}\\frac{\\frac{\\sin(x+h)\\cos x -\\cos(x+h)\\sin x}{\\cos(x+h)\\cdot\\cos x}}{h}\\
= &\\lim_{h\\rightarrow0}\\frac{\\frac{\\sin h}{\\cos(x+h)\\cdot\\cos x}}{h}\\
= &\\frac{1}{\\cos^2 x}\\
= &\\sec^2 x
\\end{aligned}$$
`,
tokens: [
  { type: 'katex', raw: '$y=x^a,\\quad a\\in R$', text: 'y=x^a,\\quad a\\in R' }
]
      });
    });
  });
});

