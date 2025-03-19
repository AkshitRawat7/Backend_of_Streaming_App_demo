const userModel = require("../models/userModel")
const util = require("util");
const jwt=require("jsonwebtoken");
const promisify = util.promisify;
const promisediedJWTsign = promisify(jwt.sign);
const promisediedJWTverify = promisify(jwt.verify);



//Signup
async function signupHandler(req, res) {
  try {
    const userObject = req.body;

    if (!userObject.email || !userObject.password) {
      return res.status(400).json({
        message: "Required data is missing",
        status: "failure",
      });
    }

    const user = await userModel.findOne({ email: userObject.email });

    if (user) {
      return res.status(400).json({
        data: "User is already registered",
        status: "failure",
      });
    }

    let newUser = await userModel.create(userObject);
    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
      status: "success",
    });


    //user Email varification OTP
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
}

//LOGIN
async function loginHandler(req, res) {
  try {
    const { email , password } = req.body
    const user = await userModel.findOne({email})

    if(!user){
      return res.status(404).json({
        message:"Invalid email or password",
        status:"failure"
      })
    }

    const areEqual = password == user.password;

    if(!areEqual){
      return res.status(404).json({
        message:"Invalid email or password",
        status:"failure"
      })
    }

    //generate token
    const authToken = await promisediedJWTsign({ id:user["_id"] },process.env.JWT_SECRET_KEY);

    res.cookie("jwt",authToken, {
      maxAge:1000*60*60*24,
      httpOnly:true,
    })

    res.status(200).json({
      message:"Login Successfully",
      status:"Success",
      user:user
    })

  } catch (err) {
    return res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
}

//to check wether the user have a valid token or not
async function protectRouteMiddleware(req, res, next) {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access",
        status: "failure"
      });
    }

    const result = await promisediedJWTverify(token, process.env.JWT_SECRET_KEY);

    //token identifier
    req.id = result.id;
    next();
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({
      message: "Internal server error",
      status: "failure"
    });
  }
}

async function isAdminMiddleWare(req,res,next){
  try{
    const userId = req.id;
    const user = await userModel.findById(userId);

    if(!user){
      res.staus(404).json({
        message:"User not Found",
        status:"Failure"
      })
      if(user.role !== "admin"){
        return res.status(403).json({
          message:"Access Denied , admin only",
          status:"Failure"
        })
      }

      else{
        next();
      }

    }
  }catch(err){
    res.status(500).json({
      mesage:err.message,
      status:"Failure"
    })
  }
}

async function profileHandler(req, res) {
  try {
    const userId = req.id;
    const user = await userModel.findById(userId);// Corrected this line

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "Failure"
      });
    }

    res.json({
      message: "Profile retrieved successfully",
      status: "success",
      user: user
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "Failure"
    });
  }
}

async function logoutHandler(req,res){
  try{
    res.clearCookie('jwt', {path:"/"});
    res.json({
      message:"logout successfully",
      status:"Failure"
    })
  }catch(err){
    res.status(500).json({
      message:err.message,
      status:"Failure"
    })
  }
}

//forget password
//reset password


module.exports = {
    signupHandler,loginHandler,protectRouteMiddleware,isAdminMiddleWare,profileHandler,logoutHandler
}