
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
    try {
      const userObject = req.body;
      const user = await userModel.create(userObject);
  
      res.status(201).json(user);
    } catch {
      console.log(err);
  
      res.status(500).json({
        message: "internal server error",
        error: err,
      });
    }
  };
  
  const getAllUser = async function (req, res) {
    try {
      const user = await userModel.find();
  
      if (user.length != 0) {
        res.status(200).json({
          message: user,
        });
      } else {
        res.status(404).json({
          message: "did not get any user",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Internal server error",
        message: err.message,
      });
    }
  };
  
  const getById = async function (req, res) {
    try {
      const id = req.params.id;
      const user = await userModel.findById(id);
  
      if (user) {
        res.status(200).json({
          message: user,
        });
      } else {
        res.status(404).json({
          message: "did not get the user",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Interal server problem",
        message: err.message,
      });
    }
  };
  
  const deleteUser = async function (req, res) {
    try {
      let { id }= req.params;
      const user = await userModel.findByIdAndDelete(id);
  
      if (user == null) {
        res.status(404).json({
          status:"Success",
          message:"user does not exist"
        })
      }
      else{
          res.status(200).json({
              status:"Success",
              message:"User is deleted",
              user:user
          })
      }
    } catch (err){
      res.status(500).json({
          status:"Internal server error",
          message: err.message
      })
    }
  };


  module.exports = {createUser,getAllUser,getById,deleteUser}