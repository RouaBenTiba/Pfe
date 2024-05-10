const { nodeMailer } = require("../lib/nodemailer");
const Notification = require("../models/notifModel");

const sendNotification = async (req, res) => {
  const { user, message } = req.body;
  try {
    const emailSubject = "Nouvelle notification";
    const HTMLemail = `<p>${message}</p>`;
    await nodeMailer(user, emailSubject, HTMLemail);
    io.emit("notification", { message: "Vérifiez votre e-mail" }); // Émettre un événement de notification à tous les clients connectés
    res.status(200).send("Email envoyé et notification émise.");
  } catch (error) {
    console.error("Error sending notification:", error);
    res
      .status(500)
      .send("Une erreur s'est produite lors de l'envoi de l'email.");
  }
};

module.exports = {
  sendNotification,
};
