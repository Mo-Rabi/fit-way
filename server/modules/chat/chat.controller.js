import jwt from "jsonwebtoken";
import chatModel from "../../db/model/chat.model.js";

export const sendMessage = async (req, res) => {
  try {
    console.log("REQUEST BODYYYYYYYYYYYYYYYYYYYYYYY: ", req.body);
    const {
      message,
      messageDate,
      senderId,
      recipientId,
      senderFirstName,
      senderLastName,
      senderPicture,
    } = req.body;

    console.log(
      message,
      messageDate,
      senderId,
      recipientId,
      senderFirstName,
      senderLastName,
      senderPicture
    );
    // let decodedUserToken = jwt.verify(userToken, "SecretKeyCanBeAnything");
    // let senderId = decodedUserToken.id;
    // Remove the userToken from req.body as it served its purpose
    delete req.body.userToken;
    // req.body.senderId = senderId;
    console.log("DATA", req.body);
    let sentMessage = await chatModel.create({ ...req.body });

    res.status(201).json({
      message: "Message sent successfully!",
      sentMessage,
    });
  } catch (error) {
    console.error("Message not sent. Error: ", error);
    res.status(500).json({ error });
  }
};

//! Get The current logged in user messages
export const getMessages = async (req, res) => {
  try {
    const { trainerId } = req.params;
    // console.log(
    //   "TOKEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEN????????????????????????????",
    //   userToken
    // );
    // let decodedUserToken = jwt.verify(userToken, "SecretKeyCanBeAnything");
    // let senderId = decodedUserToken.id;

    console.log("Trainer ID: ", trainerId);

    let allMessages = await chatModel.find({
      $or: [{ senderId: trainerId }, { recipientId: trainerId }],
    });
    res.status(201).json({
      message: "Messages retrieved successfully!",
      allMessages,
    });
  } catch (error) {
    res.status(500).json({
      message: "An Error happened while retrieving messages: ",
      error,
    });
  }
};
