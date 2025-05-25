require('dotenv').config();
const mongoose = require('mongoose');

// Disable the initialization of the database
process.env.INIT_DB = 'false';

// Get MongoDB URI from environment variables
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wonderlust';

console.log('Attempting to connect to MongoDB...');
console.log('Node.js version:', process.version);
console.log('Mongoose version:', mongoose.version);
console.log(`MongoDB URI: ${mongoUri.substring(0, 20)}...`); // Only show part of the URI for security

// Connect to MongoDB with improved settings
mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 60000, // 60 seconds
  socketTimeoutMS: 90000, // 90 seconds
  connectTimeoutMS: 60000, // 60 seconds
  maxPoolSize: 5, // Reduce pool size
  minPoolSize: 1, // Minimum pool size
  family: 4, // Force IPv4
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  retryWrites: true,
  retryReads: true
})
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    
    // Get MongoDB server info
    return mongoose.connection.db.admin().serverInfo();
  })
  .then((info) => {
    console.log('MongoDB server version:', info.version);
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Connection closed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });