const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String },
  mobile: { type: Number },
  govtIdType: { type: String },
  govtIdNumber: { type: String },
  guardianTitle: { type: String },
  guardianName: { type: String },
  address: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  pincode: { type: Number },
  nationality: { type: String }  
});

module.exports = mongoose.model('User', UserSchema);