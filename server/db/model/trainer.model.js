import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [2, "Min number of characters is 2"],
      maxLength: [50, "Max number of characters is 50"],
    },
    lastName: {
      type: String,
      minLength: [2, "Min number of characters is 2"],
      maxLength: [50, "Max number of characters is 10"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    // reviews: [
    //   {
    //     reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    //     rating: Number,
    //     comment: String,
    //   },
    // ],
    trainees: { type: Array, default: [] },
    plans: { type: Array, default: [] },
    price: { type: Number, required: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "",
    },
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
        timeStamp: Date
      },
    ]
  },
  {
    timestamps: true,
  },

);

const trainerModel = mongoose.model("Trainer", trainerSchema);

export default trainerModel;
