const {Schema, model} = require('mongoose')

const roleSchema = new Schema({
  role: {
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

module.exports = model('Role', roleSchema)