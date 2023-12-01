import reviewModel from "../../db/model/review.model.js";
import jwt from "jsonwebtoken";

//? Add a review to Trainer
const addReview = async (req, res) => {
  try {
    console.log("Review Body", req.body);
    let { userToken } = req.body;
    console.log("Req.body BEFORE:", req.body);
    let decodedUserToken = jwt.verify(userToken, "SecretKeyCanBeAnything");
    let reviewerId = decodedUserToken.id;
    console.log("Reviewer ID: ", reviewerId);

    // Remove the userToken from req.body as it served its purpose
    delete req.body.userToken;

    //add the reviwerId to req.body
    req.body.reviewerId = reviewerId;

    console.log("Review Body After", req.body);

    //? Isolating block of code to test (Done)
    try {
      let addedReview = await reviewModel.create({
        ...req.body,
      });
      console.log("Added Review", addedReview);
    } catch (error) {
      console.log("Error while creating review: ", error);
    }

    console.log("Added Review", addedReview);

    res.status(201).json({
      message: "Thank you for adding your review!",
      addedReview,
    });
  } catch (error) {
    res.json({
      message: "An Error occured while Adding your review",
      error,
    });
  }
};

//? Get All reviews of the specific user I'm standing at
const getReviews = async (req, res) => {
  try {
   const {trainerId} = req.params
    let allReviews = await reviewModel.find({trainerId});
    console.log("ALL REVIEWS ONITIOOOOOOOOOOOOOO",allReviews);
    res.json({ message: "Here's a list of all users", allReviews });
  } catch (error) {
    res.json({
      message: "An Error occured while retrieving All Reviews Data",
      error,
    });
  }
};
export { getReviews, addReview };
