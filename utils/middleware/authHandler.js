authHandler = async (req, res, next) => {
  try {
    if (!req.token && !req.tokenCookie)
      return res.status(403).json({ msg: "error", data: "Autorization_error" });

    next();
  } catch (e) {
    console.log(e);
    return res
      .status(403)
      .json({ msg: "error", data: "Autorization_required" });
  }
};

module.exports = { authHandler };
