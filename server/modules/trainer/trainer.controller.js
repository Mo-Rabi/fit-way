import trainerModel from "../../db/model/trainer.model.js";
import userModel from "../../db/model/user.model.js";
import bcrypt from "bcrypt";
import { signInSchem, signUpValidationSchema } from "./trainer.validation.js";
import jwt from "jsonwebtoken";
import { sendToEmail } from "../../utils/sendEmail.js";

//? Add a Review
const addReview = async (req, rest) => {};

//? Retrieve all trainers
const getAllTrainers = async (req, res) => {
  try {
    let viewAllTrainers = await trainerModel.find();
    res.json({ message: "Here's a list of all trainers", viewAllTrainers });
  } catch (error) {
    res.json({ message: "Retrieving all trainers Error: ", viewAllTrainers });
  }
};

//? Get Trainer Details
const getTrainerData = async (req, res) => {
  try {
    let token = req.headers.authorization;
    console.log("Token in Axios Default headers: ", token);
    let trainerId = req.params.id;
    console.log("Params ID:", trainerId);
    console.log("Headers TOKEEEN:", token);

    let id;
    if (trainerId) {
      console.log("ID is in Params", trainerId);
      id = req.params.id;
    }
    // if (token) {
    //   console.log("ID is in token", token);
    //   const decodedToken = jwt.verify(token, "SecretKeyCanBeAnything");
    //   id = decodedToken.id;
    //   console.log("ID in Token: ", id);
    // } else {
    //   console.log("ID is not in Token nor in Params!");
    // }

    let trainerData = await trainerModel.findOne({ _id: id });
    console.log("Found TRAINER???", trainerData);
    res.json({ message: "Trainer Data: ", trainerData });
  } catch (error) {
    res.json({
      message: "An Error occured while retrieving Trainer Data",
      error,
    });
  }
};
//? Get Trainer Data for Trainer Profile
const getTrainerDataForProfile = async (req, res) => {
  try {
    let token = req.headers.authorization;
    console.log("Token in Axios Default headers: ", token);
    let { id } = jwt.verify(token, "SecretKeyCanBeAnything");
    console.log("IDDDDDD", id);

    let trainerData = await trainerModel.findOne({ _id: id });
    res.json({ message: "Trainer Data: ", trainerData });
  } catch (error) {
    res.json({
      message: "An Error occured while retrieving Trainer Data",
      error,
    });
  }
};

//? Trainer Signup
const signUp = async (req, res) => {
  try {
    let { error } = signUpValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      res.status(400).json({ message: "Trainer Validation error", error });
    } else {
      let { email, firstName } = req.body;
      let foundTrainer = await trainerModel.findOne({ email: email });
      foundTrainer &&
        res.status(409).json({ message: "Trainer Email already exists" });
      console.log(foundTrainer);
      if (!foundTrainer) {
        let hashedPassword = bcrypt.hashSync(req.body.password, 10);
        let addedTrainer = await trainerModel.create({
          ...req.body,
          password: hashedPassword,
        });

        const token = jwt.sign({ id: addedTrainer._id }, "secret_key", {
          expiresIn: "30d",
        });
        const trainerType = "trainer";
        sendToEmail(req.body.email, token, trainerType, firstName);
        res.status(201).json({
          message: "Trainer SignUp successful, please check your email",
          addedTrainer,
          token,
        });
      }
    }
  } catch (error) {
    console.log("Trainer Signup Error: ", error);
  }
};

//? Trainer Signup Verification
const trainerSignUpVerification = async (req, res) => {
  try {
    const payload = jwt.verify(req.params.token, "secret_key");
    // Set isVerified to true in DB
    const trainer = await trainerModel.findByIdAndUpdate(
      payload.id,
      {
        isVerified: true,
      },
      { new: true }
    );
    console.log("Trainer Verified: ", trainer);

    // Redirect trainer to login page or send a response
    res.redirect("http://localhost:3000/verification/success");
  } catch (error) {
    console.log("Trainer Signup Verification Error: ", error);
  }
};

