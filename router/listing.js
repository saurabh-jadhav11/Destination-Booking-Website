const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema}= require("../schema.js");
const Listing = require("../models/listing.js");


//vlaidate listings
const validateListings = (req,res ,next)=>{

    let {error} = listingSchema.validate(req.body);

    console.log(error);
    if(error){

        let errMsg = error.details.map((en)=>en.message).join(",");
        throw new ExpressError (400,errMsg);
    }
    else{
        next();
    }
}


//index

router.get("/",wrapAsync(async(req,res)=>{

    let allListings =await Listing.find();
    
    res.render('listings/index',{allListings});
 
 }));
 
 //add rout
 
 router.get("/new",(req,res)=>{
     res.render("listings/new.ejs")
 })
 
 //show rout
 
 router.get("/:id",wrapAsync(async(req,res)=>{
     let {id}=req.params;
     let listing = await Listing.findById(id).populate("review");
     if(!listing){
        req.flash("error","Listing you trying to acces is not available ");
        res.redirect("/listings");
     }
     res.render("listings/show.ejs",{listing});
 }));
 
 
 //add rout
 
 router.post("/",wrapAsync(async(req,res,next)=>{
 
   
 
    
     const newListing = new Listing(req.body.listing);
 
    await newListing.save();
    
    req.flash("sucess","New listing created succesfully!");
    res.redirect("/listings");
 })
 );
 
 
 
 
 //edit rout
 
 
 
 
 router.get("/:id/edit",wrapAsync(async(req,res)=>{
 
     let {id}=req.params;
   
     let listing = await Listing.findById(id);
     if(!listing){
        req.flash("error","Listing you trying to acces is not available ");
        res.redirect("/listings");
     }
     res.render("listings/edit.ejs",{listing});
 }));
 
 
 //put
 
 router.put("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
 
    if(!req.body.listing){
     throw(new ExpressError(400,"Please enter a valid details!"));
 }
 
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("sucess","listing Updated succesfully!");
     res.redirect(`/listings`);
  
 }));
 
 
 
 
 //delete rout 
 router.delete("/:id",wrapAsync(async(req,res)=>{
     let {id}=req.params;
 
     let del =await Listing.findByIdAndDelete(id);
     req.flash("sucess","listing Deleted succesfully!");
    
     res.redirect("/listings");
 
 }));
 

 module.exports = router;