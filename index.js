require('dotenv/config');

const express = require("express");
const app = express();

const mongoose = require('mongoose');
const Listing = require("./models/listing");
const methodOverride=require("method-override")
const initdb = require("./init/mongo");
const path=require("path");
const { log } = require('console');

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"))
const port = 8080;
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.get("/", (req, res) => {
    res.send("hiii i am root")
})

app.get("/testlisting", async (req, res) => {
    let samplelisting = new listing({
        title: "my new villa",
        description: "by the sea",
        country: "china",
        price: 1200
    });
    const dbResponse = await samplelisting.save();
    console.log(dbResponse);
    res.send("succesfully testing")
})
//index_route
app.get("/listings",async(req,res)=>{
   const alllisting= await Listing.find({})
   res.render('listings/mongo', { alllisting: alllisting });
});
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})
//view_route
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})
//post
app.post("/listings",async (req,res)=>{
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
   res.redirect("/listings");

});
//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
//update route
app.put("/listings/:id", async(req,res)=>{
    let {id}=req.params;
   let updatedlisting=await Listing.findByIdAndUpdate(id, {...req.body.listing});
   console.log(updatedlisting);
   res.redirect("/listings")
})
app.listen(port, () => {
    console.log(`app is lisening ${port}`);
})
