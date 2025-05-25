require('dotenv').config();
const mongoose = require('mongoose');

// Get MongoDB URI from environment variables
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wonderlust';

console.log('Attempting to connect to MongoDB...');
console.log(`MongoDB URI: ${mongoUri.substring(0, 20)}...`); // Only show part of the URI for security

// Connect to MongoDB
mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000
})
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    console.log('Mongoose version:', mongoose.version);
    
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