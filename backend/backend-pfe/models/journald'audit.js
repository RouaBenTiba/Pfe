const mongoose = require("mongoose");
const { Schema } = mongoose;

const auditLogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "employé",
    required: true,
  },
  userRef: {
    type: String,
    required: true,
  },
  requestBody: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
