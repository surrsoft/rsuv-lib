
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./rsuv-lib.cjs.production.min.js')
} else {
  module.exports = require('./rsuv-lib.cjs.development.js')
}
