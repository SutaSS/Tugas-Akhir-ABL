const mongoose = require('mongoose');

const obatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama obat wajib diisi'],
    trim: true,
    maxlength: [200, 'Nama obat maksimal 200 karakter']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Deskripsi maksimal 1000 karakter']
  },
  price: {
    type: Number,
    required: [true, 'Harga obat wajib diisi'],
    min: [0, 'Harga tidak boleh negatif']
  },
  stock: {
    type: Number,
    required: [true, 'Stok obat wajib diisi'],
    min: [0, 'Stok tidak boleh negatif'],
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Kategori obat wajib diisi'],
    enum: {
      values: ['Tablet', 'Kapsul', 'Sirup', 'Salep', 'Injeksi', 'Tetes', 'Lainnya'],
      message: '{VALUE} bukan kategori yang valid'
    }
  },
  manufacturer: {
    type: String,
    trim: true
  },
  expiryDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Otomatis menambahkan createdAt dan updatedAt
});

// Index untuk pencarian
obatSchema.index({ name: 'text', description: 'text' });
obatSchema.index({ category: 1 });
obatSchema.index({ stock: 1 });

module.exports = mongoose.model('Obat', obatSchema);
