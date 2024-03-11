const express  = require("express");
const app = express();
const mongoose = require("mongoose");
 const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");
const methodOverride =require("method-override");

const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const {listingSchema,reviewSchema}= require("./schema.js");


const Review = require("./models/review.js");

app.use(methodOverride("_method"));
const listings = require("./router/listing.js");
const reviews = require("./router/reviews.js");



const path = require("path");

app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));

app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname,"/public")));

//session
let sesionOptions = {
    secret:"mysupersecreate",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 *60 *1000,
        maxAge: 7* 24 * 60 * 60 * 1000,
        httpOnly:true, 
    }
}
app.use(session(sesionOptions));

//using flash
app.use(flash());

app.use((req,res,next)=>{
    res.locals.msg = req.flash("sucess")
    res.locals.error = req.flash("error")
    next();
})

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


app.use("/listings",listings);

//review 

app.use("/listings/:id/review",reviews);

//invalid address

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
})

//error handler

app.use((err,req,res,next)=>{
    let {statusCode=500,message}=err;

    res.status(statusCode).render("error.ejs",{message});

})