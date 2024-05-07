const Presence = require("../models/presenceModel");
//pointer le présence de l'employé
const pointerPresence = async (req, res) => {
  try {
    const { entryTime, exitTime } = req.body;
    const employeeId = req.user.id;

    const newPresence = new Presence({
      employee: employeeId,
      entryTime,
      exitTime,
    });

    const savedPresence = await newPresence.save();
    res.status(201).json(savedPresence);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors du pointage de la présence.",
    });
  }
};
//consulter le présence d'un employé particulier
const pointages = async (req, res) => {
  try {
    const presences = await Presence.find({ employee: req.params.user });
    res.status(200).json(presences);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
//consulter le présence de l'employé cncté
const monpointage = async (req, res) => {
  try {
    employeID = req.user.id;
    const presences = await Presence.find({ employee: employeID });
    res.status(200).json(presences);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
//valider presence
const validerPresence = async (req, res) => {
  try {
    const { presenceId, decision } = req.body;

    // Check if the decision is valid
    if (!["validé", "non validé"].includes(decision)) {
      return res.status(400).json({ error: "Décision invalide." });
    }

    // Update the presence record with the new decision
    const updatedPresence = await Presence.findByIdAndUpdate(
      presenceId,
      { decision: decision },
      { new: true } // This option returns the updated document
    );

    if (!updatedPresence) {
      return res.status(404).json({ error: "Présence non trouvée." });
    }

    res.status(200).json(updatedPresence);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la validation de la présence.",
    });
  }
};

module.exports = {
  pointerPresence,
  pointages,
  monpointage,
  validerPresence,
};
