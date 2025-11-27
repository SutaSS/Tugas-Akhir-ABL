const express = require('express');
const router = express.Router();
const rekamMedisController = require('../controllers/rekamMedisController');

// GET all medical records
router.get('/', rekamMedisController.getAllRecords);

// GET single medical record by ID
router.get('/:id', rekamMedisController.getRecordById);

// GET medical records by patient ID
router.get('/patient/:patientId', rekamMedisController.getRecordsByPatientId);

// POST create new medical record
router.post('/', rekamMedisController.createRecord);

// PUT update medical record
router.put('/:id', rekamMedisController.updateRecord);

// DELETE medical record
router.delete('/:id', rekamMedisController.deleteRecord);

module.exports = router;
