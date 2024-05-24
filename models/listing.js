const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    url: {
        type: String,
        default: "https://images.unsplash.com/photo-1715514894643-aedb49942811",
        set: (v) => v === "" ? 
            "https://images.unsplash.com/photo-1715514894643-aedb49942811"
            : v,
    }
}, { _id: false });
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    country: String,
    image: {
    type:imageSchema,
    required: false
    },
    price: String,
    location: String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
