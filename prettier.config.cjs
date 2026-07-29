/** @type {import("prettier").Config} */
module.exports = {
  plugins: ["prettier-plugin-nunjucks"],

  overrides: [
    {
      files: ["**/*.{njk,nunjucks,nunj}"],
      options: {
        parser: "nunjucks",
        printWidth: 100,
        tabWidth: 2,
        htmlWhitespaceSensitivity: "ignore",
      },
    },
  ],
};
