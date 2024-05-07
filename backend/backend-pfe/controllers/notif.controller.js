const { nodeMailer } = require("../lib/nodemailer");
const Notification = require("../models/notifModel");

const sendNotification = async (req, res) => {
  try {
    const { user, message } = req.body;

    // Envoyer la notification par e-mail

    const emailSubject = "Nouvelle notification";
    const HTMLemail = `<p>${message}</p>`;
    await nodeMailer(user, emailSubject, HTMLemail);

    res.status(200).json("email envoyé");
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de l'envoi de la notification.",
    });
  }
};

module.exports = {
  sendNotification,
};
