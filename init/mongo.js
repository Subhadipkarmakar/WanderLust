require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require("mongoose");
const initdata = require("./data.js");

// Use environment variable or fallback to local MongoDB
const dbURL = process.env.MONGO_URI ;

const listing = require("../models/listing.js");
mongoose.connect(dbURL, {
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
  family: 4, // Force IPv4
  maxPoolSize: 10, // Maintain up to 10 socket connections
  minPoolSize: 5, // Maintain at least 5 socket connections
  connectTimeoutMS: 30000, // Give up initial connection after 30 seconds
  retryWrites: true,
  retryReads: true
})
  .then(() => console.log('Connected!'))
  .catch((err) => {
    console.log(err);
  })


const initdb = async () => {
  await listing.deleteMany({});
  const listingsWithOwner = initdata.data.map((obj) => ({ 
    ...obj, 
    owner: "652d0081ae547c5d37e56b57" 
  }));
  await listing.insertMany(listingsWithOwner);
  console.log("data was initialized");
};

initdb();