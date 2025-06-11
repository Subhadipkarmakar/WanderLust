require('dotenv/config');
const express = require("express");
const mongoose = require('mongoose');
const initializeDatabase = require('./init-db');

// Only require and run the database initialization in development mode
const isDevelopment = process.env.NODE_ENV === 'development';
if (isDevelopment) {
  require("./init/mongo");
}
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");
const Listing = require("./models/listing");
const Review = require("./models/review");
const Booking = require("./models/booking");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const { log } = require('console');
const {isLoggedin, saveRedirectUrl}= require("./views/Midilware.js");

const app = express();
const port = process.env.PORT || 8080;

// MongoDB connection setup
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wonderlust';
mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000 // Increase socket timeout to 45 seconds
})
    .then(() => {
        console.log("Connected to MongoDB");
        
        // Initialize database with sample data if INIT_DB is true
        if (process.env.INIT_DB === 'true') {
            initializeDatabase()
                .then(() => console.log('Database initialization completed'))
                .catch(err => console.error('Database initialization failed:', err));
        }
    })
    .catch((error) => console.log("MongoDB connection error:", error));

// Middleware configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// Configure session middleware with MongoDB storage
app.use(
    session({
        secret: process.env.SECRET || "yourSecretKey",
        resave: false,
        saveUninitialized: false, // Changed to false for better performance
        cookie: { 
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
        },
        store: MongoStore.create({
            mongoUrl: mongoUri,
            touchAfter: 24 * 3600, // time period in seconds - update session only once per day
            crypto: {
                secret: process.env.SESSION_CRYPTO_SECRET || 'sessioncryptosecret'
            },
            ttl: 14 * 24 * 60 * 60, // = 14 days. Default is 14 days
            autoRemove: 'native', // Default
            collectionName: 'sessions', // Collection name for sessions
            stringify: false, // Don't stringify session data (better performance)
            // Error handling
            on: {
                error: function(error) {
                    console.error('MongoStore session error:', error);
                },
                connected: function() {
                    console.log('MongoStore session connected');
                }
            }
        })
    })
);
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Flash message middleware
app.use(async (req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curruser = req.user;
    
    // If user is logged in, get active bookings count for navbar badge
    if (req.user) {
        try {
            // Use the session value if it exists, otherwise count from database
            if (req.session.activeBookingsCount !== undefined) {
                res.locals.activeBookingsCount = req.session.activeBookingsCount;
            } else {
                const bookingsCount = await Booking.countDocuments({ 
                    user: req.user._id,
                    status: { $ne: "cancelled" }
                });
                res.locals.activeBookingsCount = bookingsCount;
                req.session.activeBookingsCount = bookingsCount;
            }
            
            // Count user's listings for Host badge
            const listingsCount = await Listing.countDocuments({ owner: req.user._id });
            res.locals.userListingsCount = listingsCount;
        } catch (err) {
            console.error("Error counting user data:", err);
            res.locals.activeBookingsCount = 0;
            res.locals.userListingsCount = 0;
        }
    }
    
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
// MongoDB connection already set up at the top of the file

// Routes and handlers
// Root route - redirect to listings
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

// Search route
app.get("/listings/search", async (req, res) => {
    const { q } = req.query;
    
    if (!q || q.trim() === "") {
        return res.redirect("/listings");
    }
    
    try {
        // Create a case-insensitive search query for multiple fields
        const searchQuery = {
            $or: [
                { title: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } },
                { location: { $regex: q, $options: "i" } },
                { country: { $regex: q, $options: "i" } }
            ]
        };
        
        const searchResults = await Listing.find(searchQuery);
        
        res.render("listings/search-results", { 
            alllisting: searchResults, 
            searchQuery: q,
            resultCount: searchResults.length
        });
    } catch (err) {
        console.error("Search error:", err);
        req.flash("error", "An error occurred during search");
        res.redirect("/listings");
    }
});

// Booking Routes
// Show booking form
app.get("/listings/:id/book", isLoggedin, async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
        
        res.render("bookings/new", { listing });
    } catch (err) {
        console.error("Error showing booking form:", err);
        req.flash("error", "Something went wrong");
        res.redirect("/listings");
    }
});

