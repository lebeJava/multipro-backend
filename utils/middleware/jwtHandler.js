const TokenLib = require("../../lib/token");

jwtHandler = async (req, res, next) => {
  //req.token = {user: '5f0646226e76213088b8a5d2', code: 1594246709}
  //next()
  const tokenLib = new TokenLib();
  try {
    let token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";
    //var token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decodedHeader = await tokenLib.verifyToken(token);

    req.token = decodedHeader || null;
  } catch (e) {
    req.token = null;
  }

  try {
    const decodedCookie = await tokenLib.verifyToken(req.cookies.Token);

    req.tokenCookie = decodedCookie || null;
  } catch (e) {
    req.tokenCookie = null;
  }

  next();
};

module.exports = { jwtHandler };
