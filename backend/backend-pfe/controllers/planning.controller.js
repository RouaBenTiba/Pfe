const Planning = require("../models/planingModel");
const validatePlanning = require("../validation/planningvalidation");
const createPlanning = async (req, res) => {
  const validate = validatePlanning.validation.planningvalid;
  try {
    if (!validate) {
      res.status(404).json(error);
    } else {
      const { user, day, message } = req.body;
      const existingPlanning = await Planning.findOne({ user, day });

      if (existingPlanning) {
        return res
          .status(409)
          .json({ error: "Le planning pour ce jour existe déjà." });
      }

      const newPlanning = new Planning({
        user,
        day,
        message,
      });

      const savedPlanning = await newPlanning.save();
      res.status(201).json(savedPlanning);
    }
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la création du planning.",
    });
  }
};
const getAllPlannings = async (req, res) => {
  try {
    const plannings = await Planning.find();
    res.status(200).json(plannings);
  } catch (error) {
    res.status(404).json({ error: "Aucun planning trouvé." });
  }
};
// Récupérer le planning d'un employé spécifique pour l'admin
const getEmployeePlanning = async (req, res) => {
  try {
    const { userId } = req.params;
    const planning = await Planning.findOne({ user: userId });

    if (!planning) {
      return res
        .status(404)
        .json({ error: "Aucun planning trouvé pour cet employé." });
    }
    res.status(200).json(planning);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération du planning.",
    });
  }
};
// Récupérer le planning d'un employé spécifique pour l'employé connecté
const getplanninguser = async (req, res) => {
  try {
    const planning = await Planning.find({ user: req.user.id });
    res.status(200).json(planning);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
// Modifier le planning d'un employé du coté admin
const updateEmployeePlanning = async (req, res) => {
  try {
    const { planningID } = req.params;
    const { day } = req.body;

    const updatedPlanning = await Planning.findOneAndUpdate(
      { _id: planningID },
      { day },
      { new: true }
    );

    if (!updatedPlanning) {
      return res
        .status(404)
        .json({ error: "Aucun planning trouvé pour cet employé." });
    }

    res.status(200).json(updatedPlanning);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la modification du planning.",
    });
  }
};
// Supprimer le planning d'un employé du coté admin
const deleteEmployeePlanning = async (req, res) => {
  try {
    const deletedPlanning = await Planning.findOneAndDelete({
      _id: req.params.planningID,
    });

    if (!deletedPlanning) {
      return res
        .status(404)
        .json({ error: "Aucun planning trouvé pour cet employé." });
    }

    res.status(200).json({ message: "Planning supprimé avec succès." });
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la suppression du planning.",
    });
  }
};
module.exports = {
  createPlanning,
  getAllPlannings,
  getEmployeePlanning,
  getplanninguser,
  updateEmployeePlanning,
  deleteEmployeePlanning,
};
