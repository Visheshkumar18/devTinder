const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  status: {   // lowercase 'status'
    type: String,
    enum: {
      values: ["interested", "ignore", "accepted", "rejected"],
      message: `{VALUE} is incorrect status type`
    },
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
