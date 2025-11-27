const { MongoClient } = require('mongodb');
require('dotenv').config();

console.log('📋 Testing MongoDB Connection...\n');
console.log('MONGO_URI:', process.env.MONGO_URI ? '✅ Found' : '❌ Not found');

if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI tidak ditemukan di .env');
  process.exit(1);
}

async function testConnection() {
  const tests = [
    {
      name: 'Test 1: Standard Connection with Stable API',
      options: {
        serverApi: {
          version: '1',
          strict: true,
          deprecationErrors: true,
        },
      }
    },
    {
      name: 'Test 2: Connection with Extended Timeout',
      options: {
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        serverSelectionTimeoutMS: 30000,
      }
    },
    {
      name: 'Test 3: Connection without SSL verification',
      options: {
        tls: true,
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true,
      }
    }
  ];

  for (const test of tests) {
    console.log(`\n🧪 ${test.name}`);
    console.log('⏳ Connecting...');
    
    try {
      const client = new MongoClient(process.env.MONGO_URI, test.options);
      await client.connect();
      await client.db('admin').command({ ping: 1 });
      console.log('✅ SUCCESS! Connection works with these options.');
      await client.close();
      return test.options;
    } catch (error) {
      console.log('❌ Failed:', error.message);
    }
  }

  console.log('\n\n⚠️  All tests failed. Kemungkinan masalah:');
  console.log('\n1. 🌐 IP Address Issue');
  console.log('   - Buka MongoDB Atlas Dashboard');
  console.log('   - Pergi ke Network Access');
  console.log('   - Tambahkan IP: 0.0.0.0/0 (allow all) untuk testing');
  
  console.log('\n2. 🔐 Authentication Issue');
  console.log('   - Cek username & password di connection string');
  console.log('   - Pastikan user memiliki akses ke database');
  
  console.log('\n3. 💤 Cluster Paused');
  console.log('   - MongoDB Atlas free tier bisa sleep setelah idle');
  console.log('   - Buka dashboard dan pastikan cluster aktif');
  
  console.log('\n4. 🔧 Alternatif: Gunakan MongoDB Local');
  console.log('   - Install MongoDB Compass atau MongoDB local');
  console.log('   - Ganti MONGO_URI ke: mongodb://localhost:27017');
}

testConnection().catch(console.error);
