const jwt = require("jsonwebtoken");
const { unix } = require("moment");
const moment = require("moment");

const { config } = require("../config/index");

class TokenLib {
  constructor() {}

  async generateToken(params) {
    // Bug: La fecha de expiración está incorrecta en el token resultante
    const exp = parseInt(
      moment()
        .add(7, "days")
        .unix()
    );
    const token = jwt.sign(params, config.secret, { expiresIn: exp });

    return token;
  }

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, config.secret);
      return decoded;
    } catch (err) {
      //throw new Error(`Error token: ${err.message}`)
      return false;
    }
  }
}

module.exports = TokenLib;
