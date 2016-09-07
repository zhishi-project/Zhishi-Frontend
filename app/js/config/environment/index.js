if (process.env.NODE_ENV === 'production' || true) {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
