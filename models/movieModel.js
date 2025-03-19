const mongoose = require("mongoose");

//starting the main code from here
const schemaRules = {
    //set of rules
    title: {type: String , required:[true ,"Title is required"] },
    description:{type: String , required:[true,"Description is required"]},
    releaseYear:{type: Number , required:[true, "Release year is required"]},
    genre:{type: String , required:[true, "Genre year is required"],
        enum: ["Drama" , "Comedy" , "Action" , "Thriller" , "Horror" , "Romance" , "Sci-fi" , "Animation" , "Documentry" , "Other"]
    },
    rating:{type:Number , min:[0, "rating can't be less than 0"] , max:[5, "rating can't be more than 5"]},
    cast: [String],
    director: String,
    thumbnail:String,
    trailerLink: String,
    isPremium: {type:Boolean,default:false}
  };
  
  const movieSchema = new mongoose.Schema(schemaRules);
  
  // hooks in mongoDB
  // this will remove the confirm password field from the data
const movieModel = mongoose.model("Movie", movieSchema);
module.exports = movieModel;