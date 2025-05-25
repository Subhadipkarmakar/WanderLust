# Render Deployment Guide with Sample Data

This guide will help you deploy your Wonderlust application to Render with sample data.

## Prerequisites

1. Create a [Render](https://render.com/) account
2. Set up a MongoDB Atlas database
3. Push your code to a Git repository (GitHub, GitLab, etc.)

## Step 1: Set Up MongoDB Atlas

1. Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (the free tier is sufficient)
3. Create a database user with read/write permissions
4. Add your IP address to the IP Access List (or allow access from anywhere for development)
5. Get your connection string by clicking "Connect" > "Connect your application"
   - It will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/wonderlust?retryWrites=true&w=majority`
   - Replace `<username>` and `<password>` with your database user credentials
   - Note that the database name is set to "wonderlust" at the end of the URI

## Step 2: Update Your .env File

Update your .env file with the MongoDB Atlas connection string:

```
# MongoDB URI for production
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/wonderlust?retryWrites=true&w=majority

# Session Configuration
SECRET=your_session_secret_key
SESSION_CRYPTO_SECRET=your_session_crypto_secret

# Environment Settings
PORT=8080
NODE_ENV=production
INIT_DB=true
```

Note: Set `INIT_DB=true` to initialize your database with sample data on startup.

## Step 3: Modify Your Code to Initialize Sample Data

Create a new file called `init-db.js` in the root directory:

```javascript
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
```

Then update your index.js file to use this initialization script:

```javascript
// Add this near the top of your index.js file
const initializeDatabase = require('./init-db');

// After your MongoDB connection setup, add:
if (process.env.INIT_DB === 'true') {
  initializeDatabase()
    .then(() => console.log('Database initialization completed'))
    .catch(err => console.error('Database initialization failed:', err));
}
```

## Step 4: Deploy to Render

1. Push your updated code to your Git repository

2. In Render:
   - Create a new Web Service
   - Connect to your Git repository
   - Select the Node.js environment
   - Set the build command: `npm install`
   - Set the start command: `node index.js`
   
3. Add Environment Variables in Render:
   - MONGO_URI (from MongoDB Atlas)
   - SECRET (for session)
   - SESSION_CRYPTO_SECRET
   - NODE_ENV=production
   - INIT_DB=true (set to true for the first deployment, then you can set it to false after)

4. Click "Create Web Service" to deploy your application

## Step 5: Verify Deployment

1. Once deployment is complete, visit your Render URL to access your application
2. Verify that your sample data has been initialized
3. Test all functionality in the deployed application

## Step 6: Post-Deployment

After confirming that your sample data has been initialized:

1. Update the INIT_DB environment variable to "false" in Render to prevent re-initialization on future deployments
2. Set up automatic deployments from your Git repository if desired

## Troubleshooting

If you encounter any issues:

1. Check the Render logs for error messages
2. Verify your MongoDB Atlas connection string
3. Make sure all environment variables are set correctly
4. Check that your Node.js version is compatible with Render (your package.json specifies Node.js 22.11.0, which is very recent)