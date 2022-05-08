const socketIO = require("socket.io");

const socket = {};

const { LocationService } = require("../Location/services");
const TokenLib = require("../lib/token");

const locationService = new LocationService();
const tokenLib = new TokenLib();

const connect = async (server, options) => {
  socket.io = socketIO(server, options);

  console.log("[SOCKET.IO] Connected!");

  socket.io.on("connection", (client) => {
    console.log("[SOCKET.IO] New Conection");

    //socket.io.emit("msg", { msg: "Hola" });

    client.on("tracker", async (data) => {
      console.log("[SOCKET] Tracker");
      const { token, lat, lng } = data;
      const user = await tokenLib.verifyToken(token);
      await locationService.createOne({ user, lat, lng });
      //console.log('tracker received:', JSON.stringify(data))
      //a(client)
    });

    /*socket.on('ping', (data) => {
          try {
            console.log('Ping:', data)
          }catch(error) {
            console.log(error)
          }
          })*/

    client.on("disconnect", () => {
      console.log("disconnect");
    });
  });
};

/*function a(cc) {
    cc.emit("msg", { msg: "Hola" });
}*/

module.exports = {
  connect,
  socket,
};
