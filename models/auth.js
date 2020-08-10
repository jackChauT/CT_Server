const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
    expires: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, required: true },
    revoked: Date,
}, {timestamps: true});

schema.methods.toJson = function() {
    return {
        user: this.user,
        refreshToken: this.refreshToken,
        expires: this.expires,
        revoked: this.revoked
    }
}

mongoose.model('Auth', schema);