#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

function validateArguments() {
  // Arguments length must be 3.
  // index 2 of arguments must be specified.
  if (process.argv.length !== 3 || process.argv[2] === '.') {
    console.log(chalk.yellow('You have to provide a name to your app.'));
    console.log('For example :');
    console.log(`    npx ${chalk.cyan('@zmzhoi/cra@latest')} ${chalk.green('my-app')}`);
    process.exit(1);
  }
}

function main() {
  // Check args.
  validateArguments();

  // Set variables.
  const currentPath = process.cwd();
  const projectName = process.argv[2];
  const projectFullPath = path.join(currentPath, projectName);

  // Make directory of react app.
  try {
    fs.mkdirSync(projectFullPath);
    process.chdir(projectFullPath); // cd
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.error(`${chalk.green(projectName)} ${chalk.red('is already exist! please type another name of project.')}`);
    } else {
      console.error(chalk.red(error));
    }
    process.exit(1);
  }

  const projectRealName = projectName.slice(projectName.lastIndexOf('/') + 1);
  // Create react app.
  try {
    // 1. Clone repository.
    console.log(`\n${chalk.cyan('⏳ Cloning react app template... (1/2)')}`);
    execSync('git init -q');
    execSync(`git remote add -f origin https://github.com/zmzhoi/cra.git`, { stdio: 'ignore' });
    execSync(`git config core.sparsecheckout true`);
    // execSync(`echo "packages/template/*" >> .git/info/sparse-checkout`);

    const hiddenFiles = ['.vscode', '.babelrc.js', '.browserslistrc', '.eslintrc.js', '.gitignore', '.prettierignore', '.prettierrc'];

    for (const file of hiddenFiles) {
      execSync(`echo "packages/template/${file}" >> .git/info/sparse-checkout`);
    }
    execSync(`echo "packages/template/*" >> .git/info/sparse-checkout`);

    execSync(`git pull origin main -q`);
    execSync(`git config --unset core.sparsecheckout`);

    for (const file of hiddenFiles) {
      execSync(`mv packages/template/${file} ./`);
    }
    execSync(`mv packages/template/* ./`);

    execSync('npx rimraf ./packages ./.git ./CHANGELOG.md');
    console.log(`${chalk.bgBlue.white(' Done. ')}`);

    // 2. Install dependencies and Initialize git.
    console.log(`\n${chalk.cyan('⏳ Installing dependencies... (2/2)')}`);

    // 2-1. Fix name of package.json
    let pkgData = fs.readFileSync('package.json', { encoding: 'utf8' });
    pkgData = JSON.parse(pkgData);
    pkgData.name = projectRealName;
    fs.writeFileSync('package.json', JSON.stringify(pkgData, null, 2));

    // 2-2. Install dependencies
    execSync('npm install --silent');

    // 2-3. Initialize git
    try {
      execSync('git --version');
      execSync('git init -q');
      execSync('git add .');
      execSync(`git commit -q -m 'Initial commit.'`);
      // eslint-disable-next-line no-empty
    } catch (error) {}

    console.log(`${chalk.bgBlue.white(' Done. ')}`);
    console.log(`\n${chalk.green(`${chalk.blue(projectRealName)} is created successfully!`)} 🎉`);
    console.log(`\n${chalk.bgCyan.white(' Now, you can start react app! ')}`);
    console.log(`      ${chalk.cyan('cd ')}${chalk.blue(projectName)}`);
    console.log(`      ${chalk.cyan('npm start')}`);
  } catch (error) {
    console.log(`${chalk.red(error)}`);
  }
}

main();
