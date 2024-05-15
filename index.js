const express =require("express");
const app=express();
const mongoose = require('mongoose');
const listing = require("./models/listing");

mongoose.connect('mongodb://127.0.0.1:27017/wonderlust')
  .then(() => console.log('Connected!'));

const port=8080;

app.get("/",(req,res)=>{
    res.send("hiii i am root")
})
app.get("/testlisting",async(req,res)=>{
    let samplelisting=new listing({
        title:"my new villa",
        description:"by the sea",
        country:"china",
        price: 1200
    });
    await samplelisting.save();
    console.log("sample is saved");
    res.send("succesfully testing")
})




app.listen(port,()=>{
    console.log(`app is lisening ${port}`);
    
})
