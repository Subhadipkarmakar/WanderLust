require('dotenv').config();
const { MongoClient } = require('mongodb');

// Get MongoDB URI from environment variables
const mongoUri = process.env.MONGO_URI;

console.log('Attempting to connect to MongoDB using native driver...');
console.log('Node.js version:', process.version);
console.log(`MongoDB URI: ${mongoUri.substring(0, 20)}...`); // Only show part of the URI for security

// Create a new MongoClient
const client = new MongoClient(mongoUri, {
  serverSelectionTimeoutMS: 60000, // 60 seconds
  socketTimeoutMS: 90000, // 90 seconds
  connectTimeoutMS: 60000, // 60 seconds
  maxPoolSize: 5, // Reduce pool size
  minPoolSize: 1, // Minimum pool size
  ssl: true,
  tls: true,
  retryWrites: true,
  retryReads: true
});

// Connect to the MongoDB server
async function run() {
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB!');
    
    // Get server info
    const admin = client.db().admin();
    const serverInfo = await admin.serverInfo();
    console.log('MongoDB server version:', serverInfo.version);
    
    // List databases
    const dbs = await admin.listDatabases();
    console.log('Available databases:');
    dbs.databases.forEach(db => console.log(` - ${db.name}`));
    
    // Close the connection
    await client.close();
    console.log('Connection closed successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  } finally {
    process.exit(0);
  }
}

run();