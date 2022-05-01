const express = require("express");
const { AuthService } = require("../services/index.js");

const { jwtHandler } = require("../../utils/middleware/jwtHandler");
const { authHandler } = require("../../utils/middleware/authHandler.js");

function authApi(app) {
  const router = express.Router();
  app.use("/auth", router);

  const authService = new AuthService();

  // Auth login
  router.post("/login", async (req, res) => {
    const { user, pass } = req.body;
    try {
      const userData = await authService.login({ user, pass });
      if (userData) {
        res.status(200).json({
          msg: "ok",
          data: userData,
        });
      } else {
        res.status(500).json({
          msg: "error",
          data: userData,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "error",
        data: err.message,
      });
    }
  });

  // Auth validate
  router.get("/validate", jwtHandler, authHandler, async (req, res) => {
    const { id, role } = req.token;
    try {
      const validate = await authService.validate({ id, role });
      if (validate) {
        res.status(200).json({
          msg: "ok",
          data: validate,
        });
      } else {
        res.status(500).json({
          msg: "error",
          data: false,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "error",
        data: err.message,
      });
    }
  });
}

module.exports = { authApi };
