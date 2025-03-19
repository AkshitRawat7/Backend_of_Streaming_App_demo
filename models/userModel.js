const mongoose = require("mongoose");


//starting the main code from here
const schemaRules = {
    //set of rules
    name: {
      type: String,
      requires: [true, "NAME IS REQUIRED"],
    },
    email: {
      type: String,
      requires: [true, "EMAIL IS REQUIRED"], //it is a constraint
      unique: [true, "EMAIL SHOULD BE UNIQUE"],
    },
    password: {
      type: String,
      require: true,
      minLength: [6, "password SHOULD BE min 6 length"],
    },
    confirmPassword: {
      type: String,
      require: [true, "password IS REQuired"],
      minlength: [6, "password SHOULD BE min 6 length"],
      validate: [
        function () {
          return this.password == this.confirmPassword;
        },
        "password should be equal to confrim password",
      ],
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", " feed curator" , "moderator"],
      default:"user"
    },
  };
  
  const userSchema = new mongoose.Schema(schemaRules);
  
  // hooks in mongoDB
  // this will remove the confirm password field from the data
  
  //before the data reaches to db
  userSchema.pre("save", function (next) {
    console.log("pre save was called");
    this.confirmPassword = undefined;
    next();
  });
  
  //after the db makes a response the ORM will make the changes
  //according to the function
  userSchema.post("save", function () {
    // this.["_id"]=undefined;
    this._v = undefined;
    this.pasword = undefined;
  });
  
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;