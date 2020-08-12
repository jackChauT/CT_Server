/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
  email: {
    type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true,
  },
  passwordHash: { type: String },
  clinic: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, required: false },
}, { timestamps: true });

schema.methods.setPassword = function (password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.toJSON = function () {
  return {
    // eslint-disable-next-line no-underscore-dangle
    id: this._id,
    email: this.email,
    clinic: this.clinic,
    address: this.address,
  };
};

mongoose.model('User', schema);
