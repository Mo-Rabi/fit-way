import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewerId: String,
  trainerId: String,
  reviewerFirstName: String,
  reviewerLastName: String,
  rating: String,
  comment: String,
  reviewerProfilePhoto: String,
});

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;
