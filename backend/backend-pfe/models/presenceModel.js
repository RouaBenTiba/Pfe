const mongoose = require("mongoose");
const { Schema } = mongoose;

const presenceSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "employé",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  entryTime: {
    type: Date,
  },
  exitTime: {
    type: Date,
  },
  decision: {
    type: String,
    enum: ["validé", "non validé"],
    default: "non validé",
  },
});

module.exports = mongoose.model("presence", presenceSchema);
