"use strict";
const nodemailer = require("nodemailer");

const nodeMailer = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "rouatiba95@gmail.com",
      pass: "howpdfceuugimxoq",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  const message = {
    from: "rouatiba95@gmail.com", // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: subject, // plain text body
    html: html, // html body
  };
  await transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mail sent:" + info.response);
    }
  });
};

module.exports = {
  nodeMailer,
};
