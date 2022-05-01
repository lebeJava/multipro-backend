const express = require("express");
const { LocationService } = require("../services/index.js");

const { jwtHandler } = require("../../utils/middleware/jwtHandler");
const { authHandler } = require("../../utils/middleware/authHandler.js");

function locationApi(app) {
  const router = express.Router();
  app.use("/location", router);

  const locationService = new LocationService();

  // User create one
  router.post("/", jwtHandler, authHandler, async (req, res) => {
    const user = req.token;
    const { lat, lng  } = req.body;
    try {
      const result = await locationService.createOne({ user, lat, lng });
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
      const result = await locationService.getAll({
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

  // User get tracker
  router.get("/tracker", jwtHandler, authHandler, async (req, res) => {
    const user = req.token;
    const { query, sort, filter, page, max } = req.query;
    try {
      const result = await locationService.getTracker({
        user,
        query,
        sort,
        filter,
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

  // User get one
  router.get("/:userId", jwtHandler, authHandler, async (req, res) => {
    const user = req.token;
    const { userId } = req.params;
    try {
      const result = await locationService.getOneById({ user, id: userId });
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

  // User update one
  router.put("/:userId", jwtHandler, authHandler, async (req, res) => {
    const user = req.token;
    const { userId } = req.params;
    const json = req.body;
    try {
      const result = await locationService.updateOne({ user, id: userId, json });
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

  // User delete one
  router.delete("/:userId", jwtHandler, authHandler, async (req, res) => {
    const user = req.token;
    const { userId } = req.params;
    try {
      const result = await locationService.deleteOne({ user, id: userId });
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

module.exports = { locationApi };
