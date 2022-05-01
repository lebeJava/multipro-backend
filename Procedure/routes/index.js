const express = require("express");
const { ProcedureService } = require("../services/index.js");

const { jwtHandler } = require("../../utils/middleware/jwtHandler");
const { authHandler } = require("../../utils/middleware/authHandler.js");

function procedureApi(app) {
  const router = express.Router();
  app.use("/procedure", router);

  const procedureService = new ProcedureService();

  // Create
  router.post("/", jwtHandler, authHandler, async (req, res) => {
    const user = req.token;
    const json = req.body;
    try {
      const procedure = await procedureService.create({ user, json });
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

  // Update
  router.put("/", jwtHandler, authHandler, async (req, res) => {
    const json = req.body;

    try {
      const procedure = await procedureService.update({ id: json?._id, json });
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

  // Get One by Vehicle Plate
  router.get("/plate/:plate", async (req, res) => {
    const { plate } = req.params;
    try {
      const procedure = await procedureService.readLastByPlate({
        plate,
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

  // List resolution
  router.get("/resolution", jwtHandler, authHandler, async (req, res) => {
    const user = req.token;
    const { query, sort, filter, type, page, max } = req.query;
    try {
      const procedure = await procedureService.readResolution({
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

  // Get One
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const procedure = await procedureService.readOne({
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

module.exports = { procedureApi };
