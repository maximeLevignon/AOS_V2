const jwt = require("jsonwebtoken");

function validateJWT(token){

    try {
        var decoded = jwt.verify(token, 'FSFLKS?FKM%SF');
        return decoded
      } catch(err) {
        return undefined
      }
}

module.exports = validateJWT ;