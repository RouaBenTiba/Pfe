const Conge = require("../models/congeModel");
const validateconge = require("../validation/congevalidation");
//demander conge
const createConge = async (req, res) => {
  const validate = validateconge.validation.congeSchema;
  try {
    if (!validate) {
      res.status(404).json(error);
    } else {
      const { startDate, endDate, typeConge } = req.body;
      const employeeId = req.user.id;

      const newConge = new Conge({
        user: employeeId,
        startDate,
        endDate,
        typeConge,
      });

      const savedConge = await newConge.save();
      res.status(201).json(savedConge);
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};
// gérer les demandes
const getAllConge = async (req, res) => {
  try {
    const conges = await Conge.find();
    res.status(200).json(conges);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
//gerer les demandes d'un seul employé du coté admin
const getConge = async (req, res) => {
  try {
    const conge = await Conge.find({ user: req.params.user });
    res.status(200).json(conge);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
//gerer les demandes d'un seul employé du coté employé
const getCongeemployé = async (req, res) => {
  try {
    const employeId = req.user.id;
    const conges = await Conge.find({ user: employeId });
    res.status(200).json(conges);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
//Annulation
const CancelConge = async (req, res) => {
  try {
    const deleted = await Conge.deleteOne({ _id: req.params.congeId });
    res.status(200).json(deleted);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
//validation du coté admin
const ValiderConge = async (req, res) => {
  try {
    const { congeId } = req.params;
    const { status } = req.body;

    if (!status || (status !== "approuvé" && status !== "rejeté")) {
      return res
        .status(400)
        .json({ error: "Le statut de validation est invalide." });
    }

    const updatedConge = await Conge.findByIdAndUpdate(
      congeId,
      { status },
      { new: true }
    );

    if (!updatedConge) {
      return res.status(404).json({ error: "Congé non trouvé." });
    }

    res.status(200).json(updatedConge);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
module.exports = {
  createConge,
  getAllConge,
  getConge,
  getCongeemployé,
  CancelConge,
  ValiderConge,
};
