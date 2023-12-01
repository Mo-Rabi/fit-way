import express from "express";
import {
  getAllTrainers,
  signUp,
  updateTrainer,
  deactivateAccount,
  deleteAccount,
  resetPassword,
  logout,
  signIn,
  trainerSignUpVerification,
  getTrainerData,
  getTrainerDataForProfile,
  updateTrainerPhoto
} from "./trainer.controller.js";
import { validation } from "../../middleware/validation.js";
import { signInSchem, signUpValidationSchema } from "./trainer.validation.js";

const trainerRoutes = express.Router();
//?Get All Trainers
trainerRoutes.get("/trainers", getAllTrainers);

//! Get Trainer Details
trainerRoutes.get("/trainerData", getTrainerDataForProfile);

//! Get Trainer Details
trainerRoutes.get("/trainerData/:id", getTrainerData);

//? Trainer Signup
trainerRoutes.post(
  "/trainers/register",
  //validation(signUpValidationSchema),
  signUp
);
//? Trainer Verification after Signup
trainerRoutes.get("/trainer/verify/:token", trainerSignUpVerification);

//? Login Trainer
trainerRoutes.post(
  "/trainers/login",
  validation(signInSchem),
  signIn
  // authenticateTokenCookie
);

//?Edit Trainer Details
trainerRoutes.patch("/trainer/edit/", updateTrainer);

//?Edit Trainer Photo
trainerRoutes.patch("/trainer/edit/photo", updateTrainerPhoto);

//? Password Reset
trainerRoutes.put("/trainers/resetPassword", resetPassword);

//? Deactivate Trainer (Soft Delete)
trainerRoutes.delete("/trainers/deactivateAccount", deactivateAccount);

//? Delete Trainer Account Permanently (Hard Delete)
trainerRoutes.delete("/trainers/deleteAccount", deleteAccount);

//? Logout
trainerRoutes.get("/trainers/logout", logout);

export default trainerRoutes;
