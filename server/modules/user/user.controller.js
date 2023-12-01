import userModel from "../../db/model/user.model.js";
import bcrypt from "bcrypt";
import { signInSchem, signUpValidationSchema } from "./user.validation.js";
import jwt from "jsonwebtoken";
import { sendToEmail } from "../../utils/sendEmail.js";

//? Retrieve all users
const getAllUsers = async (req, res) => {
  try {
    let viewUsers = await userModel.find();
    res.json({ message: "Here's a list of all users", viewUsers });
  } catch (error) {
    res.json({
      message: "An Error occured while retrieving All Users Data",
      error,
    });
  }
};

//? Get User Details
const getUserData = async (req, res) => {
  try {
    let token = req.headers.authorization;
    console.log("TOKEEEENista", token);
    const decodedToken = jwt.verify(token, "SecretKeyCanBeAnything");
    console.log("Decoded: ", decodedToken);
    const userId = decodedToken.id;
    console.log("User ID: ", userId);

    let userData = await userModel.findOne({ _id: userId });
    console.log("FOUND USER?: ", userData);
    res.json({ message: "User Data: ", userData });
  } catch (error) {
    res.json({ message: "An Error occured while retrieving User Data", error });
  }
};

//? User Signup
const signUp = async (req, res) => {
  try {
    console.log("INSIDE SIGN UP");
    let { error } = signUpValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      res.status(400).json({ message: "User Validation error", error });
    } else {
      let { email } = req.body;
      let foundUser = await userModel.findOne({ email: email });
      foundUser &&
        res.status(409).json({ message: "User Email already exists" });
      console.log(foundUser);
      if (!foundUser) {
        let hashedPassword = bcrypt.hashSync(req.body.password, 10);
        let addedUser = await userModel.create({
          ...req.body,
          password: hashedPassword,
        });

        const token = jwt.sign({ id: addedUser._id }, "secret_key", {
          expiresIn: "30d",
        });
        const userType = "user";
        sendToEmail(req.body.email, token, userType);
        res.status(201).json({
          message: "User SignUp successful, please check your email",
          addedUser,
          token,
        });
      }
    }
  } catch (error) {
    console.log("Signup Error: ", error);
  }
};

//? User Signup Verification
const userSignUpVerification = async (req, res) => {
  try {
    const payload = jwt.verify(req.params.token, "secret_key");
    // Set isVerified to true in DB
    const user = await userModel.findByIdAndUpdate(
      payload.id,
      {
        isVerified: true,
      },
      { new: true }
    );
    console.log("User Verified: ", user);

    // Redirect trainer to login page or send a response
    res.redirect("http://localhost:3000/verification/success");
  } catch (error) {
    console.log("User Signup Verification Error: ", error);
  }
};

//? User Signin
const signIn = async (req, res) => {
  try {
    console.log(req.body.email);
    let { error } = signInSchem.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: "User SignIn Schema Validation Error: ", error });
    } else {
      let foundUser = await userModel.findOne({ email: req.body.email });
      if (!foundUser) {
        res
          .status(404)
          .json({ message: "User not found, You need to create an account" });
      } else if (foundUser.isVerified === false) {
        res.status(404).json({
          message: "Please check your User email to verify your account",
        });
      } else if (foundUser.isVerified === true) {
        console.log("Found User? ", foundUser);
        let matched = bcrypt.compareSync(req.body.password, foundUser.password);
        console.log("Passwords match?", matched);

        if (matched) {
          let token = jwt.sign({ id: foundUser.id }, "SecretKeyCanBeAnything", {
            expiresIn: "30d", // when expired you cannot access /profile
          });
          console.log(token);
          //! Sitting the token in the response cookiesafter successful login
          res.cookie(
            "token",
            token, //?res.cookie(name, value [, options])
            { httpOnly: true }
          );
          res
            .status(200)
            .json({ message: "User logged in successfully", token });
        } else {
          res.status(404).json({ message: "Please check your User password" });
        }
      }
    }
  } catch (error) {
    console.log("User Signin Error: ", error);
  }
};
//? Edit User Details
const updateUser = async (req, res) => {
  try {
    let token = req.headers.authorization;
    const { firstName, lastName, email, title, description } = req.body;
    console.log(firstName, lastName, email, title, description);
    let decodedToken = jwt.verify(token, "SecretKeyCanBeAnything");
    const userId = decodedToken.id;
    console.log(userId);
    //! check what values are filled and update them, if not filled by user don't update them
    let updateFields = {};
    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;
    if (email) updateFields.email = email;
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;

    console.log("Update fields", updateFields);

    let updatedUserDetails = await userModel.findByIdAndUpdate(
      userId,
      updateFields
    );
    res.status(200).json({
      message: "User Details were updatd successfully",
      updatedUserDetails,
    });
  } catch (error) {
    res.status(400).json({ message: "Updating User Error: ", error });
  }
};
//? Edit User Photo
const updateUserPhoto = async (req, res) => {
  try {
    const { picture } = req.body;
    let token = req.headers.authorization;
    let { id } = jwt.verify(token, "SecretKeyCanBeAnything");

    let updatedUserPhoto = await userModel.findByIdAndUpdate(
      id,
      { picture },
      { new: true }
    );

    res.status(200).json({
      message: "User Photo was updatd successfully",
      updatedUserPhoto,
    });
  } catch (error) {
    res.status(400).json({ message: "Updating User Photo Error: ", error });
  }
};

//? Deactivate User (Soft Delete)
const deactivateAccount = async (req, res) => {
  try {
    res.status(200).json({
      message: "User account is deactivated successfully ",
      softDeletedUser,
    });
  } catch (error) {
    res.status(400).json({ message: "Deactivating User Error: ", error });
  }
};

//? Delete User Account Permanently (Hard Delete)
const deleteAccount = async (req, res) => {
  try {
    res.status(200).json({
      message: "User account is permanently deleted",
      hardDeletedUser,
    });
  } catch (error) {
    res.status(400).json({ message: "Deleting User Error: ", error });
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
  getAllUsers,
  getUserData,
  signUp,
  updateUser,
  deactivateAccount,
  deleteAccount,
  resetPassword,
  logout,
  signIn,
  userSignUpVerification,
  updateUserPhoto,
};
