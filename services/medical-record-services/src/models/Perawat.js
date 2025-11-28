const mongoose = require('mongoose');

const perawatSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  no_sip: {
    type: String,
    required: true,
    unique: true
  },
  telepon: {
    type: String
  },
  email: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Perawat', perawatSchema);
