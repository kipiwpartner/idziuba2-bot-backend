const { Schema, model } = require("mongoose");

const BlackListTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = model("BlackListToken", BlackListTokenSchema);
