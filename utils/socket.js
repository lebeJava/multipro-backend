const socketIO = require("socket.io");

const socket = {};

const connect = async (server, options) => {
  socket.io = socketIO(server, options);

  console.log("[SOCKET.IO] Connected!");

  socket.io.on("connection", (client) => {
    console.log("[SOCKET.IO] New Conection", client.id);

    // socket.io.emit("msg", { msg: "Hola" });

    client.on("tracker", async (data) => {
      console.log("[SOCKET] Tracker", client.id);
      const { token } = data;
      const user = await tokenLib.verifyToken(token);
      await locationService.createOne({ user, ...data });
    });

    client.on("disconnect", () => {
      console.log("[SOCKET.IO] disconnect", client.id);
    });
  });
};

module.exports = {
  connect,
  socket,
};
