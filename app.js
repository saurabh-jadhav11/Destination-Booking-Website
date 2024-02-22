const express  = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");
const methodOverride =require("method-override");

app.use(methodOverride("_method"));



const path = require("path");

app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));

app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname,"/public")));

// Set EJS as the view engine
app.set('view engine', 'ejs');
main()
.then((res)=>{console.log("connectin to db");})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');

};

port = 8080;

app.listen(port,()=>{
    console.log("port was listening ");
})

app.get("/",(req,res)=>{
    res.send("working ");
})

// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"The greate white house",
//         descreption:"see facing new house ",
//         price:7551,
//         location:"goa",
//         country:"India",

//     })

//     await sampleListing.save();
//     res.send("this page is working");

// })

//index rout

app.get("/listings",async(req,res)=>{

   let allListings =await Listing.find();
   
   res.render('listings/index',{allListings});

})

//add rout

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})

//show rout

app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})


//add rout

app.post("/listings",async(req,res)=>{
    const newListing = new Listing(req.body.listing);

   await newListing.save();
   
   res.redirect("/listings");



})

//edit rout




app.get("/listings/:id/edit",async(req,res)=>{

    let {id}=req.params;
    
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})


//put

app.put("/listings/:id",async(req,res)=>{
   let {id} = req.params;

   await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    res.redirect(`/listings`);
 
})




//delete rout 
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;

    let del =await Listing.findByIdAndDelete(id);

    console.log(del);
    res.redirect("/listings");

})