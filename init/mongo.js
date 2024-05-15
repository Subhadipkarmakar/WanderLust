const mongoose = require("mongoose");
const initdata = require("./data.js");

const mongoUri = process.env.MONGO_URI;

const listing = require("../models/listing.js");
mongoose.connect(mongoUri)
  .then(() => console.log('Connected!'))
  .catch((err) => {
    console.log(err);
  })


const initdb = async () => {
  await listing.deleteMany({});
  await listing.insertMany(initdata.data);
  console.log("data was initialized");
};

module.exports = initdb;
