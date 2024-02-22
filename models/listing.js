const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

let listingSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
      description: String,


      image: {
        // filename: {
        //   type: String,
        //   required: true // Make filename required
        // },
        url: {
          type: String,
          required: true, // Make url required
        
        }
      },
        
      
      
      price: Number,
      location: String,
      country: String,
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