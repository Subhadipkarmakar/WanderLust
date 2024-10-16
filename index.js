require('dotenv/config');

const express = require("express");
const app = express();

const mongoose = require('mongoose');
const Listing = require("./models/listing");
const methodOverride=require("method-override")
const initdb = require("./init/mongo");
const path=require("path");
const { log } = require('console');
const ejsMate=require("ejs-mate");
const Review = require("./models/review");
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"))
const port = 8080;
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine('ejs', ejsMate);
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
//NEW ROUTE
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})
app.post("/listings", async (req, res,next) => {
  try {
    const { title, description, country, image, location, price } = req.body.listing;
    const newListing = new Listing({
      title,
      description,
      country,
      image: { url: image },
      location,
      price
    });

    await newListing.save();
    res.redirect("/listings");
  } catch (error) {
    next(error)
  }
});

//view_route
const Review = mongoose.model('Review', reviewSchema);
const Listing = mongoose.model('Listing', listingSchema);

// Route to get listing by ID
app.get("/listings/:id",async (req,res)=>{
  let {id}=req.params;
  const listing=await Listing.findById(id).populate("reviews");
  res.render("listings/show.ejs",{listing});
})


//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
//update route
app.put('/listings/:id', async (req, res) => {
    try {
      const { title, description, country, image, location, price } = req.body.listing;
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        { title, description, country, image: { url: image }, location, price },
        { new: true, runValidators: true }
      );
      res.redirect(`/listings/${updatedListing._id}`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedlisting= await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listings")
  });
 app.post("/listings/:id/reviews",async(req,res)=>{
   let listing=await Listing.findById(req.params.id)
   let newReview= new Review(req.body.review)
   listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new review saved");
    res.redirect(`/listings/${listing._id}`)
 }) 



  app.use((error,req,res,next)=>{
    res.send("something went wrong!")
  })
app.listen(port, () => {
    console.log(`app is lisening ${port}`);
});


