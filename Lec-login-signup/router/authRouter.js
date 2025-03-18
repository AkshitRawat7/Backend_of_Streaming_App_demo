const express = require('express')

const authRouter=express.Router();


const { signupHandler,loginHandler,protectRouteMiddleware,profileHandler,logoutHandler } = require("../controller/authcontroller");
// const { create } = require("./models/userModel");


// auth methods and routes
authRouter
.post("/login", loginHandler)
.post("/signup",signupHandler)
.get("/logout",logoutHandler)
.get("/profile",protectRouteMiddleware,profileHandler);

module.exports=authRouter;