const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

let db;
let client;

async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI tidak ditemukan di .env file');
    }

    console.log('🔄 Connecting to MongoDB...');
    
    client = new MongoClient(process.env.MONGO_URI, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
      maxPoolSize: 10,
      minPoolSize: 2,
      retryWrites: true,
      retryReads: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    
    db = client.db('medical_records');
    console.log('✅ Connected to MongoDB - Medical Records DB');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Pastikan IP address Anda sudah ditambahkan di MongoDB Atlas');
    console.error('   2. Cek username dan password di connection string');
    console.error('   3. Pastikan cluster MongoDB Atlas aktif');
    process.exit(1);
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not connected!');
  }
  return db;
}

module.exports = { connectDB, getDB };