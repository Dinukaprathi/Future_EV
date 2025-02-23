const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  stationName: { type: String, required: true },
  address: { type: String, required: true },
  contactPerson: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  additionalNotes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);