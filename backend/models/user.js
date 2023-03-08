import mongoose from 'mongoose';
const {Schema} = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    apellidos: {
      type: String,
    },
    ci: {
      type: String,
    },
    fvqr: {
      type: String,
      unique: true,
    },
    isRegister: {
      type: Boolean,
    },
  },
  {timestamps: true},
);
export default mongoose.model('User', userSchema);
