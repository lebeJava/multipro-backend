const express = require("express");
const { LocationService } = require("../services/index.js");

const { jwtHandler } = require("../../utils/middleware/jwtHandler");
const { authHandler } = require("../../utils/middleware/authHandler.js");

function locationApi(app) {
  const router = express.Router();
  app.use("/location", router);

  const locationService = new LocationService();

  // Create
  router.post("/message", jwtHandler, authHandler, async (req, res) => {
    const user = req.token;
    const json = req.body;
    try {
      const msg = await locationService.createMessage({ user, json });
      if (procedure.msg === "ok") {
        res.status(200).json({
          msg: procedure.msg,
          data: procedure.data,
        });
      } else {
        res.status(500).json({
          msg: procedure.msg,
          data: procedure.data,
        });
      }
    } catch (err) {
      res.status(500).json({
        msg: "error",
        data: err.message,
      });
    }
  });

  // List
  router.get("/", jwtHandler, authHandler, async (req, res) => {
    const user = req.token;
    const { query, sort, filter, type, page, max } = req.query;
    try {
      const procedure = await procedureService.read({
        user,
        query,
        sort,
        filter,
        type,
        page,
        max,
      });
      if (procedure.msg === "ok") {
        res.status(200).json({
          msg: procedure.msg,
          data: procedure.data,
        });
      } else {
        res.status(500).json({
          msg: procedure.msg,
          data: procedure.data,
        });
      }
    } catch (err) {
      res.status(500).json({
        msg: "error",
        data: err.message,
      });
    }
  });

  // Delete One
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const procedure = await procedureService.delete({
        id,
      });
      if (procedure.msg === "ok") {
        res.status(200).json({
          msg: procedure.msg,
          data: procedure.data,
        });
      } else {
        res.status(500).json({
          msg: procedure.msg,
          data: procedure.data,
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
