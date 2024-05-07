const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.String,
    ref: "employé",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
