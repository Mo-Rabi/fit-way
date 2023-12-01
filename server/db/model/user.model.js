import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [2, "Min number of characters is 2"],
      maxLength: [50, "Max number of characters is 50"],
    },
    lastName: {
      type: String,
      minLength: [2, "Min number of characters is 2"],
      maxLength: [50, "Max number of characters is 50"],
    },
    email: {
      type: String,
      //required: true,
      unique: true,
    },
    password: {
      type: String,
     // required: true,
    },
    phone: { type: String, 
      //required: true
     },
    age: { type: Number, 
    //required: true 
    },
    gender: { type: String, 
      //required: true 
    },
    weight: { type: Number,
       //required: true 
      },
    height: { type: Number, 
      //required: true 
    },
    plan: { type: Object, default: {} },
    picture: {
      type: String,
      default: "",
    },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: { type: Boolean, default: false },
    messages: [
      {
        sender: String,
        recipient: String,
        text: String,
        timeStamp: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
