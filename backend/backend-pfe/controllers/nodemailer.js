const { nodeMailer } = require("../lib/nodemailer");

const Send = async (req, res) => {
  await nodeMailer("rouatiba95@gmail.com", "test mail", "<p>hello roua</p>");
  res.send("ok");
};

module.exports = {
  Send,
};
/*const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://localhost:6000",
  },
});

io.on("connection", (socket) => {
  io.emit("firstname", "hello this is test!");
  socket.on("disconnect", () => {
    console.log("someone has left");
  });
});

io.listen(6000);*/
