// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const imageSchema= new Schema({
//     type:String,
//     set:(v) =>
//         v ===""
//     ? "https://images.unsplash.com/photo-1716368968681-a48d828c1c0d?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v ,
//     }
// )


// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: String,
//     country: String,
//     image: {
//     type: imageSchema,
//     required: false
//     },
//     price: String,
//     location: String
// });


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: {
    type: String,
    set: (v) => v === "" ? "https://images.unsplash.com/photo-1716368968681-a48d828c1c0d?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
  }
});

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  country: String,
  image: {
    type: imageSchema,
    required: false
  },
  price: String,
  location: String,
  reviews : [
    {
      type : Schema.Types.ObjectId,
      ref : "Review"
    }
  ]
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

