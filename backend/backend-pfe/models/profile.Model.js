const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "employé",
    required: "true",
  },

  name: {
    type: String,
  },
  email: {
    type: String,
  },
  tel: {
    type: String,
  },
  country: {
    type: String,
  },
  photo: {
    type: String, //URL de la photo ou le chemin
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("profiles", ProfileSchema);
