const { readdirSync } = require('fs');

function hasBabelConfigFile() {
  const rootPath = process.cwd();

  const babelConfigFileRegexList = [
    /\.babelrc$/,
    /.babelrc.(js|json|mjs|cjs)$/,
    /.babel.config.(js|json|mjs|cjs)$/,
  ];

  const files = readdirSync(rootPath);

  return files.some((file) => babelConfigFileRegexList.some((regex) => regex.test(file)));
}

module.exports = {
  hasBabelConfigFile,
};
