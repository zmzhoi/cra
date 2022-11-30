const portfinder = require('portfinder');

function toSpecifiedHost(host) {
  if (host === '0.0.0.0' || host === '::') {
    return 'localhost';
  }

  return host;
}

function checkPort(basePort = 3000) {
  portfinder.basePort = basePort;
  return portfinder.getPortPromise();
}

module.exports = {
  toSpecifiedHost,
  checkPort,
};
