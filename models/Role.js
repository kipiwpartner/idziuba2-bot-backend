import mongoose from "mongoose"

const Schema = mongoose.Schema;
const model = mongoose.model;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

roleSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

roleSchema.set('toJSON', {
  virtuals: true,
});

export default model('Role', roleSchema)