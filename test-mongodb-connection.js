require('dotenv').config();
const mongoose = require('mongoose');

console.log('MongoDB Connection Test');
console.log('======================');

// Environment check
console.log('Environment Variables:');
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);

if (process.env.MONGO_URI) {
    const maskedUri = process.env.MONGO_URI.replace(/\/\/.*@/, '//***:***@');
    console.log('MongoDB URI (masked):', maskedUri);
    
    console.log('\nTesting MongoDB connection...');
    
    mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 10000
    })
    .then(() => {
        console.log('✓ Successfully connected to MongoDB');
        
        // Test database access
        setTimeout(() => {
            try {
                if (mongoose.connection.db) {
                    console.log('✓ Database object available');
                    if (mongoose.connection.db.databaseName) {
                        console.log('✓ Database name:', mongoose.connection.db.databaseName);
                    }
                }
            } catch (err) {
                console.log('⚠ Database name access error:', err.message);
            }
            
            // Close connection and exit
            mongoose.connection.close().then(() => {
                console.log('Connection closed');
                process.exit(0);
            });
        }, 2000);
    })
    .catch((error) => {
        console.error('✗ MongoDB connection failed:', error.message);
        
        // Provide specific guidance based on error type
        if (error.message.includes('EREFUSED') || error.message.includes('queryTxt')) {
            console.error('\nDNS Resolution Issue Detected:');
            console.error('1. Check your internet connection');
            console.error('2. Verify the MongoDB Atlas cluster is running');
            console.error('3. Check if your IP is whitelisted in MongoDB Atlas');
            console.error('4. Try connecting from a different network');
        } else if (error.message.includes('authentication')) {
            console.error('\nAuthentication Issue:');
            console.error('1. Check username and password in connection string');
            console.error('2. Verify database user exists in MongoDB Atlas');
        } else if (error.message.includes('timeout')) {
            console.error('\nTimeout Issue:');
            console.error('1. Check network connectivity');
            console.error('2. Try increasing timeout values');
        }
        
        process.exit(1);
    });
    
    // Connection event listeners
    mongoose.connection.on('connected', () => {
        console.log('Event: Connected to MongoDB');
    });
    
    mongoose.connection.on('error', (err) => {
        console.error('Event: Connection error -', err.message);
    });
    
    mongoose.connection.on('disconnected', () => {
        console.log('Event: Disconnected from MongoDB');
    });
    
} else {
    console.error('✗ MONGO_URI environment variable is not set');
    console.error('Please check your .env file');
    process.exit(1);
}