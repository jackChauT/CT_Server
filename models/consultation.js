const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  clinic: { type: String, required: true },
  doctor: { type: String, required: true },
  patient: { type: String, required: true },
  diagnosis: { type: String, required: true },
  medication: { type: String, required: true },
  fee: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  hasFollowup: { type: Boolean, required: true },
}, { timestamps: true });

mongoose.model('Consultation', schema);
