import mongoose from "mongoose"

const Schema = mongoose.Schema;
const model = mongoose.model;

const BlackListTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model("BlackListToken", BlackListTokenSchema);