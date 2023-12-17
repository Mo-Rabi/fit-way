import express from "express";
import { initConnection } from "./db/connection.js";
import userRoutes from "./modules/user/user.routes.js";
import trainerRoutes from "./modules/trainer/trainer.routes.js";
// import exerciseRoutes from "./modules/exercise/exercise.routes.js";
import chatRoutes from "./modules/chat/chat.routes.js";
import reviewRoutes from "./modules/reviews/review.routes.js";
import "dotenv/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import axios from "axios";
import fetch from "node-fetch";
import "dotenv/config";
// import fse from "fs-extra";
const app = express();

//! <<< PayPal Start >>>
// const base = "https://api-m.sandbox.paypal.com";
// // test route
// app.get("/test", async (req, res) => {
//   const data = await generateAccessTokenFetch();
//   console.log(data);
//   res.json(data);
// });

// // axios version of generating access token
// async function generateAccessToken() {
//   const response = await axios({
//     url: base + "/v1/oauth2/token",
//     method: "post",
//     data: "grant_type=client_credentials",
//     auth: {
//       username: CLIENT_ID,
//       password: APP_SECRET,
//     },
//   });
//   return response.data;
// }

// // fetch version
// async function generateAccessTokenFetch() {
//   const response = await fetch(base + "/v1/oauth2/token", {
//     method: "post",
//     body: "grant_type=client_credentials",
//     headers: {
//       Authorization:
//         "Basic " + Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64"),
//     },
//   });
//   const data = await response.json();
//   return data;
// }

//! <<< PayPal End >>>

const port = 4000;

app.use(cors()); //?app.use(cors({ origin: "*" })); allows all requests from anywhere to my server
//Start a connection to DB
initConnection();

// parse application/json, basically parse incoming Request Object as a JSON Object
app.use(express.json());
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(express.urlencoded({ extended: false }));

// parse incoming Request Object if object, with nested objects, or generally any type.
//app.use(express.urlencoded({ extended: true }));
//*************! Cloudinary ***********/
// const cloudinaryConfig = cloudinary.config({
//   cloud_name: "dequqpbe8",
//   api_key: "691199169282346",
//   api_secret: "geNFmv_ADOTFbj9li1NM91AOgDE",
//   secure: true,
// });

// app.get("/get-signature", (req, res) => {
//   console.log("Cloudinary Signature Received");
//   const timestamp = Math.round(new Date().getTime() / 1000);
//   const signature = cloudinary.utils.api_sign_request(
//     {
//       timestamp: timestamp,
//     },
//     cloudinaryConfig.api_secret
//   );
//   res.json({ timestamp, signature });
// });

// app.post("/do-something-with-photo", async (req, res) => {
//   console.log("Cloudinary Request received");
//   // based on the public_id and the version that the (potentially malicious) user is submitting...
//   // we can combine those values along with our SECRET key to see what we would expect the signature to be if it was innocent / valid / actually coming from Cloudinary
//   // const expectedSignature = cloudinary.utils.api_sign_request(
//   //   { public_id: req.body.public_id, version: req.body.version },
//   //   cloudinaryConfig.api_secret
//   // );

//   // We can trust the visitor's data if their signature is what we'd expect it to be...
//   // Because without the SECRET key there's no way for someone to know what the signature should be...
//   //if (expectedSignature === req.body.signature) {
//     console.log("In expected Signature");
//     // Do whatever you need to do with the public_id for the photo
//     // Store it in a database or pass it to another service etc...
//     await fse.ensureFile("./data.txt");
//     const existingData = await fse.readFile("./data.txt", "utf8");
//     await fse.outputFile(
//       "./data.txt",
//       existingData + req.body.public_id + "\n"
//     )});
//   //}
// //});
app.use(cookieParser());

app.use(userRoutes);
app.use(trainerRoutes);
// app.use(exerciseRoutes);
app.use(chatRoutes);
app.use(reviewRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
