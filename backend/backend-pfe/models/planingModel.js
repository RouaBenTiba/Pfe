const mongoose = require("mongoose");
const { Schema } = mongoose;
const planingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "employé",
    required: true,
  },
  day: {
    type: String,
    required: true,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  message: {
    type: String,
  },
});
module.exports = mongoose.model("planing", planingSchema);
