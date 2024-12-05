// @ts-check

/** @type {import("prettier").Config} */
export default {
  bracketSpacing: true,
  singleQuote: false, //指定是否使用单引号
  arrowParens: "avoid",
  trailingComma: "none" //指定是否在对象或数组字面量的最后一个元素后面添加逗号。可选值包括 'es5'（在 ES5 中允许添加行末逗号，也是 Prettier 的默认选项）、'none'（不允许加逗号）和 'all'（在所有可能的位置都加逗号）
};
