const mongoose=require("mongoose");
const initdata=require("./data.js");
const listing = require("../models/listing.js");
mongoose.connect('mongodb://127.0.0.1:27017/wonderlust')
  .then(() => console.log('Connected!'))
  .catch((err)=>{
    console.log(err);
  })
  

  const initdb= async()=>{
    await listing.deleteMany({});
    await listing.insertMany(initdata.data);
    console.log("data was initialized");
  };


  initdb();