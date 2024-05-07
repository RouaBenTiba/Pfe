const mongoose = require("mongoose");
const { Schema } = mongoose;

const employéSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "firstname required"],
  },
  lastname: {
    type: String,
    required: [true, "lastname required"],
  },
  password: {
    type: String,
    required: [true, "password required"],
  },
  email: {
    type: String,
    required: [true, "email required"],
    trim: true,
    unique: true,
  },

  tel: {
    type: String,
    required: [true, "tel required"],
  },
  role: {
    type: Number,
    enum: [0, 1],
    default: 0, //0:employé,1::Admin,2:superAdmin
  },
});

module.exports = mongoose.model("employé", employéSchema);
