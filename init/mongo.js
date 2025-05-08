require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require("mongoose");
const initdata = require("./data.js");

// Use environment variable or fallback to local MongoDB
const dbURL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wonderlust';

const listing = require("../models/listing.js");
mongoose.connect(dbURL, {
  serverSelectionTimeoutMS: 60000, // Increase timeout to 60 seconds
  socketTimeoutMS: 60000, // Increase socket timeout to 60 seconds
  connectTimeoutMS: 60000, // Connection timeout
  maxPoolSize: 10, // Maximum number of connections in the pool
  minPoolSize: 1, // Minimum number of connections in the pool
  maxIdleTimeMS: 30000, // How long a connection can remain idle before being removed
  family: 4 // Use IPv4, skip trying IPv6
})
  .then(() => console.log('Connected!'))
  .catch((err) => {
    console.log(err);
  })


const initdb = async () => {
  try {
    console.log("Starting database initialization...");
    await listing.deleteMany({});
    console.log("Existing listings deleted");
    
    const listingsWithOwner = initdata.data.map((obj) => ({ 
      ...obj, 
      owner: "652d0081ae547c5d37e56b57" 
    }));
    
    await listing.insertMany(listingsWithOwner);
    console.log("Data was initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error.message);
    // Don't throw the error, just log it and continue
  }
};

// Only run initialization if explicitly requested
if (process.env.INIT_DB === 'true') {
  initdb();
} else {
  console.log("Database initialization skipped. Set INIT_DB=true in .env to initialize.");
}