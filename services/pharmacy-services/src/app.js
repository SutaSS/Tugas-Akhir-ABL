const express = require('express');
const { connectDB, getDB } = require('./database');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;

// GET all medicines
app.get('/api/medicines', async (req, res) => {
  try {
    const db = getDB();
    const medicines = await db.collection('medicines').find().toArray();
    res.json({ success: true, data: medicines });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single medicine by ID
app.get('/api/medicines/:id', async (req, res) => {
  try {
    const db = getDB();
    const medicine = await db.collection('medicines').findOne({ _id: new ObjectId(req.params.id) });
    if (!medicine) {
      return res.status(404).json({ success: false, error: 'Medicine not found' });
    }
    res.json({ success: true, data: medicine });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create new medicine
app.post('/api/medicines', async (req, res) => {
  try {
    const db = getDB();
    const { name, description, price, stock, category } = req.body;
    
    const newMedicine = {
      name,
      description,
      price,
      stock,
      category,
      createdAt: new Date()
    };
    
    const result = await db.collection('medicines').insertOne(newMedicine);
    res.status(201).json({ success: true, data: { _id: result.insertedId, ...newMedicine } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT update medicine
app.put('/api/medicines/:id', async (req, res) => {
  try {
    const db = getDB();
    const { name, description, price, stock, category } = req.body;
    
    const result = await db.collection('medicines').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, description, price, stock, category, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: 'Medicine not found' });
    }
    
    res.json({ success: true, message: 'Medicine updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE medicine
app.delete('/api/medicines/:id', async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('medicines').deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Medicine not found' });
    }
    
    res.json({ success: true, message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Pharmacy Service' });
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Pharmacy Service running on port ${PORT}`);
  });
});