// Create new booking
app.post("/bookings", isLoggedin, async (req, res) => {
    try {
        const { listingId, checkIn, checkOut, guests, totalPrice } = req.body;
        
        // Ensure totalPrice is a valid number
        let parsedTotalPrice = totalPrice;
        if (typeof totalPrice === 'string') {
            // Remove any non-numeric characters (like currency symbols)
            parsedTotalPrice = parseInt(totalPrice.replace(/[^\d]/g, ''), 10);
        }
        
        // Create new booking
        const newBooking = new Booking({
            listing: listingId,
            user: req.user._id,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            guests: parseInt(guests),
            totalPrice: parsedTotalPrice,
            status: "confirmed" // Auto-confirm for now
        });
        
        await newBooking.save();
        
        // Populate listing details for the confirmation page
        const booking = await Booking.findById(newBooking._id).populate("listing");
        
        req.flash("success", "Booking confirmed successfully!");
        res.redirect(`/bookings/${newBooking._id}`);
    } catch (err) {
        console.error("Error creating booking:", err);
        req.flash("error", "Failed to create booking");
        res.redirect("/listings");
    }
});

// View a specific booking
app.get("/bookings/:id", isLoggedin, async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id).populate({
            path: "listing",
            // This makes it so that null listings don't cause an error
            match: { _id: { $exists: true } }
        });
        
        if (!booking) {
            req.flash("error", "Booking not found");
            return res.redirect("/bookings");
        }
        
        // Check if the booking belongs to the current user
        if (!booking.user.equals(req.user._id)) {
            req.flash("error", "You don't have permission to view this booking");
            return res.redirect("/bookings");
        }
        
        res.render("bookings/show", { booking });
    } catch (err) {
        console.error("Error viewing booking:", err);
        req.flash("error", "Something went wrong");
        res.redirect("/bookings");
    }
});

// View all user bookings
app.get("/bookings", isLoggedin, async (req, res) => {
    try {
        // Populate listing but handle the case where listing might be null
        const bookings = await Booking.find({ user: req.user._id })
            .populate({
                path: "listing",
                // This makes it so that null listings don't cause an error
                match: { _id: { $exists: true } }
            })
            .sort({ createdAt: -1 });
        
        // Count active bookings (not cancelled)
        const activeBookingsCount = bookings.filter(booking => booking.status !== "cancelled").length;
        
        // Set the count in the session for the navbar to display
        req.session.activeBookingsCount = activeBookingsCount;
        
        res.render("bookings/index", { bookings, activeBookingsCount });
    } catch (err) {
        console.error("Error fetching bookings:", err);
        req.flash("error", "Failed to load bookings");
        res.redirect("/listings");
    }
});

// Cancel a booking
app.post("/bookings/:id/cancel", isLoggedin, async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        
        if (!booking) {
            req.flash("error", "Booking not found");
            return res.redirect("/bookings");
        }
        
        // Check if the booking belongs to the current user
        if (!booking.user.equals(req.user._id)) {
            req.flash("error", "You don't have permission to cancel this booking");
            return res.redirect("/bookings");
        }
        
        booking.status = "cancelled";
        await booking.save();
        
        req.flash("success", "Booking cancelled successfully");
        res.redirect("/bookings");
    } catch (err) {
        console.error("Error cancelling booking:", err);
        req.flash("error", "Failed to cancel booking");
        res.redirect("/bookings");
    }
});


// View user's listings
app.get("/listings/my-listings", isLoggedin, async (req, res) => {
    try {
        // Find all listings where the owner is the current user
        const userListings = await Listing.find({ owner: req.user._id });
        
        // For each listing, count how many bookings it has
        for (let listing of userListings) {
            const bookingCount = await Booking.countDocuments({ listing: listing._id });
            listing.bookings = Array(bookingCount);
        }
        
        res.render("listings/user-listings", { userListings });
    } catch (err) {
        console.error("Error fetching user listings:", err);
        req.flash("error", "Failed to load your listings");
        res.redirect("/listings");
    }
});

app.get("/listings/new",isLoggedin, (req, res) => {
    res.render("listings/new");
});

