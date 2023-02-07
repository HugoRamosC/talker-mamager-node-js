const crypto = require('crypto');

async function tokenGenarator() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = { tokenGenarator };