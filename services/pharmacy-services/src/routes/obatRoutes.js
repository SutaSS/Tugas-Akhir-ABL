const express = require('express');
const router = express.Router();
const obatController = require('../controllers/obatController');

// GET all medicines (with optional filters)
router.get('/', obatController.getAllMedicines);

// GET single medicine by ID
router.get('/:id', obatController.getMedicineById);

// GET medicines by category
router.get('/category/:category', obatController.getMedicinesByCategory);

// GET low stock medicines
router.get('/stock/low', obatController.getLowStockMedicines);

// POST create new medicine
router.post('/', obatController.createMedicine);

// PUT update medicine
router.put('/:id', obatController.updateMedicine);

// PATCH update medicine stock
router.patch('/:id/stock', obatController.updateStock);

// DELETE medicine
router.delete('/:id', obatController.deleteMedicine);

module.exports = router;