app.post("/listings", isLoggedin, async (req, res) => {
    try {
        const { title, description, country, image, location, price, category } = req.body.listing;
        const newListing = new Listing({
            title,
            description,
            country,
            image: { url: image },
            location,
            price,
            category,
            owner: req.user._id
        });
        await newListing.save();
        req.flash("success", "New listing created");
        res.redirect("/listings/my-listings");
    } catch (error) {
        console.error(error);
        req.flash("error", "Error creating listing");
        res.redirect("/listings/new");
    }
});

app.get("/listings/:id", async (req, res) => {
    try {
        // Check if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            req.flash("error", "Invalid listing ID");
            return res.redirect("/listings");
        }
        
        const listing = await Listing.findById(req.params.id).populate("reviews");
        
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
        
        res.render("listings/show", { listing });
    } catch (error) {
        console.error(error);
        req.flash("error", "Listing not found");
        res.redirect("/listings");
    }
});

app.get("/listings/:id/edit", isLoggedin, async (req, res) => {
    try {
        // Check if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            req.flash("error", "Invalid listing ID");
            return res.redirect("/listings");
        }
        
        const listing = await Listing.findById(req.params.id);
        
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
        
        // Check if the current user is the owner of the listing
        if (listing.owner && !listing.owner.equals(req.user._id)) {
            req.flash("error", "You don't have permission to edit this listing");
            return res.redirect("/listings");
        }
        
        res.render("listings/edit", { listing });
    } catch (error) {
        console.error(error);
        req.flash("error", "Listing not found");
        res.redirect("/listings");
    }
});

app.put('/listings/:id', isLoggedin, async (req, res) => {
    try {
        const { title, description, country, image, location, price, category } = req.body.listing;
        
        // Find the listing first to check ownership
        const listing = await Listing.findById(req.params.id);
        
        // Check if the listing exists
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings/my-listings");
        }
        
        // Check if the current user is the owner of the listing
        if (listing.owner && !listing.owner.equals(req.user._id)) {
            req.flash("error", "You don't have permission to edit this listing");
            return res.redirect("/listings/my-listings");
        }
        
        // Update the listing
        await Listing.findByIdAndUpdate(
            req.params.id,
            { title, description, country, image: { url: image }, location, price, category },
            { new: true, runValidators: true }
        );
        
        req.flash("success", "Listing updated successfully");
        res.redirect(`/listings/my-listings`);
    } catch (error) {
        console.error(error);
        req.flash("error", "Error updating listing");
        res.redirect(`/listings/${req.params.id}/edit`);
    }
});

app.delete("/listings/:id", isLoggedin, async (req, res) => {
    try {
        // Find the listing first to check ownership
        const listing = await Listing.findById(req.params.id);
        
        // Check if the listing exists
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings/my-listings");
        }
        
        // Check if the current user is the owner of the listing
        if (listing.owner && !listing.owner.equals(req.user._id)) {
            req.flash("error", "You don't have permission to delete this listing");
            return res.redirect("/listings/my-listings");
        }
        
        // Delete the listing
        await Listing.findByIdAndDelete(req.params.id);
        
        // Also delete any bookings associated with this listing
        await Booking.deleteMany({ listing: req.params.id });
        
        req.flash("success", "Listing and associated bookings deleted");
        res.redirect("/listings/my-listings");
    } catch (error) {
        console.error(error);
        req.flash("error", "Error deleting listing");
        res.redirect("/listings/my-listings");
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
        req.flash("error", e.message);
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

// Function to clean up expired sessions
const cleanupExpiredSessions = async () => {
    try {
        // Connect to the sessions collection
        const sessionCollection = mongoose.connection.collection('sessions');
        
        // Find and delete expired sessions
        const now = new Date();
        const result = await sessionCollection.deleteMany({
            "expires": { $lt: now }
        });
        
        console.log(`Cleaned up ${result.deletedCount} expired sessions`);
    } catch (err) {
        console.error('Error cleaning up sessions:', err);
    }
};

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
    
    // Schedule session cleanup to run daily
    setInterval(cleanupExpiredSessions, 24 * 60 * 60 * 1000); // Run once a day
    
    // Also run it once at startup
    cleanupExpiredSessions();
});


