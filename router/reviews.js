const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema}= require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const validateReview = (req,res ,next)=>{

    let {error} = reviewSchema.validate(req.body);

    console.log(error);
    if(error){

        let errMsg = error.details.map((en)=>en.message).join(",");
        throw new ExpressError (400,errMsg);
    }
    else{
        next();
    }
}

//post review
router.post("/",validateReview,wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);

    let newReview = new Review(req.body.review);

    listing.review.push(newReview);

    await listing.save();
    await newReview.save();

    console.log("updated sucessgul");
    req.flash("sucess","New Review added succesfully!");

    res.redirect(`/listings/${listing._id}`);



}));

//delete review rout

router.delete("/:reviewId",wrapAsync(async(req,res)=>{


    let {id,reviewId}= req.params;


    await Listing.findByIdAndUpdate(id,{$pull :{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("sucess","Review Deleted succesfully!");

    res.redirect(`/listings/${id}`);

}));

module.exports= router;