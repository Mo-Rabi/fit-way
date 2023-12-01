import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    //required: true,
  },
  senderId: {
    type: String,
    //required: true,
  },
  senderFirstName: {
    type: String,
    //required: true,
  },
  senderLastName: {
    type: String,
    //required: true,
  },
  senderPicture: {
    type: String,
    //required: true,
  },
  recipientId: {
    type: String,
    // required: true,
  },
  messageDate: {
    type: Date,
  },
});

const chatModel = mongoose.model("Chat", messageSchema);

export default chatModel;
