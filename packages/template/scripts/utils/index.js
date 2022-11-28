function toSpecifiedHost(host) {
  if (host === '0.0.0.0' || host === '::') {
    return 'localhost';
  }

  return host;
}

module.exports = {
  toSpecifiedHost,
};
