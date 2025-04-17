require('dotenv').config();
const { MongoClient } = require('mongodb');

// Extract the username and password from the existing connection string
const connectionString = process.env.MONGO_URI;
console.log('Original connection string:', connectionString);

// Try to connect using the MongoDB driver directly
async function connectToMongoDB() {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    
    const client = new MongoClient(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      family: 4,
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      retryReads: true,
      directConnection: true
    });

    await client.connect();
    console.log('Successfully connected to MongoDB Atlas!');
    
    // List databases
    const adminDb = client.db('admin');
    const result = await adminDb.command({ ping: 1 });
    console.log('Ping result:', result);
    
    const dbs = await client.db().admin().listDatabases();
    console.log('Available databases:');
    dbs.databases.forEach(db => console.log(` - ${db.name}`));
    
    await client.close();
    console.log('Connection closed');
    
    return true;
  } catch (err) {
    console.error('Connection error:', err);
    return false;
  }
}

connectToMongoDB();