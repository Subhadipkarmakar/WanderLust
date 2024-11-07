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

// Flash message middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

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
    const alllisting = await Listing.find({});
    console.log(alllisting);
    
    res.render('listings/mongo', { alllisting });
});


app.get("/listings/new", (req, res) => {
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

app.get("/listings/:id/edit", async (req, res) => {
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

app.delete("/listings/:id", async (req, res) => {
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

app.use((error, req, res, next) => {
    console.error("Error:", error);
    res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

