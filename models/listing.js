const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const listingschema= new Schema({
    title:{
        type:String,
        required: true
                 },
    description:String,
    country:String,
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1715514894643-aedb49942811?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(v) => v === ""?
         "https://images.unsplash.com/photo-1715514894643-aedb49942811?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          : v,
    },
    price:String,
    location: String
})

const listing=mongoose.model("listing",listingschema);
module.exports=listing;