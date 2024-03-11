const mongoose = require("mongoose");
const { listingSchema } = require("../schema");
const Schema  = mongoose.Schema;


let reviewSchema = new Schema({
    
    content:String,
    rating:{
        type:Number,
        min:1,
        Max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
});



const Review = mongoose.model("Review",reviewSchema);

module.exports= Review;