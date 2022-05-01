const express = require("express");
const bcrypt = require("bcrypt");
const moment = require("moment");
const { jwtHandler } = require("../../utils/middleware/jwtHandler.js");
const { FilesService, upload } = require("../services/index.js");
const { config } = require("../../config/index");
const { authHandler } = require("../../utils/middleware/authHandler.js");

function filesApi(app) {
  const router = express.Router();
  app.use("/files", router);

  const filesService = new FilesService();

  // File get one
  router.get("/:id", jwtHandler, async (req, res) => {
    const { token, tokenCookie } = req;
    const { id } = req.params;
    const { tkn } = req.query;
    try {
      const file = await filesService.getFile({ user: null, id });
      file.pipe(res);
      /*if (typeof token?.id === 'number') {
        const file = await filesService.getFile({ user: token.id, id });
        file.pipe(res);
      } else if (typeof tokenCookie?.id === 'number') {
        const file = await filesService.getFile({ user: tokenCookie.id, id });
        file.pipe(res);
      } else if (tkn) {
        const file = await filesService.getFileByTkn({ id, tkn });
        file.pipe(res);
      } else {
        res.status(200).json({
          msg: "error",
          data: "Unknow error",
        });
      }*/
    } catch (err) {
      res.status(500).json({
        msg: "error",
        data: err.message,
      });
    }
  });

  // File generate token
  router.get("/:id/tkn", jwtHandler, authHandler, async (req, res) => {
    try {
      const tkn = await filesService.generateTkn();

      res.status(500).json({
        msg: "ok",
        data: tkn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "error",
        data: err.message,
      });
    }
  });

  // File create one
  router.post(
    "/",
    jwtHandler,
    authHandler,
    upload.single("file"),
    async (req, res) => {
      const { token, tokenCookie } = req;
      const { file } = req;
      try {
        const fileId = await filesService.uploadFile({
          user: token?.id || tokenCookie?.id,
          file,
        });
        if (fileId) {
          res.status(200).json({
            msg: "ok",
            data: fileId,
          });
        } else {
          res.status(500).json({
            msg: "error",
            data: "not_inserted",
          });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({
          msg: "error",
          data: err.message,
        });
      }
    }
  );
}

module.exports = { filesApi };
