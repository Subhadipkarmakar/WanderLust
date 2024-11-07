const express =require("express");
const router=express.Router();
// index_route
router.get("/listings", async (req, res) => {
    const alllisting = await Listing.find({});
    res.render('listings/mongo', { alllisting: alllisting });
});

// NEW ROUTE
router.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

router.post("/listings", async (req, res, next) => {
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
router.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
});

 router.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// Update route
router.put('/listings/:id', async (req, res) => {
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
router.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listings");
});

module.exports=router;