
require('dotenv/config');

const express = require("express");
const app = express();

const mongoose = require('mongoose');
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const initdb = require("./init/mongo");
const path = require("path");
const { log } = require('console');
const ejsMate = require("ejs-mate");
const Review = require("./models/review");  // You already imported Review here
const passport= require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const { wrap } = require('module');
const flash=require("connect-flash");
const listings=require("./routes/listing.js")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const port = 8080;
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine('ejs', ejsMate);

app.get("/", (req, res) => {
    res.send("hiii i am root")
});

app.get("/testlisting", async (req, res) => {
    let samplelisting = new Listing({
        title: "my new villa",
        description: "by the sea",
        country: "china",
        price: 1200
    });
    const dbResponse = await samplelisting.save();
    console.log(dbResponse);
    res.send("succesfully testing")
});

// index_route
app.get("/listings", async (req, res) => {
    const alllisting = await Listing.find({});
    res.render('listings/mongo', { alllisting: alllisting });
});

// NEW ROUTE
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

app.post("/listings", async (req, res, next) => {
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
        req.flash("success","New listing created");
        res.redirect("/listings");
    } catch (error) {
        next(error);
    }
});

// Route to get listing by ID
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
});

// Edit route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// Update route
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

// Delete route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listings");
});

// Adding reviews to a listing
app.post("/listings/:id/reviews", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    // Create a new review with the author field
    const newReview = new Review({
      ...req.body.review, // Get the review data (rating, comment) from the form
    //   author: req.body.review.author  // Ensure author is passed from the form
    });

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("New review saved");
    res.redirect(`/listings/${listing._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
app.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});
app.post("/signup",async(req,res)=>{
    let{username,email,password}=req.body;
    const newUser= new User({email,username});
    const registerduser= await User.register(newUser,password);
    console.log(registerduser);
    res.redirect("/listings");
})
app.use(passport.initialize());
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((error, req, res, next) => {
  console.error(error); // Log the error for debugging
  res.status(500).send("Something went wrong!"); // Send a generic error message
});
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    console.log( res.locals.success);
    next();
})

app.get("/demouser",async(req,res)=>{
    let fakeuser= new User({
        email : "student@gmail.com",
        username : "delta-student"
    });
   let registerduser=await User.register(fakeuser,"halloworld");
   res.send(registerduser);
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
