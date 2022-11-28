process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'test';

const jest = require('jest');

const paths = require('./configs/paths');
const argv = process.argv.slice(2);

// Set path of config file.
argv.push('--config=' + paths.jestConfigFile);

// Set watch option.
const CI = process.env.CI;
const hasWatchOption = argv.some((arg) => arg.includes('watch'));
if (!CI && !hasWatchOption) {
  argv.push('--watch');
}

jest.run(argv);
