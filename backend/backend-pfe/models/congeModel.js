const mongoose = require("mongoose");
const { Schema } = mongoose;

const congeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "employé",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["en attente", "approuvé", "rejeté"],
    default: "en attente",
  },
  typeConge: {
    type: String,
    required: true,
    enum: ["vacances", "maladie", "maternité", "autre"], // Ajoutez les types de congés nécessaires
  },
});

module.exports = mongoose.model("conge", congeSchema);
