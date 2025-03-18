const { application } = require("express");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const movieModel = require('./models/movieModel');

require("dotenv").config();

// MongoDB connection string with sensitive info coming from .env
const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@atlascluster.6faby.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=AtlasCluster`;

mongoose.connect(dbLink)
  .then(function (connection) {
    console.log("Connected to DB:");
  })
  .catch((err) => console.log("Error connecting to DB:", err));

// Middleware should be used before handlers 
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./router/authRouter.js");
const movieRouter = require("./router/movieRouter.js");
const userRouter = require("./router/userRouter.js");

// Fixing the order of arguments in app.use()
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);

app.listen(3003, function () {
  console.log("Server started on port 3003");
});
