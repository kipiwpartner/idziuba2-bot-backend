import mongoose from "mongoose"

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: String,
  role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
  }
})

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

export default model('User', userSchema)