const movieModel = require("../models/movieModel");

const createMovie = async function (req, res) {
    try {
      const movieObject = movie.body;
      const movie = await movieModel.create(movieObject);
  
      res.status(201).json(movie);
    } catch {
      console.log(err);
  
      res.status(500).json({
        message: "internal server error",
        error: err,
      });
    }
  };


const getAllMovie = async function (req, res) {
    try {
      const movie = await movieModel.find();
  
      if (movie.length != 0) {
        res.status(200).json({
          message: movie,
        });
      } else {
        res.status(404).json({
          message: "did not get any movie",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Internal server error",
        message: err.message,
      });
    }
  };

  const getMovieById = async function (req, res) {
    try {
      const id = req.params.id;
      const movie = await movieModel.findById(id);
  
      if (movie) {
        res.status(200).json({
          message: movie,
        });
      } else {
        res.status(404).json({
          message: "did not get the movie",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Interal server problem",
        message: err.message,
      });
    }
  };
  
  const deleteMovie = async function (req, res) {
    try {
      let { id }= req.params;
      const movie = await movieModel.findByIdAndDelete(id);
  
      if (movie == null) {
        res.status(404).json({
          status:"Success",
          message:"movie does not exist"
        })
      }
      else{
          res.status(200).json({
              status:"Success",
              message:"movie is deleted",
              movie:movie
          })
      }
    } catch (err){
      res.status(500).json({
          status:"Internal server error",
          message: err.message
      })
    }
  };

  module.exports={
    createMovie,getAllMovie,getMovieById,deleteMovie
  }