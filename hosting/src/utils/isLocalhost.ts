function isLocalhost(): Boolean {
  // eslint-disable-next-line no-restricted-globals
  const h = location.hostname;
  return h === 'localhost' || h === '127.0.0.1' || h === '';
}

export default isLocalhost;
