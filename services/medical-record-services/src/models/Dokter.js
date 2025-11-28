const mongoose = require('mongoose');

const dokterSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  spesialis: {
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

module.exports = mongoose.model('Dokter', dokterSchema);
