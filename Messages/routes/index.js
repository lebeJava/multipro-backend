const express = require("express");
const { MessagesService } = require("../services/index.js");

const { jwtHandler } = require("../../utils/middleware/jwtHandler");
const { authHandler } = require("../../utils/middleware/authHandler.js");
const { utc } = require("moment");

function messagesApi(app) {
  const router = express.Router();
  app.use("/messages", router);

  const messagesService = new MessagesService();

  // User create one
  router.post("/", jwtHandler, authHandler, async (req, res) => {
    const user = req.token;
    const {
      latitude,
      longitude,
      accuracy,
      altitude,
      bearing,
      speed,
      gpsDateTime,
      message,
    } = req.body;
    try {
      const result = await messagesService.createOne({
        user,
        latitude,
        longitude,
        accuracy,
        altitude,
        bearing,
        speed,
        gpsDateTime,
        message,
      });
      if (result.msg == "ok") {
        res.json({
          msg: "ok",
          data: result.data,
        });
      } else {
        res.json({
          msg: "error",
          data: result.data,
        });
      }
    } catch (err) {
      res.status(500).json({
        msg: "error",
        data: err.message,
      });
    }
  });

  // User get all
  router.get("/", jwtHandler, authHandler, async (req, res) => {
    const user = req.token;
    const { query, sort, filter, start, end, page, max } = req.query;
    try {
      const result = await messagesService.getAll({
        user,
        query,
        sort,
        filter,
        start,
        end,
        page,
        max,
      });
      if (result.msg == "ok") {
        res.json({
          msg: "ok",
          data: result.data,
        });
      } else {
        res.json({
          msg: "error",
          data: result.data,
        });
      }
    } catch (err) {
      res.status(500).json({
        msg: "error",
        data: err.message,
      });
    }
  });
}

module.exports = { messagesApi };
