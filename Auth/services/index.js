const MongoLib = require("../../lib/mongo");
const TokenLib = require("../../lib/token");
const { UserService } = require("../../User/services");

class AuthService {
  constructor() {
    this.mongoDB = new MongoLib();
    this.token = new TokenLib();
    this.userService = new UserService();
  }

  async login({ user, pass }) {
    const query = {
      user,
      pass,
    };
    const result = await this.userService.getOne({ query });

    if (result.msg && result.msg == "error") {
      return false;
    }

    const token = await this.token.generateToken({
      id: result.data._id,
      role: result.data.role,
      name: result.data.name,
      email: result.data.email,
    });

    return {
      token,
      user: {
        id: result.data._id,
        role: result.data.role,
        name: result.data.name,
        email: result.data.email,
      },
    };
  }

  async validate({ id, role }) {
    const result = await this.userService.getOneById({
      user: { role },
      id,
    });

    if (result.msg && result.msg == "error") {
      return false;
    }

    const { user, pass } = result.data;

    let token = await this.login({ user, pass });

    return token;
  }
}

module.exports = {
  AuthService,
};
