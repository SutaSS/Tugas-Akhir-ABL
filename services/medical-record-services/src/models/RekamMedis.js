const mongoose = require('mongoose');

const rekamMedisSchema = new mongoose.Schema({
  id_pasien: {
    type: Number,
    required: true,
    index: true
  },
  id_dokter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dokter',
    required: true
  },
  id_perawat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Perawat',
    required: true
  },
  tanggal_periksa: {
    type: Date,
    default: Date.now,
    required: true
  },
  tekanan_darah: {
    type: String,
    required: true,
    // Format: "120/80"
  },
  suhu: {
    type: Number,
    required: true,
    min: 35,
    max: 45
  },
  berat_badan: {
    type: Number,
    required: true,
    min: 0
  },
  diagnosa: {
    type: String,
    required: true
  },
  rujukan: {
    type: String,
    default: null
  },
  kontrol_lanjutan: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Otomatis menambahkan createdAt dan updatedAt
});

module.exports = mongoose.model('RekamMedis', rekamMedisSchema);
