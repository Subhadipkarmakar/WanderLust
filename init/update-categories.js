const mongoose = require("mongoose");
const Listing = require("../models/listing.js");

const mongoUri = 'mongodb://127.0.0.1:27017/wonderlust';

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

const categories = [
  "Trending", 
  "Rooms", 
  "Iconic City", 
  "Mountain", 
  "Forest", 
  "Beach", 
  "Arctic", 
  "Camping", 
  "Farm", 
  "Top City", 
  "Lake", 
  "Golfing"
];

const updateCategories = async () => {
  try {
    // Get all listings without a category
    const listings = await Listing.find({ category: { $exists: false } });
    console.log(`Found ${listings.length} listings without categories`);

    // Update each listing with a random category
    for (const listing of listings) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      listing.category = randomCategory;
      await listing.save();
      console.log(`Updated listing "${listing.title}" with category "${randomCategory}"`);
    }

    console.log("All listings have been updated with categories");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error updating categories:", error);
    mongoose.connection.close();
  }
};

updateCategories();