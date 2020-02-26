# Configuration for NodeJS Applications

This pacakge can be used to add a configuration to a NodeJS project. It is an opinionated approach that holds true for a specific project setup.

## Install

```bash
npm i mqn-config
```

## Usage

The package will load a default config merged with a environment specific config for development or testing purposes. In production it will only load configuration from environment variables stored in `env.json`.

The package also requires a `schema.json` that contains a json-schema. This will be used to validate if the current config is valid. In case it is not valid an error will be thrown immediately. As environment variables are typically only strings, the json-schema is also used to typecast booleans, integers and numbers.

It is recommended to not name config keys `get` or `has` as they are used internally.

Values of the loaded config cannot be changed during runtime.

### Init

```javascript
const config = require('mqn-config');
```

### Getting values

```javascript
// assuming your config is like { "child": { "test": "value" } }

const config = require('mqn-config');

// getting values
const val = config.child.test;
const valGetter = config.get('child.test');

const child = config.child;
const valChild = configChild.get('test');

// checking values
const hasTest = config.has('child.test');

```

### Options
The only available options are setting the configuration directory as enironment variable and setting the node environment variable.

If `NODE_ENV` is set the config package will attempt to load a config named like the environment variable. With the exemption of `production`.

__Example__

Setting `NODE_ENV` to `development` will attempt to load `default.json`, `development.json` and `env.json`.

Setting `NODE_ENV` to `production` will only load `env.json`.

If the environment variable `NODE_CONFIG_DIR` is specified the directory where the config files are located is changed. The default is `config`.

## License
[0BSD](https://opensource.org/licenses/0BSD)
