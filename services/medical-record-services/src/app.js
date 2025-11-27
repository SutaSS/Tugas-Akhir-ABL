const express = require('express');
const { connectDB, getDB } = require('./database');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

// GET all medical records
app.get('/api/records', async (req, res) => {
  try {
    const db = getDB();
    const records = await db.collection('records').find().toArray();
    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single medical record by ID
app.get('/api/records/:id', async (req, res) => {
  try {
    const db = getDB();
    const record = await db.collection('records').findOne({ _id: new ObjectId(req.params.id) });
    if (!record) {
      return res.status(404).json({ success: false, error: 'Record not found' });
    }
    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create new medical record
app.post('/api/records', async (req, res) => {
  try {
    const db = getDB();
    const { patientName, diagnosis, treatment, date } = req.body;
    
    const newRecord = {
      patientName,
      diagnosis,
      treatment,
      date: date || new Date(),
      createdAt: new Date()
    };
    
    const result = await db.collection('records').insertOne(newRecord);
    res.status(201).json({ success: true, data: { _id: result.insertedId, ...newRecord } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT update medical record
app.put('/api/records/:id', async (req, res) => {
  try {
    const db = getDB();
    const { patientName, diagnosis, treatment, date } = req.body;
    
    const result = await db.collection('records').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { patientName, diagnosis, treatment, date, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: 'Record not found' });
    }
    
    res.json({ success: true, message: 'Record updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE medical record
app.delete('/api/records/:id', async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('records').deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Record not found' });
    }
    
    res.json({ success: true, message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Medical Records Service' });
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Medical Records Service running on port ${PORT}`);
  });
});