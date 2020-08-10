const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    passwordHash: { type: String },
    clinic: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: false },
}, {timestamps: true});

schema.methods.setPassword = function(password) {
    this.passwordHash = bcrypt.hashSync(password, 10);
}

schema.methods.toJSON = function(){
    return {
        id: this._id,
        email: this.email,
        clinic: this.clinic,
        phone: this.phone,
        address: this.address,
        role: this.role,
        offset: this.offset
    };
};

mongoose.model('User', schema);
