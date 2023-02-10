module.exports = {
  'packages/**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}': 'eslint --cache',
  'packages/**/*.{ts,tsx,mts,cts}': [
    'tsc-files -p packages/template/tsconfig.json --noEmit',
    'eslint --cache',
  ],
  'packages/**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json,md,css}': 'prettier --write ',
};
