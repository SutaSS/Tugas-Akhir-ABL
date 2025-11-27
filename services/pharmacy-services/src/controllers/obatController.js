const Obat = require('../models/Obat');

// GET all medicines
exports.getAllMedicines = async (req, res) => {
  try {
    const { category, search, inStock } = req.query;
    
    let query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by stock availability
    if (inStock === 'true') {
      query.stock = { $gt: 0 };
    }
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }
    
    const medicines = await Obat.find(query).sort({ name: 1 });
    
    res.json({ 
      success: true, 
      count: medicines.length,
      data: medicines 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// GET single medicine by ID
exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Obat.findById(req.params.id);
    
    if (!medicine) {
      return res.status(404).json({ 
        success: false, 
        error: 'Medicine not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: medicine 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// GET medicines by category
exports.getMedicinesByCategory = async (req, res) => {
  try {
    const medicines = await Obat.find({ category: req.params.category })
      .sort({ name: 1 });
    
    res.json({ 
      success: true, 
      count: medicines.length,
      data: medicines 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// GET low stock medicines
exports.getLowStockMedicines = async (req, res) => {
  try {
    const threshold = req.query.threshold || 10;
    const medicines = await Obat.find({ 
      stock: { $lte: threshold, $gt: 0 } 
    }).sort({ stock: 1 });
    
    res.json({ 
      success: true, 
      count: medicines.length,
      data: medicines 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// POST create new medicine
exports.createMedicine = async (req, res) => {
  try {
    const newMedicine = new Obat(req.body);
    const savedMedicine = await newMedicine.save();
    
    res.status(201).json({ 
      success: true, 
      data: savedMedicine 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// PUT update medicine
exports.updateMedicine = async (req, res) => {
  try {
    const updatedMedicine = await Obat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!updatedMedicine) {
      return res.status(404).json({ 
        success: false, 
        error: 'Medicine not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: updatedMedicine 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// PATCH update medicine stock
exports.updateStock = async (req, res) => {
  try {
    const { quantity, operation } = req.body; // operation: 'add' or 'subtract'
    
    const medicine = await Obat.findById(req.params.id);
    
    if (!medicine) {
      return res.status(404).json({ 
        success: false, 
        error: 'Medicine not found' 
      });
    }
    
    if (operation === 'add') {
      medicine.stock += quantity;
    } else if (operation === 'subtract') {
      if (medicine.stock < quantity) {
        return res.status(400).json({ 
          success: false, 
          error: 'Insufficient stock' 
        });
      }
      medicine.stock -= quantity;
    }
    
    await medicine.save();
    
    res.json({ 
      success: true, 
      data: medicine 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// DELETE medicine
exports.deleteMedicine = async (req, res) => {
  try {
    const deletedMedicine = await Obat.findByIdAndDelete(req.params.id);
    
    if (!deletedMedicine) {
      return res.status(404).json({ 
        success: false, 
        error: 'Medicine not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Medicine deleted successfully',
      data: deletedMedicine
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};
