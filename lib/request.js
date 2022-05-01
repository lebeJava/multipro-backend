const axios = require("axios");
const { config } = require("../config/index");

class RequestLib {
  constructor() {}

  async getDNI({ dni }) {
    return "";
  }

  async getRUC({ ruc }) {
    return "";
  }
}

module.exports = { RequestLib };
