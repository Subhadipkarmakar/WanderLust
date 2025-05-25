// init-db.js
require('dotenv').config();
const mongoose = require('mongoose');
const initdata = require('./init/data.js');
const Listing = require('./models/listing.js');
const User = require('./models/user.js');

// Function to initialize the database with sample data
async function initializeDatabase() {
  try {
    console.log('Initializing database with sample data...');
    
    // Create a demo user if it doesn't exist
    let demoUser = await User.findOne({ username: 'demo-user' });
    
    if (!demoUser) {
      console.log('Creating demo user...');
      const newUser = new User({
        email: 'demo@example.com',
        username: 'demo-user'
      });
      
      demoUser = await User.register(newUser, 'demopassword');
      console.log('Demo user created successfully');
    }
    
    // Check if listings already exist
    const existingListingsCount = await Listing.countDocuments();
    
    if (existingListingsCount === 0) {
      console.log('No listings found. Adding sample listings...');
      
      // Add owner ID to each listing
      const listingsWithOwner = initdata.data.map((obj) => ({ 
        ...obj, 
        owner: demoUser._id 
      }));
      
      // Insert the listings
      await Listing.insertMany(listingsWithOwner);
      console.log(`${listingsWithOwner.length} sample listings added successfully`);
    } else {
      console.log(`Database already contains ${existingListingsCount} listings. Skipping initialization.`);
    }
    
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

module.exports = initializeDatabase;