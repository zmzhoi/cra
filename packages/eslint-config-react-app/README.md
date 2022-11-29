# @zmzhoi/eslint-config-react-app

> Eslint sharable config for react project.

- `eslint@8` is required as a peer.

## Usage

Installation:

```
  npm install -D @zmzhoi/eslint-config-react-app
```

Then create `.eslintrc.js` file with following contents in the root folder of your project:

`.eslintrc.js`

```
module.exports = {
  extends: ['@zmzhoi/eslint-config-react-app'],
  rules: {
    // Add rules that you want to overwrite
  }
};
```

## Alias of internal module

The alias of internal module is `@/**/**`

As you know, you need to set configuration file in order to use alias. like jsconfig.json, tsconfig.json.

> Don't forget to set alias in `webpack.config.js` when you use `webpack`

**The internal module will be placed on the next line with the external module. like this:**

```

  import * as _ from 'lodash'; // External module.
  // new line.
  import LoginForm from '@/components/LoginForm'; // <- Internal module will be placed here.

```

## LICENSE

[MIT.](../../LICENSE.md)
