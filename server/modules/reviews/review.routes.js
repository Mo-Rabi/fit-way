import express from "express";

import { addReview, getReviews } from "./review.controller.js";

const reviewRoutes = express.Router();

//? Add a review to Trainer
reviewRoutes.post("/reviews/new", addReview);

//? Get All reviews of the specific user I'm standing at
reviewRoutes.get("/trainer/reviews/:trainerId", getReviews);

export default reviewRoutes;
