const express = require("express");
const movieRouter = express.Router();
const{ protectRouteMiddleware,isAdminMiddleWare } = require('../controller/authcontroller');
//movies route handler
const {createMovie,getAllMovie,deleteMovie,getMovieById} = require("../controller/movieController.js");



movieRouter
.post("/api/movie", createMovie)
.get("/api/movie",protectRouteMiddleware,isAdminMiddleWare,getAllMovie)
.get("/api/movie/:id", getMovieById)
.delete("/api/movie/:id",protectRouteMiddleware,deleteMovie);

module.exports = movieRouter;
