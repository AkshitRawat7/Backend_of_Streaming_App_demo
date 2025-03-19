const express = require("express");
const userRouter=express.Router();


const {
    createUser,
    getAllUser,
    getById,
    deleteUser,
  } = require("../controller/userController");
const{ protectRouteMiddleware,isAdminMiddleWare } = require('../controller/authcontroller');


// app.use(protectRouteMiddleware) //middleware 

//user route handler
userRouter
.post("/", createUser)
.get("/",protectRouteMiddleware,isAdminMiddleWare,getAllUser)
.get("/:id", getById)
.delete("/:id",protectRouteMiddleware,deleteUser); 

module.exports = userRouter;