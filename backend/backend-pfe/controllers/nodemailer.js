const { nodeMailer } = require("../lib/nodemailer");

const Send = async (req, res) => {
  await nodeMailer("rouatiba95@gmail.com", "test mail", "<p>hello roua</p>");
  res.send("ok");
};

module.exports = {
  Send,
};
