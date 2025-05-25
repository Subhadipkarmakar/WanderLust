require('dotenv').config();
const mongoose = require('mongoose');

console.log('Attempting to connect to MongoDB Atlas...');
console.log('Connection string:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000
})
.then(async () => {
  console.log('Successfully connected to MongoDB Atlas!');
  
  try {
    // Try to access the database
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('Available collections:');
    collections.forEach(c => console.log(' - ' + c.name));
  } catch (err) {
    console.error('Error accessing collections:', err);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed');
  }
})
.catch(err => {
  console.error('Connection error:', err);
});