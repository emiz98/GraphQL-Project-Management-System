const { Schema, model } = require("mongoose");

const ClientSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("Client", ClientSchema);
