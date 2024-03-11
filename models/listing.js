const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
const Review = require("./review.js");

let listingSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
      description: String,


      image: {
        // filename: {
        //   type: String,
        //   required: false
        // },
        url:{
          type: String,
          required: true,
          
          default:
            "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
          set: (v) =>
            v === ""
              ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
              : v,
      
      }
      },
        
      
      
      price: Number,
      location: String,
      country: String,

      review:[{
        type: Schema.Types.ObjectId,
        ref: "Review",
      }],

})


listingSchema.post("findOneAndDelete",async(listing)=>{

  if(listing){
    await Review.deleteMany({_id:{$in:listing.review}});
  }
})



const Listing = mongoose.model("Listing",listingSchema);
module.exports=Listing;






// validate: {
//   validator: function(value) {
//     // Simple URL validation regex
//     return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value);
//   },
//   message: props => `${props.value} is not a valid URL!`
// }