const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "In Review", "Completed"],
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("Project", ProjectSchema);
