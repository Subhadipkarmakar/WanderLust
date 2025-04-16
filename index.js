require('dotenv/config');
const express = require("express");
const mongoose = require('mongoose');
const initdb = require("./init/mongo");
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");
const Listing = require("./models/listing");
const Review = require("./models/review");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const { log } = require('console');
const {isLoggedin, saveRedirectUrl}= require("../Project1/views/Midilware.js");

const app = express();
const port = 8080;

// Middleware configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// Configure session middleware for flash messages
app.use(
    session({
        secret: "yourSecretKey", // Replace with a strong secret key
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set to true if using HTTPS
    })
);
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Flash message middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curruser=req.user;
    next();
});


app.get("/demouser", async (req,res)=>{
    let fakeuser= new User({
        email:"student@gmail.com",
        username:"delta-user",
    });

    let RegisteredUser= await User.register(fakeuser,"halloworld");
    res.send(RegisteredUser);
})
// // MongoDB connection setup
// mongoose.connect('mongodb://127.0.0.1:27017/listingsDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((error) => console.log("MongoDB connection error:", error));

// Routes and handlers
app.get("/", (req, res) => {
    res.send("Welcome to the Listings app!");
});
app.get("/listings", async (req, res) => {
    const category = req.query.category;
    let alllisting;
    
    if (category) {
        // If a category is specified, find listings with that category (limit to 4)
        alllisting = await Listing.find({ category: category }).limit(4);
    } else {
        // If no category is specified, get all listings
        alllisting = await Listing.find({});
    }
    
    res.render('listings/mongo', { alllisting, selectedCategory: category });
});


app.get("/listings/new",isLoggedin, (req, res) => {

    res.render("listings/new");
});

app.post("/listings", async (req, res) => {
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
        req.flash("success", "New listing created");
        res.redirect("/listings");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating listing");
    }
});

app.get("/listings/:id", async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate("reviews");
        res.render("listings/show", { listing });
    } catch (error) {
        console.error(error);
        res.status(404).send("Listing not found");
    }
});

app.get("/listings/:id/edit", isLoggedin,async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        res.render("listings/edit", { listing });
    } catch (error) {
        console.error(error);
        res.status(404).send("Listing not found");
    }
});

app.put('/listings/:id', async (req, res) => {
    try {
        const { title, description, country, image, location, price } = req.body.listing;
        await Listing.findByIdAndUpdate(
            req.params.id,
            { title, description, country, image: { url: image }, location, price },
            { new: true, runValidators: true }
        );
        req.flash("success", "Listing updated");
        res.redirect(`/listings/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating listing");
    }
});

app.delete("/listings/:id",isLoggedin, async (req, res) => {
    try {
        await Listing.findByIdAndDelete(req.params.id);
        req.flash("success", "Listing deleted");
        res.redirect("/listings");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting listing");
    }
});

app.post("/listings/:id/reviews", async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        const newReview = new Review({
            rating: req.body.review.rating,
            comment: req.body.review.comment
        });
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        req.flash("success", "Review added");
        res.redirect(`/listings/${listing._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding review");
    }
});

// //delete review
// app.delete("/listings/:id/reviews/reviewId", async(req,res)=>{
//     let{id,reviewId}=req.params;
//     await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/listings/${id}`)
// });
app.delete("/listings/:id/reviews/:reviewId", async (req, res) => {
    let { id, reviewId } = req.params;
  
    try {
      // Remove the reviewId from the listing's reviews array
      const listing = await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }, { new: true });
  
      // Check if the listing was found and updated
      if (!listing) {
        return res.status(404).send("Listing not found");
      }
  
      // Delete the review
      const review = await Review.findByIdAndDelete(reviewId);
  
      // Check if the review was found and deleted
      if (!review) {
        return res.status(404).send("Review not found");
      }
      req.flash("success", "Review removed");
      // Redirect to the listing page
      res.redirect(`/listings/${id}`);
    } catch (error) {
      // Handle any errors that occur
      console.error(error);
      res.status(500).send("An error occurred while deleting the review");
    }
  });
  

   app.get("/signup",(req,res)=>{
    res.render("users/signup.ejs")
   });

   app.post("/signup", async (req,res,next)=>{
    try{
        let {username,email,password}=req.body;
    const newUser= new User({email,username});
    const registeredUser=await User.register(newUser,password);
    console.log(registeredUser);
    req.logIn(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","welcome to the Wonderlust");
    res.redirect("/listings");
    })
    
    }
    catch(e){
        req.flash("error", e.massage);
        res.redirect("/signup");
    }
   });


   app.get("/login",(req,res)=>{
    res.render("users/login.ejs");
   });

   app.post('/login', saveRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/login',failureFlash:true, }),
    async(req, res)=> {
      req.flash("success","welcome back to the wonderlust");
      let redirectUrl=res.locals.redirectUrl || "/listings"
    
      res.redirect(redirectUrl);
    });

    app.get("/logout",(req,res,next)=>{
      req.logOut((err)=>{
       if(err){
        next(err);
       }
       req.flash("success","you are logged out !");
       res.redirect("/listings");
      })  
      })

  
app.use((error, req, res, next) => {
    console.error("Error:", error);
    res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});


