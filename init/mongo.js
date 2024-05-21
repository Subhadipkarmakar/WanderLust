const mongoose = require("mongoose");
const initdata = require("./data.js");

const mongoUri = 'mongodb://127.0.0.1:27017/wonderlust';

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

initdb();