//? Trainer Signin
const signIn = async (req, res) => {
  try {
    console.log(req.body.email);
    let { error } = signInSchem.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: "SignIn Schema Validation Error: ", error });
    } else {
      let foundTrainer = await trainerModel.findOne({ email: req.body.email });
      if (!foundTrainer) {
        res.status(404).json({
          message: "Trainer not found, Become a Trainer Now!",
        });
      } else if (foundTrainer.isVerified === false) {
        res
          .status(404)
          .json({ message: "Please check your email to verify your account" });
      } else if (foundTrainer.isVerified === true) {
        console.log("Found Trainer? ", foundTrainer);
        let matched = bcrypt.compareSync(
          req.body.password,
          foundTrainer.password
        );
        console.log("Passwords match?", matched);

        if (matched) {
          let token = jwt.sign(
            { id: foundTrainer.id },
            "SecretKeyCanBeAnything",
            {
              expiresIn: "30d", // when expired you cannot access /profile
            }
          );
          console.log(token);
          //! Sitting the token in the response cookiesafter successful login
          res.cookie(
            "token",
            token, //?res.cookie(name, value [, options])
            { httpOnly: true }
          );
          res
            .status(200)
            .json({ message: "Trainer logged in successfully", token });
        } else {
          res.status(404).json({ message: "Please check your password" });
        }
      }
    }
  } catch (error) {
    console.log("Trainer Signin Error: ", error);
  }
};

//? Edit Trainer Details
const updateTrainer = async (req, res) => {
  try {
    console.log("Request Body", req.body);
    //! req.body.token hold User/ Reviewer Token (Logged in)
    let token = req.headers.authorization;
    let { id } = jwt.verify(token, "SecretKeyCanBeAnything");
    console.log("IODDDDDD:", id);
    const {
      firstName,
      lastName,
      email,
      title,
      description,
      // userToken,
    } = req.body;
    console.log({
      firstName,
      lastName,
      email,
      title,
      description,
      //userToken,
    });

    // if (userToken) {
    //   let decodedToken = jwt.verify(userToken, "SecretKeyCanBeAnything");
    //   const userId = decodedToken.id;
    //   return userId;
    // }
    // console.log("Picture", picture);`

    let trainerId =
      req.body.trainerId ||
      jwt.verify(req.headers.authorization, "SecretKeyCanBeAnything").id;

    console.log("Trainer ID from OR operator: ", trainerId);

    //console.log("USER 'Reviewer ID')", userId);
    //! check what values are filled and update them, if not filled by trainer don't update them
    let updateFields = {};
    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;
    if (email) updateFields.email = email;
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;

    console.log("Updated Fields", updateFields);
    //!!***********! IMPORTANT ******* const trainerId =
    let updatedTrainerDetails = await trainerModel.findByIdAndUpdate(
      trainerId,
      updateFields,
      { new: true }
    );

    res.status(200).json({
      message: "Trainer Details were updatd successfully",
      updatedTrainerDetails,
    });
  } catch (error) {
    res.status(400).json({ message: "Updating Trainer Error: ", error });
  }
};

//? Edit Trainer Photo
const updateTrainerPhoto = async (req, res) => {
  try {
    const { picture } = req.body;
    let token = req.headers.authorization;
    let { id } = jwt.verify(token, "SecretKeyCanBeAnything");

    let updatedTrainerPhoto = await trainerModel.findByIdAndUpdate(
      id,
      { picture },
      { new: true }
    );

    res.status(200).json({
      message: "Trainer Photo was updatd successfully",
      updatedTrainerPhoto,
    });
  } catch (error) {
    res.status(400).json({ message: "Updating Trainer Photo Error: ", error });
  }
};
//? Deactivate Trainer (Soft Delete)
const deactivateAccount = async (req, res) => {
  try {
    res.status(200).json({
      message: "Trainer account is deactivated successfully ",
      softDeletedTrainer,
    });
  } catch (error) {
    res.status(400).json({ message: "Deactivating Trainer Error: ", error });
  }
};

//? Delete Trainer Account Permanently (Hard Delete)
const deleteAccount = async (req, res) => {
  try {
    res.status(200).json({
      message: "Trainer account is permanently deleted",
      hardDeletedTrainer,
    });
  } catch (error) {
    res.status(400).json({ message: "Deleting Trainer Error: ", error });
  }
};

//? Password Reset
const resetPassword = async (req, res) => {
  try {
    res.status(200).json({
      message: "Please check your email to Reset your Password",
      saveNewPassword,
    });
  } catch (error) {
    res.status(400).json({ message: "Password Reset Error: ", error });
  }
};

//? Logout
const logout = (req, res) => {
  try {
    res.status(200).json({ message: "You are now Logged out" });
  } catch (error) {
    res.status(400).json({ message: "Logout Error: ", error });
  }
};

export {
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
  addReview,
  getTrainerDataForProfile,
  updateTrainerPhoto,
};
