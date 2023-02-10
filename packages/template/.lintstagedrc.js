module.exports = {
  'src/**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}': 'eslint --cache',
  'src/**/*.{ts,tsx,mts,cts}': ['tsc-files --noEmit', 'eslint --cache'],
  'src/**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json,md,css}': 'prettier --write ',
};
