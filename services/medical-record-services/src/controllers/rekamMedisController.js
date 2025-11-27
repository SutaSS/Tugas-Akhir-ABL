const RekamMedis = require('../models/RekamMedis');

// GET all medical records
exports.getAllRecords = async (req, res) => {
  try {
    const records = await RekamMedis.find()
      .populate('id_dokter', 'nama spesialis')
      .populate('id_perawat', 'nama')
      .sort({ tanggal_periksa: -1 });
    
    res.json({ 
      success: true, 
      count: records.length,
      data: records 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// GET single medical record by ID
exports.getRecordById = async (req, res) => {
  try {
    const record = await RekamMedis.findById(req.params.id)
      .populate('id_dokter', 'nama spesialis')
      .populate('id_perawat', 'nama');
    
    if (!record) {
      return res.status(404).json({ 
        success: false, 
        error: 'Record not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: record 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// GET medical records by patient ID
exports.getRecordsByPatientId = async (req, res) => {
  try {
    const records = await RekamMedis.find({ id_pasien: req.params.patientId })
      .populate('id_dokter', 'nama spesialis')
      .populate('id_perawat', 'nama')
      .sort({ tanggal_periksa: -1 });
    
    res.json({ 
      success: true, 
      count: records.length,
      data: records 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// POST create new medical record
exports.createRecord = async (req, res) => {
  try {
    const newRecord = new RekamMedis(req.body);
    const savedRecord = await newRecord.save();
    
    const populatedRecord = await RekamMedis.findById(savedRecord._id)
      .populate('id_dokter', 'nama spesialis')
      .populate('id_perawat', 'nama');
    
    res.status(201).json({ 
      success: true, 
      data: populatedRecord 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// PUT update medical record
exports.updateRecord = async (req, res) => {
  try {
    const updatedRecord = await RekamMedis.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    )
    .populate('id_dokter', 'nama spesialis')
    .populate('id_perawat', 'nama');
    
    if (!updatedRecord) {
      return res.status(404).json({ 
        success: false, 
        error: 'Record not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: updatedRecord 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// DELETE medical record
exports.deleteRecord = async (req, res) => {
  try {
    const deletedRecord = await RekamMedis.findByIdAndDelete(req.params.id);
    
    if (!deletedRecord) {
      return res.status(404).json({ 
        success: false, 
        error: 'Record not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Record deleted successfully',
      data: deletedRecord
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};
